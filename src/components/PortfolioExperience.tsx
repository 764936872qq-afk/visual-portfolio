"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Boxes,
  BrainCircuit,
  Gem,
  Layers3,
  Mail,
  Palette,
  PenTool,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import SectionHeader from "@/components/SectionHeader";
import WorkCard from "@/components/WorkCard";
import WorkModal from "@/components/WorkModal";
import type { Work } from "@/types/work";

const categories = ["全部", "品牌VI", "电商设计", "包装设计", "AIGC视觉", "Logo设计"] as const;

const capabilities = [
  {
    no: "01",
    title: "品牌视觉系统",
    desc: "从Logo、VI规范到品牌物料，建立可复制、可落地的商业视觉语言。",
    icon: PenTool
  },
  {
    no: "02",
    title: "电商转化设计",
    desc: "适配快节奏营销需求，完成海报、长图、Banner和活动页视觉输出。",
    icon: Palette
  },
  {
    no: "03",
    title: "包装与印刷工艺",
    desc: "熟悉全印刷链路，能平衡成本、工艺、材质与最终呈现品质。",
    icon: Boxes
  },
  {
    no: "04",
    title: "AIGC 视觉",
    desc: "结合AI创意和设计经验，为品牌制造更强记忆点。",
    icon: BrainCircuit
  }
];

const profileLines = [
  "深耕视觉传达领域10年，专注以高效能设计为品牌创造商业价值；",
  "擅长在快节奏工作环境中快速定位设计需求；",
  "◆具备扎实的专业知识，能独立完成设计任务；",
  "◆熟练使用设计工具Ps/Ai/CDR/Id、Figma、SD；",
  "◆精通全印刷链路工艺,对印刷成本等有较多的经验;",
  "◆会使用部分影视剪辑+录制+活动现场音控；",
  "始终相信优秀的设计是商业逻辑与美学效率的完美平衡",
  "致力于通过系统化设计思维帮助客户在竞争中赢得时间差优势；"
];

function isEmphasized(index: number) {
  return index === 0 || index === 5 || index === 12 || index % 17 === 0;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", update);
      return () => mediaQuery.removeEventListener("change", update);
    }

    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  return isMobile;
}

export default function PortfolioExperience({ works }: { works: Work[] }) {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("全部");
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const isMobile = useIsMobile();

  const heroImages = useMemo(() => works.slice(0, isMobile ? 1 : 3).map((work) => work.coverImage), [isMobile, works]);

  const featuredWorks = useMemo(() => works.slice(0, 3), [works]);
  const archiveWorks = useMemo(() => works.slice(featuredWorks.length), [featuredWorks.length, works]);

  const filteredWorks = useMemo(() => {
    if (activeCategory === "全部") return archiveWorks;
    return archiveWorks.filter((work) => work.category === activeCategory);
  }, [activeCategory, archiveWorks]);

  return (
    <main className="site-shell min-h-screen overflow-hidden">
      <Navigation />
      <Hero images={heroImages} isMobile={isMobile} />
      <Capabilities isMobile={isMobile} />
      <FeaturedWorks works={featuredWorks} isMobile={isMobile} onSelect={setSelectedWork} />
      <WorksSection
        activeCategory={activeCategory}
        filteredWorks={filteredWorks}
        isMobile={isMobile}
        onCategoryChange={setActiveCategory}
        onSelect={setSelectedWork}
      />
      <About isMobile={isMobile} />
      <Contact isMobile={isMobile} />
      <WorkModal work={selectedWork} isMobile={isMobile} onClose={() => setSelectedWork(null)} />
    </main>
  );
}

function Hero({ images, isMobile }: { images: string[]; isMobile: boolean }) {
  return (
    <section id="hero" className="relative min-h-screen px-5 pb-20 pt-32 md:px-8 md:pb-24 md:pt-36">
      <div className="hero-glow absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-champagne/[0.16] blur-3xl" />
      <div className="hero-glow absolute right-0 top-28 h-96 w-72 rounded-full bg-steel/[0.14] blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-champagne/25 bg-champagne/[0.08] px-4 py-2 text-sm text-champagne">
            <Sparkles size={16} />
            AIGC VISUAL / BRAND DESIGN
          </div>

          <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.95] text-cream md:text-7xl lg:text-8xl">
            VISUAL DESIGN PORTFOLIO
            <span className="mt-4 block metal-text">平面视觉设计师作品集</span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-cream/[0.68] md:text-xl">
            聚焦平面视觉设计、品牌设计、电商设计、AIGC 视觉，，以商业目标驱动高效能设计表达。
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#works"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-carbon transition hover:bg-champagne"
            >
              查看作品
              <ArrowUpRight size={17} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-champagne/[0.35] bg-white/[0.03] px-6 py-3 text-sm text-champagne transition hover:bg-champagne/10"
            >
              商业合作
            </a>
          </div>

          <div className="mt-14 grid max-w-2xl grid-cols-[repeat(auto-fit,minmax(132px,1fr))] gap-3 sm:grid-cols-3">
            {[
              ["10年", "平面设计经验"],
              ["Ps/Ai/CDR/Id", "核心工具链"],
              ["印刷链路", "工艺成本经验"]
            ].map(([value, label]) => (
              <div key={label} className="glass-panel flex min-h-[116px] min-w-0 flex-col justify-between overflow-hidden rounded-lg px-4 py-5">
                <div className="min-w-0 break-words text-[clamp(1.25rem,4.4vw,1.875rem)] font-semibold leading-snug text-cream md:text-[clamp(1.35rem,2vw,1.875rem)]">
                  {value}
                </div>
                <div className="mt-2 text-xs text-cream/[0.48]">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative min-h-[560px] lg:min-h-[680px]"
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: isMobile ? 0.35 : 0.9, delay: isMobile ? 0 : 0.12, ease: "easeOut" }}
        >
          <div className="absolute left-8 top-0 h-24 w-px bg-gradient-to-b from-champagne/0 via-champagne/80 to-champagne/0" />
          <div className="absolute right-10 top-24 h-72 w-72 rounded-full border border-champagne/20" />
          <div className="absolute bottom-16 left-0 h-px w-full bg-gold-line opacity-80" />

          {images.map((image, index) => (
            <motion.div
              key={image}
              className={`glass-panel absolute overflow-hidden rounded-lg shadow-halo ${
                index === 0
                  ? "right-0 top-6 h-[420px] w-[72%]"
                  : index === 1
                    ? "left-0 top-52 h-[310px] w-[54%]"
                    : "bottom-0 right-10 h-[260px] w-[58%]"
              }`}
              animate={isMobile ? undefined : { y: [0, index % 2 === 0 ? -14 : 12, 0] }}
              transition={isMobile ? undefined : { duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={image}
                alt="作品预览"
                fill
                sizes="(max-width: 640px) 60vw, (min-width: 1024px) 42vw, 80vw"
                quality={isMobile ? 56 : 72}
                loading="lazy"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon/[0.65] to-transparent" />
              <div className="soft-blur absolute left-5 top-5 rounded-full border border-champagne/25 bg-black/[0.35] px-3 py-1 text-xs text-champagne backdrop-blur">
                SELECTED WORK
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Capabilities({ isMobile }: { isMobile: boolean }) {
  return (
    <section id="capabilities" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="CAPABILITY MATRIX"
          title="从品牌系统到高压营销现场，保持清晰、快速、可落地。"
          description="能力不是堆工具，而是把商业目标翻译成能被消费者看见、理解、记住的视觉系统。"
          isMobile={isMobile}
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.no}
                className="glass-panel group rounded-lg p-6 transition hover:border-champagne/[0.55] hover:shadow-gold"
                initial={isMobile ? false : { opacity: 0, y: 28 }}
                whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
                viewport={isMobile ? undefined : { once: true, margin: "-80px" }}
                transition={isMobile ? undefined : { duration: 0.55, delay: index * 0.08 }}
                whileHover={isMobile ? undefined : { y: -8 }}
              >
                <div className="mb-10 flex items-center justify-between">
                  <span className="metal-text text-3xl font-semibold">{item.no}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-champagne/25 bg-champagne/[0.08] text-champagne">
                    <Icon size={19} />
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-cream">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-cream/[0.58]">{item.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedWorks({ works, isMobile, onSelect }: { works: Work[]; isMobile: boolean; onSelect: (work: Work) => void }) {
  return (
    <section id="featured" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="FEATURED PROJECTS"
          title="精选作品以真实商业项目为核心，呈现品牌、包装与转化设计能力。"
          isMobile={isMobile}
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {works.slice(0, 3).map((work, index) => (
            <WorkCard key={`${work.title}-${index}`} work={work} index={index} emphasized={index === 0} isMobile={isMobile} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorksSection({
  activeCategory,
  filteredWorks,
  isMobile,
  onCategoryChange,
  onSelect
}: {
  activeCategory: (typeof categories)[number];
  filteredWorks: Work[];
  isMobile: boolean;
  onCategoryChange: (category: (typeof categories)[number]) => void;
  onSelect: (work: Work) => void;
}) {
  return (
    <section id="works" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="PORTFOLIO ARCHIVE"
            title="作品集列表"
            description="围绕品牌、电商、包装、AIGC视觉沉淀作品资产，用不同项目验证商业目标下的设计执行力。"
            isMobile={isMobile}
          />
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:justify-end md:pb-10">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                  activeCategory === category
                    ? "border-champagne bg-champagne text-carbon"
                    : "border-white/10 bg-white/[0.03] text-cream/[0.64] hover:border-champagne/[0.45] hover:text-cream"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout={!isMobile} className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredWorks.map((work, index) => (
            <WorkCard
              key={`${work.title}-${work.coverImage}`}
              work={work}
              index={index}
              emphasized={isEmphasized(index)}
              isMobile={isMobile}
              onSelect={onSelect}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function About({ isMobile }: { isMobile: boolean }) {
  return (
    <section id="about" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          className="glass-panel rounded-lg p-7 md:p-9"
          initial={isMobile ? false : { opacity: 0, y: 28 }}
          whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
          viewport={isMobile ? undefined : { once: true, margin: "-80px" }}
          transition={isMobile ? undefined : { duration: 0.65 }}
        >
          <p className="text-sm text-champagne">ABOUT DESIGNER</p>
          <h2 className="mt-5 text-5xl font-semibold text-cream md:text-7xl">王兴</h2>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
              <div className="text-3xl font-semibold text-cream">30</div>
              <div className="mt-2 text-sm text-cream/[0.48]">年龄</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
              <div className="text-3xl font-semibold text-cream">10年</div>
              <div className="mt-2 text-sm text-cream/[0.48]">平面设计经验</div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Ps", "Ai", "Id", "CDR", "Figma", "SD", "印刷工艺", "活动音控"].map((tool) => (
              <span key={tool} className="rounded-full border border-champagne/[0.22] bg-champagne/[0.08] px-3 py-1.5 text-sm text-champagne">
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative rounded-lg border border-champagne/[0.18] bg-white/[0.025] p-7 md:p-10"
          initial={isMobile ? false : { opacity: 0, y: 28 }}
          whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
          viewport={isMobile ? undefined : { once: true, margin: "-80px" }}
          transition={isMobile ? undefined : { duration: 0.65, delay: 0.08 }}
        >
          <div className="absolute right-8 top-8 hidden text-8xl font-semibold text-white/[0.035] md:block">10</div>
          <div className="mb-8 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-champagne/25 bg-champagne/10 text-champagne">
              <Gem size={20} />
            </span>
            <div>
              <p className="text-sm text-champagne">DESIGN PHILOSOPHY</p>
              <h3 className="text-2xl font-semibold text-cream">商业逻辑与美学效率的平衡</h3>
            </div>
          </div>
          <div className="space-y-4 text-base leading-8 text-cream/[0.68]">
            {profileLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Contact({ isMobile }: { isMobile: boolean }) {
  return (
    <section id="contact" className="px-5 pb-10 pt-20 md:px-8 md:pb-16 md:pt-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="glass-panel relative overflow-hidden rounded-lg p-8 md:p-12"
          initial={isMobile ? false : { opacity: 0, y: 28 }}
          whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
          viewport={isMobile ? undefined : { once: true, margin: "-80px" }}
          transition={isMobile ? undefined : { duration: 0.65 }}
        >
          <div className="hero-glow absolute -right-20 -top-20 h-72 w-72 rounded-full bg-champagne/20 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-champagne/25 bg-champagne/[0.08] px-4 py-2 text-sm text-champagne">
                <Layers3 size={16} />
                COOPERATION READY
              </div>
              <h2 className="max-w-4xl text-balance text-4xl font-semibold leading-tight text-cream md:text-6xl">
                为品牌、电商活动与视觉系统提供高效落地的设计合作。
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-cream/[0.62]">
                品牌VI、包装设计、电商海报、详情页、AIGC视觉、活动物料和印刷落地相关项目。
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-6">
              <div className="flex items-center gap-3 text-cream">
                <Mail size={18} className="text-champagne" />
                <span>联系方式</span>
              </div>
              <a
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-champagne px-6 py-3 text-sm font-semibold text-carbon transition hover:bg-cream"
                href="mailto:764936872@qq.com"
              >
                764936872@qq.com
                <ArrowUpRight size={17} />
              </a>
              <p className="mt-4 text-sm leading-7 text-cream/[0.48]">品牌视觉、电商活动、包装印刷、AIGC视觉项目均可沟通排期。</p>
            </div>
          </div>
        </motion.div>
        <footer className="flex flex-col gap-3 border-t border-white/10 py-8 text-sm text-cream/[0.42] md:flex-row md:items-center md:justify-between">
          <span>© 2026 王兴 VISUAL DESIGN PORTFOLIO</span>
          <span>Brand VI / E-commerce / Packaging / AIGC</span>
        </footer>
      </div>
    </section>
  );
}
