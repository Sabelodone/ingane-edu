import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"

const FeatureModal = ({ isOpen, onClose, feature }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="bg-white rounded-3xl border-4 border-accent p-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader className="bg-accent text-white p-6">
                <DialogTitle className="text-3xl font-bold flex items-center justify-center">
                  <motion.span
                    className="text-5xl mr-4"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {feature.icon}
                  </motion.span>
                  {feature.title}
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="text-xl text-secondary p-6 text-center">
                {feature.description}
              </DialogDescription>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

export default FeatureModal

