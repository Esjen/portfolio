"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Reveal from "@/components/Reveal";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-900 px-6 py-14 text-white transition-colors duration-500 dark:border-slate-700 dark:bg-slate-950/70">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-12 md:grid-cols-3">

          {/* Brand */}
          <Reveal>
            <div>
              <h2 className="text-3xl font-bold text-blue-400">
                John Esonu
              </h2>

              <p className="mt-4 leading-7 text-gray-400">
                AI Automation Engineer, Backend Developer, and Full-Stack
                Developer passionate about building scalable software,
                intelligent automation, and modern web applications.
              </p>
            </div>
          </Reveal>

          {/* Navigation */}
          <Reveal delay={0.1}>
            <div>
              <h3 className="mb-5 text-xl font-semibold">
                Quick Links
              </h3>

              <ul className="space-y-3 text-gray-400">

                <li>
                  <Link
                    href="#home"
                    className="transition hover:text-blue-400"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="#about"
                    className="transition hover:text-blue-400"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    href="#skills"
                    className="transition hover:text-blue-400"
                  >
                    Skills
                  </Link>
                </li>

                <li>
                  <Link
                    href="#projects"
                    className="transition hover:text-blue-400"
                  >
                    Projects
                  </Link>
                </li>

                <li>
                  <Link
                    href="#contact"
                    className="transition hover:text-blue-400"
                  >
                    Contact
                  </Link>
                </li>

              </ul>
            </div>
          </Reveal>

          {/* Socials */}
          <Reveal delay={0.2}>
            <div>
              <h3 className="mb-5 text-xl font-semibold">
                Connect
              </h3>

              <div className="flex gap-5 text-3xl">

                <a
                  href="https://github.com/Esjen"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:text-blue-400"
                >
                  <FaGithub />
                </a>

                <a
                  href="https://linkedin.com/in/johnesonu-213970291"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:text-blue-400"
                >
                  <FaLinkedin />
                </a>

                <a
                  href="mailto:esonujohn9@gmail.com"
                  aria-label="Email"
                  className="transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:text-blue-400"
                >
                  <MdEmail />
                </a>

              </div>

              <p className="mt-8 leading-7 text-gray-400">
                Designed and developed using{" "}
                <span className="font-semibold text-white">
                  Next.js
                </span>
                ,{" "}
                <span className="font-semibold text-white">
                  TypeScript
                </span>
                ,{" "}
                <span className="font-semibold text-white">
                  Tailwind CSS
                </span>
                , and{" "}
                <span className="font-semibold text-white">
                  Framer Motion
                </span>
                .
              </p>
            </div>
          </Reveal>

        </div>

        {/* Bottom */}
        <Reveal delay={0.3}>
          <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-slate-700 pt-8 md:flex-row">

            <p className="text-center text-gray-500 md:text-left">
              © {year} John Esonu • Designed & Developed by John Esonu
            </p>

            <a
              href="#home"
              className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg"
            >
              <ArrowUp size={18} />
              Back to Top
            </a>

          </div>
        </Reveal>

      </div>
    </footer>
  );
}