"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Work } from "@/types/work";

type WorkModalProps = {
  work: Work | null;
  isMobile?: boolean;
  onClose: () => void;
};

function isNearbyThumbnail(index: number, activeIndex: number, imageCount: number) {
  if (imageCount <= 5) return true;
  const distance = Math.abs(index - activeIndex);
  return distance <= 1 || distance >= imageCount - 1;
}

export default function WorkModal({ work, isMobile = false, onClose }: WorkModalProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const modalImages = useMemo(() => {
    if (!work) return [];
    return Array.from(new Set(work.galleryImages.filter(Boolean)));
  }, [work]);

  const imageCount = modalImages.length;
  const currentImage = modalImages[slideIndex] ?? work?.coverImage ?? "";
  const canSlide = imageCount > 1;

  useEffect(() => {
    setSlideIndex(0);
    setTouchStartX(null);
  }, [work?.coverImage, work?.title]);

  const goToSlide = useCallback((index: number) => {
    if (!imageCount) return;
    setSlideIndex((index + imageCount) % imageCount);
  }, [imageCount]);

  const goPrev = useCallback(() => {
    if (!imageCount) return;
    setSlideIndex((current) => (current - 1 + imageCount) % imageCount);
  }, [imageCount]);

  const goNext = useCallback(() => {
    if (!imageCount) return;
    setSlideIndex((current) => (current + 1) % imageCount);
  }, [imageCount]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!canSlide || touchStartX === null) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const distance = touchStartX - touchEndX;

    if (Math.abs(distance) > 48) {
      if (distance > 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    setTouchStartX(null);
  };

  useEffect(() => {
    if (!work) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft" && imageCount > 1) {
        event.preventDefault();
        goPrev();
      }

      if (event.key === "ArrowRight" && imageCount > 1) {
        event.preventDefault();
        goNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goNext, goPrev, imageCount, onClose, work]);

  return (
    <AnimatePresence>
      {work ? (
        <motion.div
          className="modal-backdrop fixed inset-0 z-[80] flex items-center justify-center bg-black/[0.82] p-4 backdrop-blur-xl md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass-panel grid max-h-[92vh] w-full max-w-7xl overflow-hidden rounded-lg md:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)]"
            initial={isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 28 }}
            transition={{ duration: isMobile ? 0.16 : 0.25 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="relative flex min-h-[44vh] flex-col justify-end overflow-hidden bg-black md:min-h-[78vh]"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  className="absolute inset-0"
                  initial={isMobile ? { opacity: 0 } : { opacity: 0, scale: 1.015 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
                  transition={{ duration: isMobile ? 0.16 : 0.32, ease: "easeOut" }}
                >
                  <Image
                    src={currentImage}
                    alt={`${work.title} ${slideIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 88vw, 68vw"
                    quality={isMobile ? 66 : 82}
                    loading="lazy"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

              <div
                className="soft-blur absolute left-4 top-4 rounded-full border border-champagne/25 bg-black/[0.45] px-3 py-1.5 text-xs text-champagne backdrop-blur md:left-6 md:top-6"
                aria-live="polite"
              >
                {slideIndex + 1} / {imageCount || 1}
              </div>

              {canSlide ? (
                <>
                  <button
                    className="soft-blur absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-champagne/45 bg-champagne/12 text-champagne shadow-gold backdrop-blur transition hover:border-champagne hover:bg-champagne hover:text-carbon hover:shadow-halo md:left-6"
                    onClick={goPrev}
                    type="button"
                    aria-label="上一张作品图"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    className="soft-blur absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-champagne/45 bg-champagne/12 text-champagne shadow-gold backdrop-blur transition hover:border-champagne hover:bg-champagne hover:text-carbon hover:shadow-halo md:right-6"
                    onClick={goNext}
                    type="button"
                    aria-label="下一张作品图"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              ) : null}

              {canSlide ? (
                <div className="soft-blur no-scrollbar relative z-10 mx-auto mb-5 flex max-w-[86%] items-center gap-2 overflow-x-auto rounded-lg border border-white/10 bg-black/[0.42] p-2 backdrop-blur md:mb-6">
                  {modalImages.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => goToSlide(index)}
                      className={`relative h-12 w-16 shrink-0 overflow-hidden rounded border transition ${
                        slideIndex === index ? "border-champagne shadow-gold" : "border-white/15 opacity-62 hover:border-champagne/70 hover:opacity-100"
                      }`}
                      aria-pressed={slideIndex === index}
                      aria-label={`跳转到第 ${index + 1} 张作品图`}
                    >
                      {isNearbyThumbnail(index, slideIndex, imageCount) ? (
                        <Image src={image} alt="" fill sizes="64px" quality={isMobile ? 32 : 45} loading="lazy" className="object-cover" />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center bg-white/[0.04] text-[11px] text-cream/[0.46]">
                          {index + 1}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="relative overflow-y-auto p-6 md:p-9">
              <button
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-champagne/25 text-cream transition hover:bg-champagne hover:text-carbon"
                onClick={onClose}
                type="button"
                aria-label="关闭作品预览"
              >
                <X size={18} />
              </button>
              <p className="pr-12 text-sm text-champagne">{work.category} / {work.year}</p>
              <h3 className="mt-5 pr-12 text-3xl font-semibold text-cream md:text-4xl">{work.title}</h3>
              <p className="mt-6 text-base leading-8 text-cream/[0.66]">{work.description}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {work.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-champagne/[0.22] bg-champagne/[0.08] px-3 py-1.5 text-xs text-champagne">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-10 h-px bg-gold-line opacity-70" />
              <dl className="mt-8 grid grid-cols-2 gap-5 text-sm">
                <div>
                  <dt className="text-cream/[0.42]">项目分类</dt>
                  <dd className="mt-2 text-cream">{work.category}</dd>
                </div>
                <div>
                  <dt className="text-cream/[0.42]">完成年份</dt>
                  <dd className="mt-2 text-cream">{work.year}</dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
