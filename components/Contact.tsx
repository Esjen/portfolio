"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

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
      className="bg-slate-50 px-6 py-24 transition-colors duration-500 dark:bg-transparent"
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
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            Contact
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl dark:text-white">
            Let's Work Together
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            Whether it's an internship, backend development project,
            AI automation solution, or collaboration opportunity,
            I'd be happy to connect.
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
                <Mail className="text-blue-600" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Email
                </h3>

                <a
                  href="mailto:john.esonu@pau.edu.ng"
                  className="text-gray-600 transition hover:text-blue-600 dark:text-gray-400"
                >
                  john.esonu@pau.edu.ng
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5 rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
              <div className="rounded-xl bg-blue-100 p-3 dark:bg-slate-800">
                <FaGithub className="text-xl text-blue-600" />
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
                <FaLinkedin className="text-xl text-blue-600" />
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
                <MapPin className="text-blue-600" />
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

              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />

              <textarea
                rows={6}
                placeholder="Tell me about your project..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {success && (
                <p className="text-center font-medium text-green-600">
                  {success}
                </p>
              )}

              {error && (
                <p className="text-center font-medium text-red-600">
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