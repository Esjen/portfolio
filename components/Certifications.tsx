"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import Reveal from "@/components/Reveal";

type Certification = {
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  imageAlt: string;
  link: string;
  linkLabel: string;
};

const certifications: Certification[] = [
  {
    title: "AI Automation with n8n",
    issuer: "Innovation Growth Hub",
    date: "2026",
    description:
      "Completed Innovation Growth Hub's AI Automation with n8n program, covering workflow automation with n8n.",
    image: "/certificates/igh-ai-automation-n8n.jpg",
    imageAlt: "Innovation Growth Hub certificate of completion for AI Automation with n8n",
    link: "/certificates/igh-ai-automation-n8n.pdf",
    linkLabel: "View certificate",
  },
  {
    title: "Introduction to Packet Tracer",
    issuer: "Cisco Networking Academy",
    date: "Sep 14, 2026",
    description:
      "Student-level credential in building and modifying simulated networks, including IoT devices and a smart home network, in Cisco Packet Tracer.",
    image: "/certificates/cisco-packet-tracer.jpg",
    imageAlt: "Cisco Networking Academy certificate for Introduction to Packet Tracer",
    link: "https://www.credly.com/badges/0b329b3a-3d71-40c9-8943-8d26de868633/linked_in_profile",
    linkLabel: "Verify on Credly",
  },
  {
    title: "Problem Solving (Intermediate)",
    issuer: "HackerRank",
    date: "Sep 19, 2026",
    description:
      "Passed HackerRank's skill certification test for intermediate-level problem solving.",
    image: "/certificates/hackerrank-problem-solving.jpg",
    imageAlt: "HackerRank certificate of accomplishment for Problem Solving (Intermediate)",
    link: "https://www.hackerrank.com/certificates/4d0db4355074",
    linkLabel: "Verify on HackerRank",
  },
  {
    title: "Software Engineer",
    issuer: "HackerRank",
    date: "Sep 29, 2026",
    description:
      "Passed HackerRank's role certification test for the Software Engineer role.",
    image: "/certificates/hackerrank-software-engineer.jpg",
    imageAlt: "HackerRank certificate of accomplishment for Software Engineer",
    link: "https://www.hackerrank.com/certificates/0c422a643916",
    linkLabel: "Verify on HackerRank",
  },
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="bg-transparent px-6 py-24 transition-colors duration-500 dark:bg-transparent"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <Reveal className="mb-16 text-center">
          <p className="font-semibold uppercase tracking-widest text-blue-800">
            Certifications
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl dark:text-white">
            Certificates I&apos;ve Earned
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            Each certificate links to the issuer&apos;s verification page,
            or to the PDF where the issuer doesn&apos;t provide one.
          </p>
        </Reveal>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {certifications.map((cert, index) => (
            <Reveal
              key={cert.title}
              delay={index * 0.1}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <article className="flex h-full flex-col">
                {/* Certificate preview (opens the certificate) */}
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${cert.linkLabel}: ${cert.title}`}
                  className="relative block aspect-[4/3] bg-slate-100 dark:bg-slate-950"
                >
                  <Image
                    src={cert.image}
                    alt={cert.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-3"
                  />
                </a>

                {/* Details */}
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {cert.title}
                  </h3>

                  <p className="mt-2 font-semibold text-blue-800 dark:text-blue-400">
                    {cert.issuer}
                    <span className="font-normal text-gray-600 dark:text-gray-400">
                      {" "}
                      &middot; {cert.date}
                    </span>
                  </p>

                  <p className="mt-4 flex-1 leading-8 text-gray-600 dark:text-gray-400">
                    {cert.description}
                  </p>

                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl border border-blue-600 px-5 py-3 font-medium text-blue-800 transition-colors duration-300 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white"
                  >
                    <ExternalLink size={18} />
                    {cert.linkLabel}
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
