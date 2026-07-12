"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Reveal from "@/components/Reveal";

const projects = [
  {
    title: "AI Expense Tracker",
    image: "/projects/expense-tracker.png",
    featured: true,
    description:
      "An intelligent expense tracking system built with n8n that uses Telegram, AI-powered text extraction, and Google Sheets to automatically categorize expenses and generate organized financial records.",
    tech: [
      "n8n",
      "Telegram Bot",
      "Google Sheets",
      "AI",
      "Automation",
    ],
    github: "",
    demo: "",
  },
  {
    title: "AI Document Classifier",
    image: "/projects/document-classifier.png",
    featured: true,
    description:
      "An AI-powered workflow that automatically classifies uploaded documents, routes them to the appropriate destination, and reduces manual document processing using intelligent automation.",
    tech: [
      "n8n",
      "AI",
      "Automation",
      "Document Processing",
    ],
    github: "",
    demo: "",
  },
  {
    title: "Personal Portfolio",
    image: "/projects/portfolio.png",
    featured: false,
    description:
      "A modern developer portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion featuring responsive design, dark mode, smooth animations, and project showcases.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Dark Mode",
    ],
    github: "https://github.com/Esjen",
    demo: "",
  },
  {
    title: "Result Management System",
    image: "",
    featured: false,
    description:
      "A C++ desktop application that manages student records, computes GPAs, updates examination scores, and securely stores academic information using file handling techniques.",
    tech: [
      "C++",
      "File Handling",
      "Authentication",
      "GPA",
    ],
    github: "",
    demo: "",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-slate-50 px-6 py-24 transition-colors duration-500 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <Reveal className="mb-16 text-center">
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            Portfolio
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl dark:text-white">
            Featured Projects
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            A collection of software engineering, backend development,
            and AI automation projects that demonstrate my experience
            building scalable applications and intelligent workflows.
          </p>
        </Reveal>

        {/* Projects */}
        <div className="grid gap-8 lg:grid-cols-2">

          {projects.map((project, index) => (

            <Reveal
              key={project.title}
              delay={index * 0.15}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(37,99,235,0.18)] dark:border-slate-700 dark:bg-slate-900"
            >

              {/* Image */}
              <div className="relative h-60 overflow-hidden">

                {project.image ? (
                  <>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width:768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Animated Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Hover Label */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                      <span className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-slate-900 backdrop-blur">
                        View Project
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-center text-3xl font-bold text-white">
                    {project.title}
                  </div>
                )}

                {project.featured && (
                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg transition-transform duration-300 group-hover:scale-105">
                    <Star
                      size={16}
                      fill="currentColor"
                    />
                    Featured
                  </div>
                )}

              </div>

              {/* Content */}
              <div className="p-8">

                <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
                  {project.title}
                </h3>

                <p className="mb-6 leading-8 text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-8 flex flex-wrap gap-3">

                  {project.tech.map((tech, techIndex) => (

                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.25,
                        delay: techIndex * 0.04,
                      }}
                      viewport={{ once: true }}
                      className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-blue-300 dark:hover:bg-blue-600 dark:hover:text-white"
                    >
                      {tech}
                    </motion.span>

                  ))}

                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 transition-all duration-500 group-hover:-translate-y-1">

                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
                    >
                      <FaGithub />
                      GitHub
                    </a>
                  ) : (
                    <button
                      disabled
                      className="cursor-not-allowed rounded-xl border border-gray-300 px-5 py-3 text-gray-500 dark:border-slate-700 dark:text-gray-500"
                    >
                      Private Repository
                    </button>
                  )}

                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
                  ) : (
                    <button
                      disabled
                      className="cursor-not-allowed rounded-xl bg-gray-200 px-5 py-3 text-gray-600 dark:bg-slate-800 dark:text-gray-400"
                    >
                      Demo Coming Soon
                    </button>
                  )}

                </div>

              </div>

            </Reveal>

          ))}

        </div>

      </div>
    </section>
  );
}