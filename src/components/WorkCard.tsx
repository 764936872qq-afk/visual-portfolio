"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { Work } from "@/types/work";

type WorkCardProps = {
  work: Work;
  index: number;
  emphasized?: boolean;
  onSelect: (work: Work) => void;
};

export default function WorkCard({ work, index, emphasized = false, onSelect }: WorkCardProps) {
  return (
    <motion.button
      className={`group glass-panel relative overflow-hidden rounded-lg text-left transition ${
        emphasized ? "md:col-span-2" : ""
      }`}
      onClick={() => onSelect(work)}
      type="button"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.035, 0.22), ease: "easeOut" }}
      whileHover={{ y: -8 }}
    >
      <div className={`relative overflow-hidden ${emphasized ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
        <Image
          src={work.coverImage}
          alt={work.title}
          fill
          sizes={emphasized ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/[0.12] to-transparent opacity-[0.92]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gold-line opacity-0 transition group-hover:opacity-100" />
      </div>

      <div className="relative p-5 md:p-6">
        <div className="mb-4 flex items-center justify-between gap-4 text-xs text-champagne/[0.78]">
          <span>{work.category}</span>
          <span>{work.year}</span>
        </div>
        <h3 className="text-xl font-semibold text-cream md:text-2xl">{work.title}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-7 text-cream/[0.56]">{work.description}</p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {work.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-cream/[0.58]">
                {tag}
              </span>
            ))}
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-champagne/[0.28] text-champagne transition group-hover:bg-champagne group-hover:text-carbon">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </motion.button>
  );
}
