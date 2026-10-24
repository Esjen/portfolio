"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import useAnimationsPaused from "@/hooks/useAnimationsPaused";

interface TypewriterProps {
  phrases: string[];
  /** Keep cycling forever. Off: type to the last phrase and stop. */
  loop?: boolean;
  /** Small text shown beside a phrase once it is fully typed, e.g. a translation. */
  notes?: Record<string, string>;
  className?: string;
  as?: "p" | "h2";
}

type Mode = "typing" | "erasing";

const TYPE_MS = 55;
const ERASE_MS = 30;
const HOLD_MS = 1800;

const query = "(prefers-reduced-motion: reduce)";

function subscribeToMotion(onChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/**
 * Types each phrase and erases it. Visitors who prefer reduced motion, or who
 * press "Pause animations", see all the phrases at once instead.
 */
export default function Typewriter({
  phrases,
  loop = false,
  notes = {},
  className = "text-xl font-medium",
  as: Tag = "p",
}: TypewriterProps) {
  const prefersReduced = useSyncExternalStore(
    subscribeToMotion,
    () => window.matchMedia(query).matches,
    () => false
  );
  const paused = useAnimationsPaused();
  const still = prefersReduced || paused;

  const [view, setView] = useState<{ index: number; length: number; mode: Mode; done: boolean }>({
    index: 0,
    length: 0,
    mode: "typing",
    done: false,
  });

  useEffect(() => {
    if (still || view.done) return;

    const phrase = phrases[view.index];
    const isLast = view.index === phrases.length - 1;
    let delay = TYPE_MS;
    let next = view;

    if (view.mode === "typing") {
      if (view.length < phrase.length) {
        next = { ...view, length: view.length + 1 };
      } else if (isLast && !loop) {
        next = { ...view, done: true };
      } else {
        next = { ...view, mode: "erasing" };
        delay = HOLD_MS;
      }
    } else if (view.length > 0) {
      next = { ...view, length: view.length - 1 };
      delay = ERASE_MS;
    } else {
      next = {
        index: (view.index + 1) % phrases.length,
        length: 0,
        mode: "typing",
        done: false,
      };
    }

    const timer = window.setTimeout(() => setView(next), delay);
    return () => window.clearTimeout(timer);
  }, [view, phrases, loop, still]);

  const withNote = (phrase: string) =>
    notes[phrase] ? `${phrase} (${notes[phrase]})` : phrase;

  const current = phrases[view.index];
  const complete = view.length === current.length;
  const text = still
    ? phrases.map(withNote).join("  ·  ")
    : current.slice(0, view.length);

  return (
    <Tag className={className}>
      {/* Screen readers get the full text once, not every typed letter. */}
      <span className="sr-only">{phrases.map(withNote).join(", ")}</span>

      <span aria-hidden="true">
        {text}
        {!still && !view.done && <span className="caret" />}
        {!still && complete && notes[current] && (
          <span className="ml-3 text-base font-normal opacity-80">
            ({notes[current]})
          </span>
        )}
      </span>
    </Tag>
  );
}
