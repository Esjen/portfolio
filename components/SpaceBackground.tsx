"use client";

import { useEffect, useRef } from "react";

import {
  createSky,
  drawShootingStar,
  drawSky,
  isShootingStarDone,
  linkConstellation,
  spawnShootingStar,
  type ShootingStar,
  type Sky,
  type SkyColors,
} from "@/lib/space";

/**
 * Animated night sky behind the whole page, shown only in dark mode.
 *
 * - The drawing code lives in lib/space.ts.
 * - Colours come from the CSS custom properties in globals.css (design tokens).
 * - It stops animating when the theme is light, when the tab is hidden, and
 *   draws a single still frame if the visitor prefers reduced motion.
 */
export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const root = document.documentElement;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let sky: Sky | null = null;
    let shootingStar: ShootingStar | null = null;
    let nextShootingStarAt = 0;
    let colors: SkyColors = { warm: "#f6efe4", cool: "#cfdcff", line: "170 190 235" };
    let frame = 0;

    const isDark = () => root.classList.contains("dark");

    const readColors = () => {
      const styles = getComputedStyle(root);
      colors = {
        warm: styles.getPropertyValue("--star-warm").trim() || colors.warm,
        cool: styles.getPropertyValue("--star-cool").trim() || colors.cool,
        line: styles.getPropertyValue("--star-line").trim() || colors.line,
      };
    };

    /** Fits the canvas to the window and keeps it sharp on high-DPI screens. */
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const previousWidth = width;

      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      // Make a new sky on first run or when the width changes a lot
      // (for example when a phone rotates). Otherwise just re-link it.
      if (!sky || Math.abs(width - previousWidth) / (previousWidth || 1) > 0.25) {
        sky = createSky(width, height);
      } else {
        linkConstellation(sky, width, height);
      }
    };

    const render = (time: number, animate: boolean) => {
      if (!sky) return;
      drawSky(context, sky, {
        width,
        height,
        time,
        scroll: window.scrollY,
        animate,
        colors,
      });

      if (!animate) return;

      if (!shootingStar && time > nextShootingStarAt) {
        shootingStar = spawnShootingStar(width, height, time);
      }
      if (shootingStar) {
        if (isShootingStarDone(shootingStar, time)) {
          shootingStar = null;
          nextShootingStarAt = time + 7000 + Math.random() * 8000;
        } else {
          drawShootingStar(context, shootingStar, time, colors);
        }
      }
    };

    const loop = (time: number) => {
      render(time, true);
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
    };

    const start = () => {
      stop();
      if (!isDark()) {
        context.clearRect(0, 0, width, height);
        return;
      }

      readColors();
      resize();

      if (motion.matches) {
        render(0, false); // one still frame
        return;
      }

      nextShootingStarAt = performance.now() + 3000;
      frame = requestAnimationFrame(loop);
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!isDark()) return;
        resize();
        if (motion.matches) render(0, false);
      }, 150);
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    start();

    // Re-run when the theme class on <html> changes, or the motion setting does.
    const themeObserver = new MutationObserver(start);
    themeObserver.observe(root, { attributes: true, attributeFilter: ["class"] });
    motion.addEventListener("change", start);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.clearTimeout(resizeTimer);
      themeObserver.disconnect();
      motion.removeEventListener("change", start);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 hidden h-full w-full dark:block"
    />
  );
}
