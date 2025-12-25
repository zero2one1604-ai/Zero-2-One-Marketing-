'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Check, Loader2, Package, ArrowRight, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import LuxuryFooter from '@/app/components/Footer'

export default function OrderStatusPage() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    let interval

    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single()

      if (!error) {
        setOrder(data)
        setLoading(false)
        if (data.status === 'paid') {
          clearInterval(interval)
        }
      }
    }

    fetchOrder()
    interval = setInterval(fetchOrder, 3000)
    return () => clearInterval(interval)
  }, [id])

  useEffect(() => {
  if (!order) return

  if (!['paid', 'pending'].includes(order.status)) return

  if (order.shiprocket_order_id) return

  const createShipment = async () => {
    try {
      await fetch('/api/shiprocket/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id })
      })
    } catch (err) {
      console.error('Shiprocket creation failed', err)
    }
  }

  createShipment()
}, [order])


  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-neutral-300 mb-4" />
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">Authenticating Order</p>
      </div>
    )
  }

  return (
    <>
    <div className=" bg-[#FAF9F6] py-10 px-3 md:py-24 md:px-6 flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {order.status === 'paid' ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key="success"
            className="max-w-2xl w-full"
          >
            <div className="bg-white rounded-[3rem] p-10 md:p-16 text-center shadow-[0_30px_100px_-20px_rgba(0,0,0,0.04)] border border-neutral-100 relative overflow-hidden">
            
              <div className="absolute top-0 right-0 p-10 text-8xl font-black text-neutral-50 select-none pointer-events-none">
                DONE
              </div>

              <div className="relative z-10">
                <div className="md:w-20 h-14 w-14 md:h-20 bg-black rounded-[2rem] flex items-center justify-center mx-auto mb-4 md:mb-8 shadow-2xl">
                  <Check className="md:w-10 h-7 w-7 md:h-10 text-white" />
                </div>

                <div className="flex items-center justify-center gap-3 mb-1 md:mb-4">
                  <div className="h-[1px] w-6 bg-neutral-200"></div>
                  <span className="text-[10px] font-bold tracking-[0.4em] text-neutral-400 uppercase italic">Confirmation</span>
                  <div className="h-[1px] w-6 bg-neutral-200"></div>
                </div>

                <h1 className="text-xl md:text-5xl font-light text-neutral-900 tracking-tight uppercase mb-1 md:mb-6">
                  Payment <br /> <span className="font-serif italic text-neutral-400">Successful</span>
                </h1>

                <p className="text-xs md:text-sm text-neutral-500 font-light leading-relaxed max-w-xs mx-auto mb-4 md:mb-10">
                  Your order has been received and is now being prepared in our laboratory.
                </p>

                <div className="bg-neutral-50 rounded-3xl p-8 mb-2 md:mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="text-center md:text-left">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Order Identifier</p>
                    <p className="text-xs md:text-sm font-medium text-neutral-900">#{order.id.slice(0, 8).toUpperCase()}</p>
                  </div>
                  <div className="h-10 w-[1px] bg-neutral-200 hidden md:block"></div>
                  <div className="text-center md:text-right">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Status</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <p className="text-xs md:text-sm font-medium text-neutral-900 uppercase tracking-tighter">Processed</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-center gap-4">
                  <Link
                    href="/shop"
                    className="w-full sm:w-auto py-2 px-4 md:px-10 md:py-4 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] rounded-full flex items-center justify-center gap-3 bg-gradient-to-br from-[#C9A43B] via-[#F1DB8A] to-[#9C7A22]
text-[#1A1405]
shadow-[0_6px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-2px_0_rgba(0,0,0,0.45)]
transition-all duration-300
hover:shadow-[0_10px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-2px_0_rgba(0,0,0,0.35)]
hover:from-[#B08D2A] hover:via-[#E6C96A] hover:to-[#8A6A1C]
active:scale-[0.98]
focus:outline-none focus:ring-2 focus:ring-[#D6B45A]/40 focus:ring-offset-2
border border-[#8F7220]"
                  >
                    <ShoppingBag className="w-4 h-4" /> Continue Shopping                  </Link>
                  <Link
                    href="/account"
                    className="w-full hidden sm:w-auto px-10 py-4 border border-neutral-200 text-neutral-900 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-neutral-50 transition-all"
                  >
                    View Account
                  </Link>
                </div>
              </div>
            </div>

            <p className="mt-5 md:mt-12 text-center text-[8px] px-10 md:text-[10px] text-neutral-400 font-light uppercase tracking-widest leading-relaxed">
              A confirmation email has been dispatched to your inbox. <br />
              Need help? <Link href="/contact" className="underline underline-offset-4 text-neutral-900">Speak with our team</Link>
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key="processing"
            className="text-center"
          >
            <Loader2 className="md:w-16 h-12 w-12 md:h-16 animate-spin mx-auto mb-2 md:mb-8 text-neutral-200" />
            <h2 className="text-lg md:text-2xl font-light text-neutral-900 md:mb-2 tracking-tight">Synchronizing Payment</h2>
            <p className="text-xs  md:text-sm text-neutral-500 font-light italic">Please remain on this page while we verify your transaction...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    <LuxuryFooter />
    </>
  )
}