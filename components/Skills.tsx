"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  BrainCircuit,
  Wrench,
} from "lucide-react";
import Reveal from "@/components/Reveal";

const skillGroups = [
  {
    title: "Programming Languages",
    description: "Languages I use to build software and solve problems.",
    icon: Code2,
    skills: [
      "JavaScript",
      "TypeScript",
      "Python",
      "C++",
      "SQL",
    ],
  },
  {
    title: "Backend & Databases",
    description: "Building scalable APIs, backend services, and databases.",
    icon: Database,
    skills: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "REST APIs",
      "PostgreSQL",
      "MongoDB",
    ],
  },
  {
    title: "AI & Automation",
    description: "Designing intelligent workflows and AI-powered automation.",
    icon: BrainCircuit,
    skills: [
      "n8n",
      "AI Workflow Automation",
      "Prompt Engineering",
      "Telegram Bot API",
      "Google Sheets API",
      "Document Classification",
    ],
  },
  {
    title: "Tools & Technologies",
    description: "Modern development tools used in my daily workflow.",
    icon: Wrench,
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Git",
      "GitHub",
      "Docker",
      "Postman",
      "VS Code",
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="bg-slate-50 py-24 px-6 transition-colors duration-500 dark:bg-transparent"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <Reveal className="mb-16 text-center">
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            Skills
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl dark:text-white">
            Technologies I Work With
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            My technical toolkit spans backend development, AI automation,
            cloud-ready technologies, databases, and modern frontend
            frameworks. I enjoy learning new technologies and applying them
            to solve real-world problems.
          </p>
        </Reveal>

        {/* Skill Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;

            return (
              <Reveal
                key={group.title}
                delay={index * 0.15}
                className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
              >
                {/* Header */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
                    <Icon
                      size={28}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {group.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {group.description}
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: skillIndex * 0.04,
                      }}
                      viewport={{ once: true }}
                      className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 transition duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-blue-300 dark:hover:bg-blue-600 dark:hover:text-white"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}