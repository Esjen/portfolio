"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Typewriter from "@/components/Typewriter";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CONTACT_EMAIL, GITHUB_URL } from "@/lib/site";

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Docker",
  "n8n",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        overflow-hidden
        px-6
        pt-28
        transition-colors
        duration-500
        dark:bg-none
      "
    >



      <div className="relative z-10 mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-16 lg:flex-row">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left"
        >
          {/* Status Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 shadow-sm dark:bg-blue-900/40 dark:text-blue-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
            Available for Internships
          </div>

          <p className="mb-4 text-lg font-semibold text-blue-800 dark:text-blue-400">
            👋 Hello, I&apos;m
          </p>

          <h1 className="mb-6 text-5xl font-black text-slate-900 md:text-7xl dark:text-white">
            John{" "}
            <span className="text-blue-800 dark:text-blue-400">
              Esonu
            </span>
          </h1>

          {/* Typing Animation */}
          <div className="mb-6 min-h-10">
            <Typewriter
              as="h2"
              loop
              phrases={[
                "AI Automation Engineer",
                "Backend Developer",
                "Full-Stack Developer",
                "n8n Automation Specialist",
                "Software Engineer",
                "Tech enthusiast",
                "Imperfect",
                "Ever growing",
                "Pauca sed matura",
              ]}
              notes={{ "Pauca sed matura": "few, but ripe" }}
              className="text-2xl font-medium text-gray-700 dark:text-gray-300"
            />
          </div>

          <p className="mb-10 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            I build AI-powered automation solutions, scalable backend systems,
            and modern web applications. I specialize in designing intelligent
            workflows using{" "}
            <strong className="text-slate-900 dark:text-white">
              n8n
            </strong>
            , developing REST APIs with{" "}
            <strong className="text-slate-900 dark:text-white">
              Node.js
            </strong>{" "}
            and{" "}
            <strong className="text-slate-900 dark:text-white">
              FastAPI
            </strong>
            , and building responsive applications with{" "}
            <strong className="text-slate-900 dark:text-white">
              React
            </strong>{" "}
            and{" "}
            <strong className="text-slate-900 dark:text-white">
              Next.js
            </strong>
            .
          </p>

          {/* Buttons */}
          <div className="mb-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <a
              href="#projects"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-2xl"
            >
              View Projects
            </a>

            <a
              href="/John_Esonu_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border-2 border-blue-600 px-6 py-3 font-semibold text-blue-800 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-slate-800"
            >
              Download CV
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 text-2xl text-gray-700 dark:text-gray-300 lg:justify-start">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub className="transition-all duration-300 hover:scale-110 hover:text-blue-600 dark:hover:text-blue-400" />
            </a>

            <a
              href="https://linkedin.com/in/johnesonu-213970291"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="transition-all duration-300 hover:scale-110 hover:text-blue-600 dark:hover:text-blue-400" />
            </a>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label="Email"
            >
              <MdEmail className="transition-all duration-300 hover:scale-110 hover:text-blue-600 dark:hover:text-blue-400" />
            </a>
          </div>

          {/* Tech Stack */}
          <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-transparent bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="flex flex-1 justify-center"
        >
          <div className="relative h-80 w-80 overflow-hidden rounded-full border-8 border-white shadow-2xl ring-8 ring-blue-200/40 transition-all duration-500 hover:scale-105 dark:border-slate-700 dark:ring-blue-900/40 dark:shadow-blue-950/40">
            <Image
              src="/images/profile.jpg"
              alt="John Esonu"
              fill
              priority
              sizes="(max-width: 768px) 320px, 400px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 dark:text-gray-400"
      >
        ↓ Scroll
      </motion.div>
    </section>
  );
}