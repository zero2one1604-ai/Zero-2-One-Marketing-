'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { 
  ChevronLeft, 
  MapPin, 
  Package, 
  User, 
  Phone, 
  Truck, 
  Calendar,
  CheckCircle2,
  Clock,
  Printer,
  Copy
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminOrderDetail() {
  const { id } = useParams()
  const router = useRouter()
  const [order, setOrder] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      const { data: orderData, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single()

      if (error) return

      const { data: itemsData } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', id)

      setOrder(orderData)
      setItems(itemsData || [])
    }
    load()
  }, [id])

  const updateStatus = async (status) => {
    setLoading(true)
    await supabase.from('orders').update({ status }).eq('id', id)
    setOrder(prev => ({ ...prev, status }))
    setLoading(false)
  }

  if (!order) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-neutral-100 border-t-black animate-spin rounded-full" />
    </div>
  )

  const fullAddress = [
    order.address_line1,
    order.address_line2,
    order.city,
    order.state,
    order.pincode
  ].filter(Boolean).join(', ')

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-100 pb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="w-12 h-12 bg-white text-neutral-700 cursor-pointer border border-neutral-200 rounded-2xl flex items-center justify-center hover:bg-neutral-50 transition-all active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-light text-neutral-900 uppercase tracking-tighter">
                #{order.id.slice(0, 8)}
              </h1>
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                order.status === 'delivered' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'
              }`}>
                {order.status}
              </span>
            </div>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">
              Transaction Date: {new Date(order.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center text-black cursor-pointer gap-2 px-6 py-3 bg-white border border-neutral-200 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-neutral-50 transition-all">
            <Printer className="w-3.5 h-3.5" />
            Invoice
          </button>
          <button className="flex items-center hidden gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-xl">
            <Truck className="w-3.5 h-3.5" />
            Ship Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          
          {/* MANAGEMENT CENTER */}
          <div className="bg-white rounded-[2.5rem] border border-neutral-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="w-5 h-5 text-neutral-400" />
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-black">Update Lifecycle</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['paid', 'shipped', 'delivered', 'cancelled'].map(s => (
                <button
                  key={s}
                  disabled={loading}
                  onClick={() => updateStatus(s)}
                  className={`relative cursor-pointer py-4 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest active:scale-95 ${
                    order.status === s
                      ? 'bg-black text-white border-black shadow-lg shadow-black/20'
                      : 'bg-neutral-100 border-neutral-200 text-neutral-800 hover:border-black hover:text-black'
                  }`}
                >
                  {order.status === s && (
                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* ITEM BREAKDOWN */}
          <div className="bg-white rounded-[2.5rem] border border-neutral-200 p-8 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-black mb-8 border-b border-neutral-50 pb-4">
              Order Content
            </h3>
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center justify-center">
                      <Package className="w-6 h-6 text-neutral-200" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-neutral-900 tracking-tight">{item.name_snapshot}</p>
                      <p className="text-[10px] font-bold text-neutral-400 uppercase">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-black">₹{item.price_snapshot?.toLocaleString()}</p>
                  </div>
                </div>
              ))}
              
              <div className="pt-6 border-t border-neutral-100 mt-6 space-y-3">
                <div className="flex justify-between text-xs font-bold text-neutral-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>₹{order.total_amount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-light text-black uppercase tracking-widest border-t border-neutral-50 pt-4">
                  <span className="font-bold text-xs">Final Amount</span>
                  <span>₹{order.total_amount?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CUSTOMER INFO */}
        <div className="space-y-8">
          
          <div className="bg-neutral-900 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10"><User className="w-32 h-32" /></div>
            
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-8 relative z-10">Client Profile</h3>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Full Name</p>
                  <p className="text-sm font-medium">{order.full_name}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Contact</p>
                  <p className="text-sm font-medium">{order.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black transition-all">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center justify-between">
                    Shipping Address 
                    <Copy className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => navigator.clipboard.writeText(fullAddress)} />
                  </p>
                  <p className="text-sm font-light leading-relaxed text-neutral-200 mt-1">{fullAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* INTERNAL LOGS / NOTES */}
          <div className="bg-white rounded-[2.5rem] border border-neutral-200 p-8 shadow-sm">
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-black mb-4">Payment Method</h3>
             <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-2xl">
               <div className="w-8 h-8 bg-green-100 text-green-700 rounded-lg flex items-center justify-center font-bold text-[10px]">INR</div>
               <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">Online Payment</p>
             </div>
          </div>
        </div>

      </div>
    </div>
  )
}