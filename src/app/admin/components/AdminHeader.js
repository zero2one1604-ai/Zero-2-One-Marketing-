'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LogOut, Menu, X, ChevronRight, LayoutDashboard, ShoppingBag, Star, Mail, Building2, Send } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { motion, AnimatePresence } from 'framer-motion'

const nav = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Reviews', href: '/admin/reviews', icon: Star },
  { label: 'Contacts', href: '/admin/contacts', icon: Mail },
  { label: 'Corporate', href: '/admin/corporate', icon: Building2 },
  { label: 'Newsletter', href: '/admin/newsletter', icon: Send }
]

export default function AdminHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          
          {/* --- BRANDING --- */}
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-black text-sm">S</div>
              <span className="text-[11px] font-black tracking-[0.4em] uppercase text-neutral-900 group-hover:tracking-[0.5em] transition-all duration-500">
                Admin <span className="font-serif italic lowercase tracking-tightest text-neutral-400 font-normal">hub</span>
              </span>
            </Link>
          </div>

          {/* --- DESKTOP NAVIGATION --- */}
          <nav className="hidden lg:flex items-center gap-2">
            {nav.map(item => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-full ${
                    active ? 'text-black' : 'text-neutral-400 hover:text-black hover:bg-neutral-50'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {active && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute inset-0 bg-neutral-100 rounded-full z-0"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* --- ACTIONS --- */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 text-red-500 px-4 py-2 border border-red-100  cursor-pointer rounded-full text-[10px] font-black uppercase tracking-widest  hover:text-red-600 hover:border-red-100 transition-all active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 bg-neutral-900 rounded-xl text-white shadow-lg active:scale-90 transition-all"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE NAVIGATION DRAWER --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[51] lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-xs bg-white z-[52] lg:hidden p-8 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                 <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Navigation</p>
                 <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-neutral-50 rounded-full"><X className="w-4 h-4" /></button>
              </div>

              <nav className="flex-1 space-y-2">
                {nav.map((item) => {
                  const active = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                        active ? 'bg-black text-white shadow-xl translate-x-2' : 'text-neutral-500 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <item.icon className={`w-5 h-5 ${active ? 'text-white' : 'text-neutral-300'}`} />
                        <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${active ? 'opacity-100' : 'opacity-0'}`} />
                    </Link>
                  )
                })}
              </nav>

              <div className="pt-8 border-t border-neutral-100 mt-auto">
                <button
                  onClick={handleLogout}
                  className="w-full flex cursor-pointer items-center justify-center gap-3 p-4 bg-red-50 rounded-2xl text-red-600 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}