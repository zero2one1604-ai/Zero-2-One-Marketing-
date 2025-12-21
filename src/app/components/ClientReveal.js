'use client'

import { useState } from 'react'
import SplashScreen from './SplashScreen'
import { motion, AnimatePresence } from 'framer-motion'

export default function ClientReveal({ children }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <SplashScreen finishLoading={() => setIsLoading(false)} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1.5, ease: [0.85, 0, 0.15, 1] }}
      >
        {children}
      </motion.div>
    </>
  )
}