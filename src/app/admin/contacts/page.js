'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { 
  Mail, 
  User, 
  Calendar, 
  Trash2, 
  Reply, 
  MoreHorizontal, 
  ExternalLink,
  Inbox
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminContacts() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMessages = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
    
    setMessages(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const deleteMessage = async (id) => {
    if (!confirm('Archive this conversation?')) return
    const { error } = await supabase.from('contact_messages').delete().eq('id', id)
    if (!error) setMessages(messages.filter(m => m.id !== id))
  }

  return (
    <div className="min-h-screen space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
        <div>
          <h2 className="text-2xl font-light text-neutral-900 uppercase tracking-tightest">
            Inbox <span className="font-serif italic text-neutral-400">Archives</span>
          </h2>
          <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">
            {messages.length} Active Enquiries
          </p>
        </div>
        
        <div className="flex gap-2">
            <button className="px-5 py-2.5 bg-neutral-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-lg">
                Export CSV
            </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 w-full bg-neutral-100 animate-pulse rounded-[2rem]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="group relative bg-white border border-neutral-200 rounded-[2.5rem] p-6 md:p-10 hover:border-black transition-all duration-500 shadow-sm hover:shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 left-10 w-20 h-1 bg-neutral-900 rounded-b-full opacity-0 group-hover:opacity-100 transition-all duration-500" />

                <div className="flex flex-col md:flex-row gap-8">
        
                  <div className="md:w-64 space-y-4 border-b md:border-b-0 md:border-r border-neutral-100 pb-6 md:pb-0 md:pr-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-black group-hover:text-white transition-colors">
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-black tracking-tight leading-none truncate max-w-[150px]">
                                {m.name}
                            </p>
                            <a href={`mailto:${m.email}`} className="text-[10px] font-bold text-neutral-400 hover:text-black transition-colors lowercase tracking-tighter">
                                {m.email}
                            </a>
                        </div>
                    </div>

                    <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2 text-neutral-400">
                            <Calendar className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-black uppercase tracking-widest">
                                {new Date(m.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-400">
                            <Mail className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-black uppercase tracking-widest truncate">
                                {m.subject || 'General Enquiry'}
                            </span>
                        </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between space-y-6">
                    <div>
                        <span className="text-[9px] font-black uppercase text-slate-900 tracking-[0.3em] text-neutral-300 mb-2 block">Message Content</span>
                        <p className="text-base md:text-lg font-light text-neutral-800 leading-relaxed italic">
                            &quot;{m.message}&quot;
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => window.location.href = `mailto:${m.email}`}
                                className="flex items-center gap-2 px-6 py-3 bg-neutral-300 rounded-full text-[10px] cursor-pointer text-black uppercase tracking-widest hover:bg-black hover:text-white transition-all active:scale-95"
                            >
                                <Reply className="w-3.5 h-3.5" />
                                Reply to Client
                            </button>
                            <button 
                                onClick={() => deleteMessage(m.id)}
                                className="p-3 text-neutral-500 cursor-pointer hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                        
                        <div className="text-[9px] font-mono text-neutral-300 uppercase">
                            Ref: {m.id.toString().slice(-6)}
                        </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {messages.length === 0 && !loading && (
        <div className="py-32 text-center bg-white border border-dashed border-neutral-200 rounded-[3rem]">
          <Inbox className="w-16 h-16 text-neutral-100 mx-auto mb-6" />
          <h3 className="text-lg font-light text-neutral-900 uppercase">Your Inbox is Clear</h3>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mt-2">Check back later for new enquiries</p>
        </div>
      )}
    </div>
  )
}