"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

import ThemeToggle from "./ThemeToggle";
import useActiveSection from "@/hooks/useActiveSection";

export default function Navbar() {
  const activeSection = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Projects", href: "#projects", id: "projects" },
    {
      label: "Certifications",
      href: "#certifications",
      id: "certifications",
    },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-gray-200 bg-white/90 shadow-sm backdrop-blur-md transition-colors duration-500 dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link
          href="#home"
          className="text-2xl font-bold text-blue-600 transition hover:text-blue-700"
        >
          John Esonu
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={clsx(
                  "relative font-medium transition duration-300",
                  activeSection === item.id
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                )}
              >
                {item.label}

                {activeSection === item.id && (
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-blue-600 dark:bg-blue-400" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Right */}
        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />

          <a
            href="/John_Esonu_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
          >
            Download CV
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            aria-expanded={mobileOpen}
            className="rounded-lg p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="border-t border-gray-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900 md:hidden"
          >
            <ul className="flex flex-col p-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      "block rounded-lg px-4 py-3 text-lg transition",
                      activeSection === item.id
                        ? "bg-blue-100 font-semibold text-blue-600 dark:bg-slate-800 dark:text-blue-400"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              <a
                href="/John_Esonu_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
              >
                Download CV
              </a>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}