'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { 
  Package, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Search,
  Filter
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await supabase
        .from('orders')
        .select('id, email, total_amount, status, created_at, full_name')
        .order('created_at', { ascending: false })
      
      setOrders(data || [])
      setLoading(false)
    }
    fetchOrders()
  }, [])

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-green-50 text-green-700 border-green-100'
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-100'
      case 'processing': return 'bg-blue-50 text-blue-700 border-blue-100'
      case 'paid': return 'bg-green-300 text-black border-green-100'
      default: return 'bg-neutral-50 text-neutral-600 border-neutral-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
        <div>
          <h2 className="text-2xl font-light text-neutral-900 uppercase tracking-tightest">
            Order <span className="font-serif italic text-neutral-400">Ledger</span>
          </h2>
          <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">
            Managing {orders.length} transactions
          </p>
        </div>

        <div className="flex items-center gap-2">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 group-focus-within:text-black transition-colors" />
              <input 
                type="text" 
                placeholder="Search ID or Email..." 
                className="pl-10 pr-6 py-2.5 text-black bg-white border border-neutral-200 rounded-full text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-black transition-all w-full md:w-64 shadow-sm"
              />
           </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50/50 border-b border-neutral-100">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Transaction ID</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Customer Details</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Status</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400 text-right">Revenue</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="p-8 bg-neutral-50/20" />
                  </tr>
                ))
              ) : (
                orders.map((o) => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={o.id} 
                    className="hover:bg-neutral-50/50 transition-colors group"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center">
                          <Package className="w-4 h-4 text-neutral-400" />
                        </div>
                        <span className="font-mono text-xs font-bold text-neutral-900 uppercase">
                          #{o.id.slice(0, 8)}
                        </span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-neutral-900 tracking-tight">
                          {o.full_name || 'Saavi Client'}
                        </span>
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">
                          {o.email}
                        </span>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyles(o.status)}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <span className="text-sm font-black text-neutral-900 tabular-nums">
                        ₹{o.total_amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <Link
                        href={`/admin/orders/${o.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-100 rounded-full text-[9px] font-black uppercase tracking-widest text-neutral-600 hover:bg-black hover:text-white transition-all active:scale-95"
                      >
                        Details
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between px-2 py-4">
        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
          Showing {orders.length} of {orders.length} results
        </p>
        <div className="flex gap-2">
            <button className="px-4 py-2 border border-neutral-200 rounded-full text-[9px] font-black uppercase opacity-50 cursor-not-allowed">Prev</button>
            <button className="px-4 py-2 border border-neutral-200 rounded-full text-[9px] font-black uppercase hover:bg-black hover:text-white transition-colors">Next</button>
        </div>
      </div>
    </div>
  )
}