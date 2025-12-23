'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { 
  Building2, 
  Mail, 
  Hash, 
  MessageSquare, 
  Trash2, 
  ExternalLink, 
  Briefcase,
  CalendarDays
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminCorporate() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('corporate_gifting_requests')
      .select('*')
      .order('created_at', { ascending: false })
    
    setRequests(data || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const deleteRequest = async (id) => {
    if (!confirm('Discard this corporate lead?')) return
    const { error } = await supabase.from('corporate_gifting_requests').delete().eq('id', id)
    if (!error) setRequests(requests.filter(r => r.id !== id))
  }

  return (
    <div className="min-h-screen space-y-8">
      {/* Header logic */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
        <div>
          <h2 className="text-2xl font-light text-neutral-900 uppercase tracking-tightest">
            Corporate <span className="font-serif italic text-neutral-400">Inquiries</span>
          </h2>
          <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">
            {requests.length} High-Value Opportunities
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-56 w-full bg-neutral-100 animate-pulse rounded-[2.5rem]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {requests.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-white border border-neutral-200 rounded-[2.5rem] p-8 hover:border-black transition-all duration-500 shadow-sm hover:shadow-2xl"
              >
                {/* Top Row: Company Info */}
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-neutral-900 flex items-center justify-center text-white shadow-lg">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-light text-neutral-900 uppercase tracking-tight">
                        {r.company}
                      </h3>
                      <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                        <CalendarDays className="w-3 h-3" />
                        {new Date(r.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteRequest(r.id)}
                    className="p-2.5  cursor-pointer hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                  >
                    <Trash2 className="w-4 h-4 text-neutral-500" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100 group-hover:bg-white group-hover:border-neutral-200 transition-colors">
                    <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <Hash className="w-3 h-3" /> Volume
                    </p>
                    <p className="text-sm font-black text-black">{r.quantity} Units</p>
                  </div>
                  <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100 group-hover:bg-white group-hover:border-neutral-200 transition-colors">
                    <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <Briefcase className="w-3 h-3" /> Contact
                    </p>
                    <p className="text-sm font-black text-black truncate">{r.name || 'B2B Lead'}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-8">
                  <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
                    <MessageSquare className="w-3 h-3 text-neutral-500" /> Requirements
                  </p>
                  <p className="text-sm text-neutral-600 font-medium italic leading-relaxed line-clamp-3">
                    &quot;{r.message}&quot;
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-50 flex items-center justify-between">
                  <a 
                    href={`mailto:${r.email}`}
                    className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all active:scale-95 shadow-lg"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Engage Company
                  </a>
                  <div className="text-[9px] font-mono text-neutral-300">
                    B2B-REF: {r.id.toString().slice(-4).toUpperCase()}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {requests.length === 0 && !loading && (
        <div className="py-32 text-center bg-white border border-dashed border-neutral-200 rounded-[3rem]">
          <Briefcase className="w-16 h-16 text-neutral-100 mx-auto mb-6" />
          <h3 className="text-lg font-light text-neutral-900 uppercase">No Corporate Leads</h3>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mt-2">B2B requests will appear here</p>
        </div>
      )}
    </div>
  )
}