import React from "react"
import { motion } from "framer-motion"

const AnimatedCharacter = () => {
  return (
    <motion.div
      className="fixed bottom-4 right-4 w-24 h-24 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="#FFD700"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.circle
          cx="35"
          cy="40"
          r="8"
          fill="#FFFFFF"
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.circle
          cx="65"
          cy="40"
          r="8"
          fill="#FFFFFF"
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.path
          d="M 30 65 Q 50 80 70 65"
          stroke="#FF6B6B"
          strokeWidth="4"
          fill="none"
          animate={{
            d: ["M 30 65 Q 50 80 70 65", "M 30 60 Q 50 75 70 60"],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </svg>
    </motion.div>
  )
}

export default AnimatedCharacter
