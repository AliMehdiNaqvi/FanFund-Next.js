// app/components/FloatingHearts.tsx
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const heartVariants = {
  initial: () => ({
    x: Math.random() * window.innerWidth,
    y: window.innerHeight + 50,
    opacity: 0.6,
    scale: 0.5 + Math.random(),
  }),
  animate: () => ({
    y: -100,
    opacity: 0,
    transition: {
      duration: 5 + Math.random() * 3,
      repeat: Infinity,
      repeatType: "loop",
    },
  }),
};

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    setHearts(Array.from({ length: 12 }, (_, i) => i));
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10 overflow-hidden">
      {hearts.map((i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400 text-2xl"
          custom={i}
          initial="initial"
          animate="animate"
          variants={heartVariants}
        >
          💖
        </motion.div>
      ))}
    </div>
  );
}
