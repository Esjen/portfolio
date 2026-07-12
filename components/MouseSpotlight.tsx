"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MouseSpotlight() {
  const [position, setPosition] = useState({
    x: -500,
    y: -500,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () =>
      window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      animate={{
        x: position.x - 200,
        y: position.y - 200,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 25,
        mass: 0.4,
      }}
      className="
        pointer-events-none
        fixed
        left-0
        top-0
        z-0
        h-[400px]
        w-[400px]
        rounded-full
        bg-blue-500/10
        blur-3xl
        dark:bg-blue-400/10
      "
    />
  );
}