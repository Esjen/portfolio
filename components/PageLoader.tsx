"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-slate-950"
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-5xl font-bold text-blue-600">
              John Esonu
            </p>

            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              AI Automation Engineer
            </p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 180 }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
              }}
              className="mx-auto mt-10 h-1 rounded-full bg-blue-600"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}