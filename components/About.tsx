"use client";

import {
  GraduationCap,
  Briefcase,
  Bot,
  Code2,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import AnimatedCounter from "@/components/AnimatedCounter";

const highlights = [
  {
    icon: GraduationCap,
    title: "Computer Science Student",
    description:
      "Final-year Computer Science student with a strong interest in backend engineering, software architecture, and AI-driven solutions.",
  },
  {
    icon: Briefcase,
    title: "Internship Experience",
    description:
      "Currently gaining hands-on experience building backend systems and AI automation workflows during my internship at Innovation Growth Hub.",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description:
      "Design and build intelligent workflow automations using n8n, AI agents, document processing systems, and business automation solutions.",
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    description:
      "Develop responsive web applications and scalable REST APIs using React, Next.js, Node.js, FastAPI, PostgreSQL, MongoDB, and TypeScript.",
  },
];

const stats = [
  {
    value: 10,
    suffix: "+",
    label: "Projects Built",
  },
  {
    value: 8,
    suffix: "+",
    label: "Technologies",
  },
  {
    value: 5,
    suffix: "+",
    label: "AI Workflows",
  },
  {
    value: 1,
    suffix: "",
    label: "Internship",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="bg-white px-6 py-24 transition-colors duration-500 dark:bg-transparent"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left */}
          <Reveal>
            <div>
              <p className="font-semibold uppercase tracking-widest text-blue-600">
                About Me
              </p>

              <h2 className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl dark:text-white">
                Building Intelligent Software & AI Automation Solutions
              </h2>

              <p className="mt-8 text-lg leading-8 text-gray-600 dark:text-gray-400">
                I&apos;m a final-year Computer Science student passionate about
                building intelligent software that solves real-world problems.
                My focus spans backend engineering, AI workflow automation,
                cloud technologies, and scalable web applications.
              </p>

              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                During my internship, I&apos;ve been developing backend systems,
                automation workflows, and AI-powered solutions while continually
                expanding my expertise in modern software engineering practices.
              </p>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <Reveal
                    key={stat.label}
                    delay={0.2 + index * 0.1}
                  >
                    <div className="rounded-2xl bg-slate-50 p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-slate-800">
                      <h3 className="text-3xl font-bold text-blue-600">
                        <AnimatedCounter
                          value={stat.value}
                          suffix={stat.suffix}
                        />
                      </h3>

                      <p className="mt-2 text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right */}
          <div className="grid gap-6 sm:grid-cols-2">
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal
                  key={item.title}
                  delay={index * 0.15}
                  className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
                    <Icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  </div>

                  <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="leading-7 text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </Reveal>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}