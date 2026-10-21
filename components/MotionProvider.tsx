"use client";

import { MotionConfig } from "framer-motion";

/**
 * Makes every framer-motion animation on the site respect the visitor's
 * "reduce motion" setting. Movement is switched off; simple fades remain.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
