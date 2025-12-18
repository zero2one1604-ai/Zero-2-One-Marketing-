'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { motion, AnimatePresence } from 'framer-motion'

export default function UserMenu({ open, onClose, user }) {
  const ref = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose()
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="absolute right-0 top-14 z-[200] px-4 sm:px-0">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95, y: -10, originX: 1, originY: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
            className="w-72 overflow-hidden bg-white/80 backdrop-blur-xl rounded-[1.5rem] border border-neutral-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
          >
            {/* User Profile Header */}
            <div className="px-6 py-5 bg-neutral-50/50">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-1.5">
                Private Account
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-[10px] text-white font-bold">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col truncate">
                  <p className="text-sm font-semibold text-neutral-900 truncate">
                    {user?.user_metadata?.full_name || 'Valued Member'}
                  </p>
                  <p className="text-[11px] text-neutral-500 truncate font-light">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Section */}
            <nav className="p-2">
              <MenuItem href="/account" icon="◎">My Account</MenuItem>
              <MenuItem href="/orders" icon="◒">Order History</MenuItem>
              <MenuItem href="/wishlist" icon="✧">Wishlist</MenuItem>
            </nav>

            {/* Sign Out Action */}
            <div className="p-2 border-t border-neutral-100">
              <button
                onClick={async () => {
                  await supabase.auth.signOut()
                  onClose()
                }}
                className="group w-full flex items-center justify-between px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300"
              >
                <span>Sign out</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function MenuItem({ href, children, icon }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-medium text-neutral-600 hover:text-black hover:bg-neutral-50 transition-all duration-200 group"
    >
      <span className="text-neutral-300 group-hover:text-black transition-colors">{icon}</span>
      {children}
    </Link>
  )
}