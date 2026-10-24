"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { CONTACT_EMAIL } from "@/lib/site";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setSuccess("Message sent successfully!");

      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send message."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="bg-white/40 px-6 py-24 transition-colors duration-500 dark:bg-transparent"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="font-semibold uppercase tracking-widest text-blue-800">
            Contact
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl dark:text-white">
            Let&apos;s Work Together
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            Whether it&apos;s an internship, backend development project,
            AI automation solution, or collaboration opportunity,
            I&apos;d be happy to connect.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-8"
          >

            <div className="flex items-start gap-5 rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
              <div className="rounded-xl bg-blue-100 p-3 dark:bg-slate-800">
                <Mail className="text-blue-800" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Email
                </h3>

                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-gray-600 transition hover:text-blue-600 dark:text-gray-400"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5 rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
              <div className="rounded-xl bg-blue-100 p-3 dark:bg-slate-800">
                <FaGithub className="text-xl text-blue-800" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  GitHub
                </h3>

                <a
                  href="https://github.com/Esjen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition hover:text-blue-600 dark:text-gray-400"
                >
                  github.com/Esjen
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5 rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
              <div className="rounded-xl bg-blue-100 p-3 dark:bg-slate-800">
                <FaLinkedin className="text-xl text-blue-800" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  LinkedIn
                </h3>

                <a
                  href="https://linkedin.com/in/johnesonu-213970291"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition hover:text-blue-600 dark:text-gray-400"
                >
                  linkedin.com/in/johnesonu-213970291
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5 rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
              <div className="rounded-xl bg-blue-100 p-3 dark:bg-slate-800">
                <MapPin className="text-blue-800" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Location
                </h3>

                <p className="text-gray-600 dark:text-gray-400">
                  Lagos, Nigeria
                </p>
              </div>
            </div>

          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-900"
          >

            <h3 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
              Send Me a Message
            </h3>

            <div className="space-y-6">

              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  placeholder="Tell me about your project..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  aria-describedby="contact-privacy"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <p
                  id="contact-privacy"
                  className="mt-2 text-sm text-slate-600 dark:text-slate-400"
                >
                  I only use your details to reply to this message.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {/* Status messages are announced to screen readers. */}
              <div role="status" aria-live="polite">
                {success && (
                  <p className="text-center font-medium text-green-800 dark:text-green-400">
                    {success}
                  </p>
                )}
              </div>

              {error && (
                <p
                  role="alert"
                  className="text-center font-medium text-red-800 dark:text-red-400"
                >
                  {error}
                </p>
              )}

            </div>

          </motion.form>

        </div>
      </div>
    </section>
  );
}