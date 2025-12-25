'use client'

import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, AlertCircle, ShoppingBag } from 'lucide-react'

export default function UserMenu({ open, onClose, user }) {
  const ref = useRef(null)
  const [showConfirm, setShowConfirm] = useState(false)

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose()
        setShowConfirm(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open, onClose])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setShowConfirm(false)
    onClose()
  }

  const redirectToAccount = () => {
    window.location.href = '/account'
    onClose()
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="absolute right-0 top-14 z-[200] px-4 sm:px-0">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.95, y: -10, originX: 1, originY: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
              className="w-72 overflow-hidden bg-white/90 backdrop-blur-2xl rounded-[2rem] border border-neutral-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
            >
              <div className="px-6 py-6 bg-neutral-50/30 border-b border-neutral-100">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-3">
                  Account Member
                </p>
                <div onClick={redirectToAccount} className="flex cursor-pointer items-center gap-3">
                  <img
                    src={user?.user_metadata?.avatar_url || "/default-avatar.png"}
                    alt="User"
                    className="w-11 h-11 rounded-full border-2 border-white shadow-sm"
                  />
                  <div className="flex flex-col truncate">
                    <p className="text-sm font-black text-neutral-900 truncate">
                      {user?.user_metadata?.full_name || 'Valued Member'}
                    </p>
                    <p className="text-[10px] text-neutral-400 truncate font-bold uppercase tracking-tighter">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                {/* MY ORDERS BUTTON */}
                <button
                  onClick={redirectToAccount}
                  className="group cursor-pointer w-full flex items-center justify-between px-4 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 hover:bg-neutral-50 rounded-[1.2rem] transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                    <span>My Orders</span>
                  </div>
                </button>

                {/* TERMINATE SESSION BUTTON */}
                <button
                  onClick={() => setShowConfirm(true)}
                  className="group cursor-pointer w-full flex items-center justify-between px-4 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-red-500 hover:bg-red-50/50 rounded-[1.2rem] transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <LogOut className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                    <span>Terminate Session</span>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirm(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[340px] bg-white rounded-[2.5rem] p-8 shadow-2xl text-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-red-500/10" />
              
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>

              <h3 className="text-xl font-light text-neutral-900 uppercase tracking-tighter mb-2">
                Log <span className="font-serif italic text-neutral-400">Out?</span>
              </h3>
              
              <p className="text-sm text-neutral-500 font-medium leading-relaxed mb-8">
                Are you sure you want to end your current session at Saavi?
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSignOut}
                  className="w-full py-4 cursor-pointer bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                >
                  Yes, Sign Me Out
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="w-full cursor-pointer py-4 bg-neutral-100 text-neutral-400 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-neutral-200 hover:text-neutral-600 transition-all"
                >
                  Stay Logged In
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}