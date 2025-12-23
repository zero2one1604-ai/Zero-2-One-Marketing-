'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { 
  Mail, 
  Download, 
  UserPlus, 
  Search, 
  Trash2, 
  Copy, 
  CheckCircle2,
  Calendar
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminNewsletter() {
  const [subs, setSubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchSubs = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false })
    
    setSubs(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchSubs()
  }, [])

  const copyToClipboard = (email) => {
    navigator.clipboard.writeText(email)
  }

  const filteredSubs = subs.filter(s => 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Email", "Date Joined"].join(",") + "\n"
      + subs.map(s => `${s.email},${new Date(s.created_at).toLocaleDateString()}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "saavi_subscribers.csv");
    document.body.appendChild(link);
    link.click();
  }

  return (
    <div className="min-h-screen space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-1">
        <div>
          <h2 className="text-2xl font-light text-neutral-900 uppercase tracking-tightest">
            Subscriber <span className="font-serif italic text-neutral-400">Database</span>
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
              {subs.length} Active Leads
            </span>
            <div className="w-1 h-1 rounded-full bg-neutral-300" />
            <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">
              Growing +18%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 group-focus-within:text-black transition-colors" />
              <input 
                type="text" 
                placeholder="Search Emails..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-6 py-2.5 bg-white border text-black border-neutral-200 rounded-full text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-black transition-all w-full md:w-64"
              />
           </div>
           <button 
             onClick={handleExport}
             className="flex cursor-pointer items-center gap-2 px-6 py-2.5 bg-neutral-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-neutral-800 transition-all active:scale-95 shadow-lg shadow-black/10"
           >
             <Download className="w-3 h-3" />
             Export CSV
           </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-neutral-50/50 border-b border-neutral-100">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Subscriber Detail</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Join Date</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Status</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i} className="animate-pulse"><td colSpan={4} className="p-8 bg-neutral-50/10" /></tr>
                ))
              ) : (
                filteredSubs.map((s) => (
                  <tr key={s.id} className="hover:bg-neutral-50/50 transition-all group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center group-hover:bg-black transition-colors">
                          <Mail className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-neutral-900 tracking-tight lowercase">
                            {s.email}
                          </p>
                          <button 
                            onClick={() => copyToClipboard(s.email)}
                            className="flex items-center gap-1 text-[9px] font-bold text-neutral-400 hover:text-black uppercase tracking-tighter mt-0.5"
                          >
                            <Copy className="w-2.5 h-2.5" /> Copy Email
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-neutral-500">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-bold uppercase tracking-widest">
                          {new Date(s.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 rounded-full border border-green-100 w-fit">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                        <span className="text-[9px] font-black text-green-700 uppercase tracking-widest">Active</span>
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <button className="p-2.5 text-neutral-200 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {!loading && (
        <div className="flex items-center justify-center gap-8 py-10 bg-neutral-900 rounded-[2.5rem] text-white overflow-hidden relative shadow-2xl">
          <UserPlus className="absolute -left-4 -bottom-4 w-32 h-32 text-white/5" />
          <div className="text-center">
             <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-2">Total Outreach</p>
             <p className="text-4xl font-light tracking-tighter tabular-nums">{subs.length}</p>
          </div>
          <div className="w-[1px] h-12 bg-white/10" />
          <div className="text-center">
             <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-2">Email Deliverability</p>
             <p className="text-4xl font-light tracking-tighter">99.2%</p>
          </div>
        </div>
      )}
    </div>
  )
}