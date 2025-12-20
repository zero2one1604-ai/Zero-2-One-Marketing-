'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { motion } from 'framer-motion'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Auth error:', error)
        router.replace('/?auth_error=true')
        return
      }

      if (data.session) {
        // Subtle delay to allow the animation to feel "intentional" and premium
        setTimeout(() => {
          router.replace('/')
        }, 1500)
      }
    }

    handleAuth()
  }, [router])

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center px-6">
      <div className="relative flex flex-col items-center">
        
        {/* --- LUXURY MORPHING LOADER --- */}
        <div className="relative w-24 h-24 mb-12">
          {/* Outer Rotating Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-[1px] border-neutral-200 rounded-full"
          />
          
          {/* Inner Pulsing Circle */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0.3 }}
            animate={{ scale: 1.1, opacity: 0.6 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            className="absolute inset-4 bg-neutral-900 rounded-full blur-xl"
          />

          {/* Center Brand Initial */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-light tracking-widest text-neutral-900">S</span>
          </div>
        </div>

        {/* --- TYPOGRAPHY --- */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-6 bg-neutral-300"></div>
            <span className="text-[10px] font-bold tracking-[0.4em] text-neutral-400 uppercase italic">
              Verification
            </span>
            <div className="h-[1px] w-6 bg-neutral-300"></div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-light text-neutral-900 tracking-tight uppercase">
            Securing Your <span className="font-serif italic text-neutral-400">Profile</span>
          </h1>
          
          <p className="mt-4 text-[11px] text-neutral-400 font-medium tracking-widest uppercase animate-pulse">
            Connecting to Saavi Concierge...
          </p>
        </motion.div>

        {/* --- FOOTER LOGO --- */}
        <div className="absolute bottom-[-200px] opacity-[0.03] pointer-events-none select-none">
          <h2 className="text-[120px] font-black tracking-tighter">SAAVI</h2>
        </div>
      </div>
    </div>
  )
}