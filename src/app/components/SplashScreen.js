// components/SplashScreen.js
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SplashScreen({ finishLoading }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('saavi_splash_seen')

    if (!hasSeenSplash) {
      setIsVisible(true)
      // Duration of the splash (3.5s)
      const timer = setTimeout(() => {
        setIsVisible(false)
        sessionStorage.setItem('saavi_splash_seen', 'true')
        finishLoading() // Tell the layout to show the website
      }, 3500)
      return () => clearTimeout(timer)
    } else {
      finishLoading() // User has seen it, show website immediately
    }
  }, [finishLoading])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            clipPath: 'inset(0 0 100% 0)', // Sophisticated "Slide up" reveal
            transition: { duration: 1.2, ease: [0.85, 0, 0.15, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
        >
          <div className="relative flex flex-col items-center">
            <div className="overflow-hidden mb-1 md:mb-4">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl the-seasons md:text-8xl font-light tracking-[0.3em] text-neutral-900 uppercase"
              >
                SAAVI
              </motion.h1>
            </div>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
              className="h-[0.5px] bg-neutral-900 w-full"
            />
            <div className="overflow-hidden mt-1 mb-1 md:mt-6">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="text-[10px] font-bold tracking-[0.5em] text-neutral-400 uppercase italic"
              >
                Crafted with <br></br>Care & Truth
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}