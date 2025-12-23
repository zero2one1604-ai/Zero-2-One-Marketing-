'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Star, Trash2, User, Calendar, MessageCircle, MoreVertical, ShieldCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchReviews = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('reviews')
      .select('*') 
      .order('created_at', { ascending: false })
    
    setReviews(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this review?')) return
    const { error } = await supabase.from('reviews').delete().eq('id', id)
    if (!error) setReviews(reviews.filter(r => r.id !== id))
  }

  return (
    <div className="min-h-screen space-y-6">
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-2xl font-light text-neutral-900 uppercase tracking-tightest">
            Client <span className="font-serif italic text-neutral-400">Feedback</span>
          </h2>
          <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">
            {reviews.length} Total Submissions
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-48 w-full bg-neutral-100 animate-pulse rounded-[2rem]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {reviews.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group bg-white border border-neutral-200 rounded-[2rem] p-6 hover:border-black transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-white text-xs font-bold">
                        {r.user_name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-neutral-900 uppercase tracking-tight">
                          {r.user_name || 'Anonymous'}
                        </h4>
                        <div className="flex items-center gap-1 text-green-600">
                          <ShieldCheck className="w-3 h-3" />
                          <span className="text-[9px] font-bold uppercase tracking-tighter">Verified</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDelete(r.id)}
                      className="p-2 text-neutral-300 cursor-pointer hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-black text-black' : 'fill-neutral-100 text-neutral-200'}`} 
                      />
                    ))}
                  </div>

                  <p className="text-sm text-neutral-600 leading-relaxed italic font-medium">
                    &quot;{r.comment}&quot;
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-50 flex items-center justify-between text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {new Date(r.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="text-[9px] font-mono opacity-50">
                    ID: {r.id.toString().slice(0, 8)}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {reviews.length === 0 && !loading && (
        <div className="py-20 text-center bg-white border border-dashed border-neutral-200 rounded-[3rem]">
          <MessageCircle className="w-12 h-12 text-neutral-200 mx-auto mb-4" />
          <p className="text-neutral-400 font-serif italic">No reviews found in the archive.</p>
        </div>
      )}
    </div>
  )
}