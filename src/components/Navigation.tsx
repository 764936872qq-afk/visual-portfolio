"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "首页", href: "#hero" },
  { label: "能力", href: "#capabilities" },
  { label: "精选", href: "#featured" },
  { label: "作品", href: "#works" },
  { label: "关于", href: "#about" },
  { label: "合作", href: "#contact" }
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-nav fixed inset-x-0 top-0 z-50 border-b border-champagne/10 bg-carbon/[0.68] backdrop-blur-2xl">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#hero" className="group flex items-center gap-3" aria-label="返回首页">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne/[0.35] bg-champagne/10 text-sm font-semibold text-champagne shadow-gold">
            WX
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-medium text-cream">王兴</span>
            <span className="block text-xs text-cream/[0.48]">VISUAL DESIGNER</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.035] p-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="rounded-full px-4 py-2 text-sm text-cream/70 transition hover:bg-champagne/10 hover:text-cream"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          className="hidden rounded-full border border-champagne/[0.35] bg-champagne/10 px-5 py-2 text-sm text-champagne transition hover:border-champagne hover:bg-champagne/20 md:inline-flex"
          href="#contact"
        >
          联系合作
        </a>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-champagne/25 text-cream md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "关闭菜单" : "打开菜单"}
          type="button"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="border-t border-champagne/10 bg-carbon/[0.94] px-5 py-4 md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  className="rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-cream/80"
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
