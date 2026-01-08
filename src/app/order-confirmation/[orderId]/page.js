'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { CheckCircle2, Truck, Banknote, ShoppingBag, ArrowRight, ShieldCheck, Heart } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { motion } from 'framer-motion'
import LuxuryFooter from '@/app/components/Footer'

export default function CODConfirmationPage() {
  const { orderId } = useParams()
  const router = useRouter()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  if (!order || order.email_sent) return

  fetch('/api/send_cod_order_email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId })
  }).catch(console.error)
}, [order, orderId])


  useEffect(() => {
    if (!orderId) return

    const load = async () => {
      const { data: orderData } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single()

      const { data: itemsData } = await supabase
        .from('order_items')
        .select('name_snapshot, quantity')
        .eq('order_id', orderId)

      if (!orderData) {
        router.replace('/')
        return
      }

      setOrder({ ...orderData, items: itemsData || [] })
      setLoading(false)
    }

    load()
  }, [orderId, router])

  if (loading || !order) return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 animate-spin rounded-full" />
    </div>
  )

  return (
    <>
      <div className="min-h-screen bg-[#FAF9F6] pt-12 pb-24 px-4 sm:px-6">
        <div className="max-w-xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 space-y-4"
          >
            <div className="relative inline-block">
               <motion.div 
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ type: "spring", damping: 12, delay: 0.2 }}
                 className="w-20 h-20 mx-auto rounded-full bg-black flex items-center justify-center shadow-2xl"
               >
                 <CheckCircle2 className="w-10 h-10 text-white" />
               </motion.div>
               <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="absolute inset-0 rounded-full bg-black -z-10"
               />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-light text-neutral-900 uppercase tracking-tighter">
                Reservation <span className="font-serif italic text-neutral-400">Confirmed</span>
              </h1>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">
                Order ID: #{order.id.slice(0, 8).toUpperCase()}
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-neutral-100 overflow-hidden"
          >
            {/* ITEM LIST */}
            <div className="p-8 md:p-10 border-b border-neutral-50">
               <div className="flex items-center gap-2 mb-6">
                  <ShoppingBag className="w-4 h-4 text-neutral-900" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-neutral-900">Your Selection</h3>
               </div>
               
               <div className="space-y-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center group">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-neutral-800 uppercase tracking-tight">{item.name_snapshot}</p>
                        <p className="text-[10px] text-neutral-400 font-medium">Quantity: {item.quantity}</p>
                      </div>
                      <div className="h-[1px] flex-1 mx-4 bg-neutral-50" />
                      <p className="text-sm font-serif italic text-neutral-500">In Box</p>
                    </div>
                  ))}
               </div>
            </div>

            {/* PAYMENT SUMMARY */}
            <div className="p-8 md:p-10 bg-neutral-50/50">
               <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Payment</span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 uppercase">
                      <Banknote className="w-3.5 h-3.5" /> Cash on Delivery
                    </span>
                  </div>
                  <div className="flex justify-between items-end pt-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Total Payable</span>
                    <span className="text-3xl font-light text-neutral-900 tracking-tighter">
                      ₹{order.total_amount.toLocaleString()}
                    </span>
                  </div>
               </div>
            </div>

            {/* DELIVERY INFO */}
            <div className="p-8 md:p-10 bg-white space-y-6">
               <div className="flex items-start gap-4 p-5 bg-neutral-50 rounded-[1.5rem] border border-neutral-100">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Truck className="w-4 h-4 text-neutral-900" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-900 uppercase tracking-widest">Est. Delivery</p>
                    <p className="text-sm text-neutral-500 mt-1 font-medium">2-4 Business Days</p>
                  </div>
               </div>

               <div className="flex items-center gap-2 justify-center py-2">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Verified Secure Order</p>
               </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 space-y-6 text-center"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-neutral-400 mb-2">
                <Heart className="w-3 h-3 fill-neutral-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest">A note for you</span>
              </div>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed px-4">
                &quot;Please have the exact amount ready. Our delivery partner will reach out to ensure you are home before arrival.&quot;
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 pt-4">
              <Link 
                href="/shop"
                className="w-full sm:w-auto px-10 py-4 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 group"
              >
                Back to Shop
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
      <LuxuryFooter />
    </>
  )
}