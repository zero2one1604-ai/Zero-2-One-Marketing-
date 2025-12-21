// components/SplashScreen.js
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function SplashScreen({ finishLoading }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('saavi_splash_seen')

    if (!hasSeenSplash) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        sessionStorage.setItem('saavi_splash_seen', 'true')
        finishLoading()
      }, 3500)
      return () => clearTimeout(timer)
    } else {
      finishLoading()
    }
  }, [finishLoading])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 1.2, ease: [0.85, 0, 0.15, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
        >
          <div className="relative flex flex-col items-center">
            <div className="overflow-hidden mb-1 md:mb-4 relative">
  <motion.div
    initial={{ y: "100%" }}
    animate={{ y: 0 }}
    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    className="flex justify-center items-center mb-2"
  >
    <div className="relative w-52 h-22 md:w-72 md:h-24"> 
      <Image
        src="/images/logo.png"
        alt="Saavi Logo"
        fill
        priority
        className="object-contain"
        sizes="(max-width: 768px) 128px, 288px"
      />
    </div>
  </motion.div>
</div>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '80%' }}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
              className="h-[0.5px] bg-neutral-900 w-full"
            />
            <div className="overflow-hidden mt-2 mb-1 md:mt-6">
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