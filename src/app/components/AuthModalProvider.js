'use client'

import { createContext, useContext, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { motion, AnimatePresence } from 'framer-motion'

const AuthModalContext = createContext(null)

export function AuthModalProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [onSuccess, setOnSuccess] = useState(null)
  const [loading, setLoading] = useState(false)

  const openAuthModal = ({ onSuccess }) => {
    setOnSuccess(() => onSuccess)
    setOpen(true)
  }

  const closeAuthModal = () => {
    if (loading) return
    setOpen(false)
    setOnSuccess(null)
  }

  const signInWithGoogle = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <AuthModalContext.Provider value={{ openAuthModal }}>
      {children}

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAuthModal}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="relative bg-white rounded-[2.5rem] p-10 w-full max-w-[400px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] text-center overflow-hidden"
            >
              {/* Top Branding Accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-neutral-900" />
              
              {/* Icon Container */}
              <div className="mx-auto w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center mb-6">
                 <span className="text-xl">✨</span>
              </div>

              <h2 className="text-2xl font-light text-neutral-900 tracking-tight mb-3">
                Final Step<br></br> Checkout
              </h2>

              <p className="text-[13px] text-neutral-500 font-medium leading-relaxed mb-8 px-4">
                Sign in to secure your order details and receive exclusive shipping updates.
              </p>

              <div className="space-y-4">
                <button
                  onClick={signInWithGoogle}
                  disabled={loading}
                  className="w-full relative cursor-pointer group py-4 bg-black text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all hover:bg-neutral-800 active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                >
                  <div className="flex items-center justify-center gap-3">
                    {loading ? (
                       <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span>Continue with Google</span>
                      </>
                    )}
                  </div>
                </button>

                <button
                  onClick={closeAuthModal}
                  disabled={loading}
                  className="w-full py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-black transition-colors"
                >
                  Return to Store
                </button>
              </div>

              {/* Minimal Trust Badge */}
              <div className="mt-8 pt-6 border-t border-neutral-50 flex items-center justify-center gap-2">
                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 4.946-2.397 9.332-6.165 12.115a1.12 1.12 0 01-1.669 0C6.397 16.333 4 11.947 4 7c0-.68.056-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-tighter">Secure & Verified checkout</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AuthModalContext.Provider>
  )
}

export function useAuthModal() {
  return useContext(AuthModalContext)
}