"use client";

import { Award, Calendar, BadgeCheck } from "lucide-react";
import Reveal from "@/components/Reveal";

const certifications = [
  {
    title: "ALX AI Career Essentials",
    issuer: "ALX Africa",
    year: "2025",
    description:
      "Completed intensive training covering AI fundamentals, prompt engineering, productivity with AI, responsible AI usage, and practical applications for modern software development.",
    verified: true,
  },
  {
    title: "AI Automation with n8n",
    issuer: "Self-Directed Learning",
    year: "2026",
    description:
      "Designed intelligent workflow automations using n8n, AI agents, Telegram bots, APIs, and third-party integrations to automate business processes.",
    verified: true,
  },
  {
    title: "Backend Development",
    issuer: "Innovation Growth Hub Internship",
    year: "2026",
    description:
      "Built backend services, REST APIs, database integrations, and automation systems using Node.js, FastAPI, PostgreSQL, and modern development tools.",
    verified: true,
  },
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="bg-white py-24 px-6 transition-colors duration-500 dark:bg-slate-900"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <Reveal className="mb-16 text-center">
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            Certifications
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl dark:text-white">
            Learning & Professional Development
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            I continuously expand my knowledge through certifications,
            professional training, internships, and hands-on software
            engineering projects.
          </p>
        </Reveal>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {certifications.map((cert, index) => (

            <Reveal
              key={cert.title}
              delay={index * 0.15}
              className="group rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800"
            >

              {/* Header */}
              <div className="mb-6 flex items-center justify-between">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 transition-transform duration-300 group-hover:scale-110 dark:bg-slate-700">
                  <Award
                    size={30}
                    className="text-blue-600"
                  />
                </div>

                {cert.verified && (
                  <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <BadgeCheck size={16} />
                    Verified
                  </div>
                )}

              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {cert.title}
              </h3>

              <p className="mt-2 font-semibold text-blue-600">
                {cert.issuer}
              </p>

              <div className="mt-4 flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <Calendar size={16} />
                {cert.year}
              </div>

              <p className="mt-6 leading-8 text-gray-600 dark:text-gray-400">
                {cert.description}
              </p>

            </Reveal>

          ))}

        </div>

      </div>
    </section>
  );
}