import React from "react"
import { motion } from "framer-motion"

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-primary flex items-center justify-center">
      <motion.div
        className="text-white text-4xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="inline-block mr-2"
        >
          🎨
        </motion.span>
        Iyalayisha...
      </motion.div>
    </div>
  )
}

export default LoadingScreen

