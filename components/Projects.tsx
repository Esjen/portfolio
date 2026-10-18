"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-slate-50 px-6 py-24 transition-colors duration-500 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <Reveal className="mb-16 text-center">
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            Portfolio
          </p>

          <h2
            id="projects-heading"
            className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl dark:text-white"
          >
            Featured Projects
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            Machine-learning security tools, full-stack applications, and
            AI automation workflows. Open the ClearSight project details page for the
            full story behind one of them.
          </p>
        </Reveal>

        {/* Projects */}
        <div className="grid gap-8 lg:grid-cols-2">

          {projects.map((project, index) => {
            const caseStudyHref = project.details
              ? `/projects/${project.slug}`
              : "";

            const image = (
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                    project.imagePosition === "top"
                      ? "object-top"
                      : "object-center"
                  }`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                {caseStudyHref && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
                    <span className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-slate-900 backdrop-blur">
                      View project details
                    </span>
                  </div>
                )}

                {project.featured && (
                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg">
                    <Star size={16} fill="currentColor" aria-hidden="true" />
                    Featured
                  </div>
                )}
              </div>
            );

            const hasLinks = project.github || project.demo || caseStudyHref;

            return (
              <Reveal
                key={project.slug}
                delay={(index % 2) * 0.15}
                className="h-full"
              >
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(37,99,235,0.18)] dark:border-slate-700 dark:bg-slate-900">

                  {/* Image (links to its project details page when there is one) */}
                  {caseStudyHref ? (
                    <Link
                      href={caseStudyHref}
                      aria-label={`View the ${project.title} project details`}
                      className="block"
                    >
                      {image}
                    </Link>
                  ) : (
                    image
                  )}

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-8">

                    <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
                      {project.title}
                    </h3>

                    <p className="mb-6 leading-8 text-gray-600 dark:text-gray-400">
                      {project.summary}
                    </p>

                    {/* Tech Stack */}
                    <ul
                      aria-label={`${project.title} tech stack`}
                      className="mb-8 flex flex-wrap gap-3"
                    >
                      {project.tech.map((tech, techIndex) => (
                        <motion.li
                          key={tech}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.25,
                            delay: techIndex * 0.04,
                          }}
                          viewport={{ once: true }}
                          className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-slate-800 dark:text-blue-300"
                        >
                          {tech}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Buttons: only links that go somewhere */}
                    <div className="mt-auto flex flex-wrap gap-4">

                      {caseStudyHref && (
                        <Link
                          href={caseStudyHref}
                          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                          <ArrowUpRight size={18} aria-hidden="true" />
                          Project details
                        </Link>
                      )}

                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                          <ExternalLink size={18} aria-hidden="true" />
                          Live site
                        </a>
                      )}

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
                        >
                          <FaGithub aria-hidden="true" />
                          GitHub
                        </a>
                      )}

                      {!hasLinks && (
                        <span className="rounded-xl border border-gray-300 px-5 py-3 text-gray-500 dark:border-slate-700 dark:text-gray-400">
                          Private repository
                        </span>
                      )}

                    </div>

                  </div>

                </article>
              </Reveal>
            );
          })}

        </div>

      </div>
    </section>
  );
}
