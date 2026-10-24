"use client";

import { Pause, Play } from "lucide-react";

import useAnimationsPaused, {
  setAnimationsPaused,
} from "@/hooks/useAnimationsPaused";

/** Lets anyone pause the stars, clouds and typing line (WCAG 2.2.2). */
export default function AnimationToggle() {
  const paused = useAnimationsPaused();

  return (
    <button
      type="button"
      onClick={() => setAnimationsPaused(!paused)}
      aria-pressed={paused}
      className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full border border-slate-500 bg-white/90 px-3 py-2 text-xs font-medium text-slate-900 backdrop-blur transition hover:bg-white motion-reduce:hidden dark:border-slate-600 dark:bg-slate-900/85 dark:text-slate-200 dark:hover:bg-slate-800"
    >
      {paused ? (
        <Play size={14} aria-hidden="true" />
      ) : (
        <Pause size={14} aria-hidden="true" />
      )}
      {paused ? "Play animations" : "Pause animations"}
    </button>
  );
}
