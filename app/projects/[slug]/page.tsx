import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import Reveal from "@/components/Reveal";
import ThemeToggle from "@/components/ThemeToggle";
import {
  CONTACT_EMAIL,
  LINKEDIN_URL,
  getProject,
  projects,
} from "@/lib/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Build one static page for every project that has a project details page. */
export function generateStaticParams() {
  return projects
    .filter((project) => project.details)
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project?.details) return {};

  return {
    title: `${project.title}: project details`,
    description: project.summary,
    openGraph: {
      title: `${project.title}: project details | John Esonu`,
      description: project.summary,
      images: [{ url: project.image, alt: project.imageAlt }],
    },
  };
}

function SectionHeading({
  id,
  eyebrow,
  children,
}: {
  id: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white"
      >
        {children}
      </h2>
    </div>
  );
}

const sectionClass = "px-6 py-12 md:py-16";
const containerClass = "mx-auto max-w-5xl";
const cardClass =
  "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900";

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project || !project.details) notFound();

  const details = project.details;
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `${project.title} project`
  )}`;

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
        <nav
          aria-label="Project details navigation"
          className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4"
        >
          <Link
            href="/#projects"
            className="flex items-center gap-2 font-medium text-slate-700 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            All projects
          </Link>

          <Link
            href="/"
            className="hidden text-xl font-bold text-blue-600 transition hover:text-blue-700 sm:block"
          >
            John Esonu
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href={mailto}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Get in touch
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* ---------- Title ---------- */}
        <section
          aria-labelledby="project-title"
          className="px-6 pb-8 pt-14 md:pt-20"
        >
          <div className={containerClass}>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Project details
            </p>

            <h1
              id="project-title"
              className="mt-4 text-5xl font-bold text-slate-900 md:text-6xl dark:text-white"
            >
              {project.title}
            </h1>

            <p className="mt-5 max-w-3xl text-xl leading-9 text-gray-600 dark:text-gray-400">
              {details.tagline}
            </p>

            <ul className="mt-6 flex flex-wrap gap-3">
              {details.meta.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-slate-800 dark:text-blue-300"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  <FaGithub aria-hidden="true" />
                  View the code
                </a>
              )}

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                  Live site
                </a>
              )}

              <a
                href={mailto}
                className="flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-medium transition hover:bg-gray-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                <Mail size={18} aria-hidden="true" />
                Ask me about it
              </a>
            </div>

            {details.noDemoNote && !project.demo && (
              <p className="mt-6 max-w-3xl rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-7 text-gray-600 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-400">
                {details.noDemoNote}
              </p>
            )}
          </div>
        </section>

        {/* ---------- Key numbers ---------- */}
        <section aria-label="Key results" className="px-6 py-8">
          <div className={containerClass}>
            <Reveal>
              <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {details.results.map((result) => (
                  <div key={result.label} className={`${cardClass} flex flex-col`}>
                    <dt className="order-2 mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {result.label}
                    </dt>
                    <dd className="text-3xl font-bold text-blue-600 sm:text-4xl dark:text-blue-400">
                      {result.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ---------- Overview ---------- */}
        <section aria-labelledby="overview-heading" className={sectionClass}>
          <div className={containerClass}>
            <Reveal>
              <SectionHeading id="overview-heading" eyebrow="Overview">
                What it is
              </SectionHeading>
              <div className="max-w-3xl space-y-5 text-lg leading-8 text-gray-700 dark:text-gray-300">
                {details.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- Problem ---------- */}
        <section
          aria-labelledby="problem-heading"
          className={`${sectionClass} bg-slate-50 dark:bg-slate-900/50`}
        >
          <div className={containerClass}>
            <Reveal>
              <SectionHeading id="problem-heading" eyebrow="The problem">
                What I set out to solve
              </SectionHeading>
              <div className="max-w-3xl space-y-5 text-lg leading-8 text-gray-700 dark:text-gray-300">
                {details.problem.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- Features ---------- */}
        <section aria-labelledby="features-heading" className={sectionClass}>
          <div className={containerClass}>
            <Reveal>
              <SectionHeading id="features-heading" eyebrow="Features">
                What it can do
              </SectionHeading>
            </Reveal>

            <ul className="grid gap-5 sm:grid-cols-2">
              {details.features.map((feature, index) => (
                <li key={feature.title}>
                  <Reveal delay={(index % 2) * 0.1} className="h-full">
                    <div className={`${cardClass} h-full`}>
                      <div className="flex items-start gap-3">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-slate-800 dark:text-blue-400">
                          <Check size={14} aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            {feature.title}
                          </h3>
                          <p className="mt-2 leading-7 text-gray-600 dark:text-gray-400">
                            {feature.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Screenshots ---------- */}
        <section
          aria-labelledby="screenshots-heading"
          className={`${sectionClass} bg-slate-50 dark:bg-slate-900/50`}
        >
          <div className={containerClass}>
            <Reveal>
              <SectionHeading id="screenshots-heading" eyebrow="Screenshots">
                The running app
              </SectionHeading>
            </Reveal>

            <div className="space-y-12">
              {details.screenshots.map((shot, index) => (
                <Reveal key={shot.src}>
                  <figure>
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      priority={index === 0}
                      className="h-auto w-full rounded-xl border border-gray-200 shadow-md dark:border-slate-700"
                    />
                    <figcaption className="mt-4 max-w-3xl text-sm leading-7 text-gray-600 dark:text-gray-400">
                      {shot.caption}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- How it works ---------- */}
        <section aria-labelledby="how-heading" className={sectionClass}>
          <div className={containerClass}>
            <Reveal>
              <SectionHeading id="how-heading" eyebrow="Under the hood">
                How a request flows
              </SectionHeading>
            </Reveal>

            <Reveal>
              <ol className="grid gap-5 md:grid-cols-2">
                {details.howItWorks.map((step, index) => (
                  <li key={step.title} className={cardClass}>
                    <div className="flex items-start gap-4">
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white"
                      >
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                          {step.title}
                        </h3>
                        <p className="mt-2 leading-7 text-gray-600 dark:text-gray-400">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* ---------- Technologies ---------- */}
        <section
          aria-labelledby="tech-heading"
          className={`${sectionClass} bg-slate-50 dark:bg-slate-900/50`}
        >
          <div className={containerClass}>
            <Reveal>
              <SectionHeading id="tech-heading" eyebrow="Technologies">
                What it is built with
              </SectionHeading>

              <dl className="divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-900">
                {details.stack.map((row) => (
                  <div
                    key={row.layer}
                    className="grid gap-1 px-6 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
                  >
                    <dt className="font-semibold text-slate-900 dark:text-white">
                      {row.layer}
                    </dt>
                    <dd className="break-words text-gray-600 dark:text-gray-400">
                      {row.items}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ---------- What I learned ---------- */}
        <section aria-labelledby="learned-heading" className={sectionClass}>
          <div className={containerClass}>
            <Reveal>
              <SectionHeading id="learned-heading" eyebrow="Reflection">
                What I learned
              </SectionHeading>
            </Reveal>

            <ul className="grid gap-5 md:grid-cols-2">
              {details.learned.map((item, index) => (
                <li key={item.title}>
                  <Reveal delay={(index % 2) * 0.1} className="h-full">
                    <div className={`${cardClass} h-full`}>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 leading-7 text-gray-600 dark:text-gray-400">
                        {item.text}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Limitations ---------- */}
        <section
          aria-labelledby="limits-heading"
          className={`${sectionClass} bg-slate-50 dark:bg-slate-900/50`}
        >
          <div className={containerClass}>
            <Reveal>
              <SectionHeading id="limits-heading" eyebrow="Honest notes">
                Limits and next steps
              </SectionHeading>

              <ul className="max-w-3xl list-disc space-y-3 pl-6 text-lg leading-8 text-gray-700 marker:text-blue-600 dark:text-gray-300">
                {details.limitations.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ---------- Call to action ---------- */}
        <section
          aria-labelledby="cta-heading"
          className="px-6 py-16 md:py-20"
        >
          <div className={containerClass}>
            <Reveal>
              <div className="rounded-3xl bg-blue-600 px-8 py-12 text-center text-white md:px-16">
                <h2 id="cta-heading" className="text-3xl font-bold md:text-4xl">
                  Want to talk about {project.title}?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-blue-100">
                  I am happy to walk through the code, the results, or how I
                  would extend it. I am also open to new work.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a
                    href={mailto}
                    className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
                  >
                    <Mail size={18} aria-hidden="true" />
                    Email me
                  </a>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-white/60 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                  >
                    <FaLinkedin aria-hidden="true" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-gray-200 px-6 py-8 text-center text-sm text-gray-600 dark:border-slate-800 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} John Esonu.{" "}
          <Link
            href="/#projects"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Back to all projects
          </Link>
        </p>
      </footer>
    </div>
  );
}
