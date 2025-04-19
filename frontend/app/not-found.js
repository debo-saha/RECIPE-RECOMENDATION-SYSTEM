"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, when: "beforeChildren" }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function NotFound() {
  const [hover, setHover] = useState(false);

  return (
    <div className="bg-white  fixed inset-0 h-screen flex items-center justify-center p-4">
      <motion.div
        className="max-w-2xl w-full flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* 404 Text */}
        <motion.h1
          className="text-9xl md:text-[180px] font-black mt-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          variants={itemVariants}
          transition={{ type: "spring", stiffness: 100 }}
        >
          404
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 mt-4 text-center max-w-md"
          variants={itemVariants}
        >
          Gravitational anomaly detected! The page you're looking for has been sucked into a black hole.
        </motion.p>

        {/* Home Button */}
        <motion.div
          className="mt-8"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/" legacyBehavior>
            <a
              className="px-8 py-4 font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl flex items-center gap-2"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              role="button"
            >
              <span>{hover ? "Engaging Hyperdrive..." : "Return to Homebase"}</span>
              <motion.span
                animate={{ x: hover ? 4 : 0 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                🚀
              </motion.span>
            </a>
          </Link>
        </motion.div>

        {/* Floating Stars Background */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-black rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0]
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}