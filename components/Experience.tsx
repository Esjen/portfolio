"use client";

import {
  Briefcase,
  Calendar,
  Building2,
  CheckCircle2,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import AnimatedCounter from "@/components/AnimatedCounter";

const experiences = [
  {
    role: "Backend Development & AI Automation Intern",
    company: "Innovation Growth Hub",
    period: "June 2026 – Present",
    description:
      "Working with the backend development team to build scalable software solutions, automate business processes, and develop AI-powered workflow systems using modern backend technologies.",
    achievements: [
      "Designed AI-powered workflow automations using n8n.",
      "Built Telegram bot integrations for business automation.",
      "Developed REST APIs with Node.js and FastAPI.",
      "Integrated AI agents into workflow automation pipelines.",
      "Collaborated using Git and GitHub in an agile team environment.",
    ],
  },
];

const stats = [
  {
    value: 10,
    suffix: "+",
    label: "Projects",
  },
  {
    value: 5,
    suffix: "+",
    label: "AI Workflows",
  },
  {
    value: 20,
    suffix: "+",
    label: "REST Endpoints",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="bg-white px-6 py-24 transition-colors duration-500 dark:bg-transparent"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <Reveal className="mb-16 text-center">
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            Experience
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl dark:text-white">
            Professional Experience
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            My professional journey has focused on backend engineering,
            AI automation, and building practical software solutions that
            improve business productivity.
          </p>
        </Reveal>

        {experiences.map((job) => (
          <Reveal
            key={job.role}
            className="overflow-hidden rounded-3xl border border-gray-200 bg-slate-50 shadow-lg dark:border-slate-700 dark:bg-slate-800"
          >

            {/* Header */}
            <div className="border-b border-gray-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-900">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div>
                  <div className="flex items-center gap-3">
                    <Briefcase
                      className="text-blue-600"
                      size={28}
                    />

                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {job.role}
                    </h3>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Building2 size={18} />
                    <span className="font-medium">
                      {job.company}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-blue-100 px-4 py-2 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  <Calendar size={18} />
                  {job.period}
                </div>

              </div>
            </div>

            {/* Body */}
            <div className="grid gap-10 p-8 lg:grid-cols-3">

              {/* Left */}
              <div className="lg:col-span-2">

                <p className="leading-8 text-gray-600 dark:text-gray-400">
                  {job.description}
                </p>

                <div className="mt-8 space-y-4">
                  {job.achievements.map((achievement) => (
                    <div
                      key={achievement}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={20}
                        className="mt-1 text-blue-600"
                      />

                      <p className="text-gray-700 dark:text-gray-300">
                        {achievement}
                      </p>
                    </div>
                  ))}
                </div>

              </div>

              {/* Right */}
              <div className="space-y-5">
                {stats.map((stat, index) => (
                  <Reveal
                    key={stat.label}
                    delay={0.2 + index * 0.1}
                  >
                    <div className="rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-slate-900">
                      <h4 className="text-3xl font-bold text-blue-600">
                        <AnimatedCounter
                          value={stat.value}
                          suffix={stat.suffix}
                        />
                      </h4>

                      <p className="mt-2 text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

            </div>

          </Reveal>
        ))}

      </div>
    </section>
  );
}