'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { 
  ShoppingBag, 
  Star, 
  MessageSquare, 
  TrendingUp, 
  ArrowUpRight, 
  RefreshCw 
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const load = async () => {
    setIsRefreshing(true)
    const [{ count: orders }, { count: reviews }, { count: messages }] =
      await Promise.all([
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('reviews').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true })
      ])

    setStats({ orders, reviews, messages })
    setTimeout(() => setIsRefreshing(false), 600)
  }

  useEffect(() => {
    load()
  }, [])

  if (!stats) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <RefreshCw className="w-8 h-8 animate-spin text-neutral-200" />
    </div>
  )

  return (
    <div className="min-h-screen space-y-8 p-4 md:p-0">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-neutral-900 tracking-tightest uppercase">
            Overview <span className="font-serif italic text-neutral-400 text-2xl">Control</span>
          </h1>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mt-1">
            Real-time performance metrics
          </p>
        </div>
        
        <button 
          onClick={load}
          disabled={isRefreshing}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-neutral-200 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-neutral-50 transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Syncing...' : 'Refresh Data'}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        <StatCard 
          title="Total Orders" 
          value={stats.orders} 
          icon={ShoppingBag} 
          trend="+12%" 
          color="bg-neutral-900"
          delay={0.1}
        />
        <StatCard 
          title="Product Reviews" 
          value={stats.reviews} 
          icon={Star} 
          trend="New" 
          color="bg-amber-600"
          delay={0.2}
        />
        <StatCard 
          title="Customer Enquiries" 
          value={stats.messages} 
          icon={MessageSquare} 
          trend="Active" 
          color="bg-blue-600"
          delay={0.3}
        />
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, trend, color, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="group relative bg-white rounded-[2rem] p-8 border border-neutral-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:border-neutral-900 transition-all duration-500 overflow-hidden"
    >
      {/* Decorative Background Icon */}
      <Icon className="absolute -right-4 -bottom-4 w-32 h-32 text-neutral-50 group-hover:text-neutral-100 transition-colors duration-500" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className={`p-4 rounded-2xl ${color} text-white shadow-lg`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-1 px-3 py-1 bg-green-50 rounded-full border border-green-100 text-[10px] font-black text-green-600 uppercase tracking-tighter">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-5xl font-light text-neutral-900 tracking-tighter tabular-nums">
              {value.toLocaleString()}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-neutral-300" />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 h-1 bg-neutral-900 w-0 group-hover:w-full transition-all duration-700" />
    </motion.div>
  )
}