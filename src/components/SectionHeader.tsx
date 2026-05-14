import { motion } from "framer-motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <motion.div
      className="mb-10 max-w-3xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <div className="mb-4 flex items-center gap-4 text-sm text-champagne/80">
        <span className="h-px w-12 bg-champagne/60" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="text-balance text-3xl font-semibold text-cream md:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-8 text-cream/[0.62] md:text-lg">{description}</p>
      ) : null}
    </motion.div>
  );
}
