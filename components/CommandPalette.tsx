"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Command } from "cmdk";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  const closePalette = useCallback(() => {
    setOpen(false);
  }, []);

  const items = useMemo(
    () => [
      {
        label: "About",
        action: () =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        label: "Skills",
        action: () =>
          document
            .getElementById("skills")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        label: "Experience",
        action: () =>
          document
            .getElementById("experience")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        label: "Projects",
        action: () =>
          document
            .getElementById("projects")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        label: "Certifications",
        action: () =>
          document
            .getElementById("certifications")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        label: "Contact",
        action: () =>
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        label: "Download CV",
        action: () => window.open("/John_Esonu_CV.pdf", "_blank"),
      },
      {
        label: "GitHub",
        action: () =>
          window.open("https://github.com/Esjen", "_blank"),
      },
      {
        label: "LinkedIn",
        action: () =>
          window.open(
            "https://linkedin.com/in/johnesonu-213970291",
            "_blank"
          ),
      },
      {
        label: "Email",
        action: () =>
          window.open("mailto:john.esonu@pau.edu.ng"),
      },
    ],
    []
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", down);

    return () => {
      window.removeEventListener("keydown", down);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-start justify-center bg-black/50 pt-24 backdrop-blur-sm transition-opacity duration-200 ${
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      onClick={closePalette}
    >
      <Command
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-700 bg-white shadow-2xl dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <Command.Input
          placeholder="Search..."
          className="w-full border-b border-slate-200 bg-transparent px-5 py-4 text-lg outline-none dark:border-slate-700 dark:text-white"
        />

        <Command.List className="max-h-96 overflow-y-auto p-2">
          {items.map((item) => (
            <Command.Item
              key={item.label}
              onSelect={() => {
                setOpen(false);

                requestAnimationFrame(() => {
                  item.action();
                });
              }}
              className="cursor-pointer rounded-lg px-4 py-3 text-slate-700 aria-selected:bg-blue-600 aria-selected:text-white dark:text-slate-200"
            >
              {item.label}
            </Command.Item>
          ))}
        </Command.List>
      </Command>
    </div>
  );
}