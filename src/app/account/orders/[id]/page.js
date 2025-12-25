'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import products from '@/data/products'
import {
  Loader2,
  Truck,
  MapPin,
  CreditCard,
  Package,
  XCircle,
  ChevronLeft,
  Clock,
  Calendar,
  ShieldCheck,
  ExternalLink,
  Phone
} from 'lucide-react'
import Link from 'next/link'
import LuxuryFooter from '@/app/components/Footer'

export default function OrderDetailPage() {
  const { id } = useParams()
  const router = useRouter()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.replace('/'); return }

      const { data, error } = await supabase
        .from('orders')
        .select(`*, order_items ( id, product_id, quantity )`)
        .eq('id', id)
        .eq('user_id', user.id)
        .single()

      if (error || !data) { router.replace('/account'); return }

      setOrder(data)
      setLoading(false)
    }
    if (id) load()
  }, [id, router])

  const getProduct = (pid) => products.find(p => String(p.id) === String(pid))

  const canCancel = () => {
    if (order.status === 'cancelled') return false
    if (['SHIPPED', 'DELIVERED', 'CANCELLED'].includes(order.shipment_status)) return false
    return true
  }

  const cancelOrder = async () => {
    if (!confirm('Are you sure you wish to cancel this order?')) return
    setActionLoading(true)
    const { error } = await supabase.from('orders').update({
      status: 'cancelled',
      shipment_status: 'CANCELLED',
      awb_pending: false
    }).eq('id', order.id)

    if (!error) { setOrder(prev => ({ ...prev, status: 'cancelled' })) }
    setActionLoading(false)
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
      <Loader2 className="w-10 h-10 animate-spin text-neutral-200" />
    </div>
  )

  return (
    <>
      <div className="min-h-screen bg-[#FAF9F6] pb-10 md:pb-24">
        <div className="bg-white border-b-4 md:border-b-8 border-gold-texture md:pt-12 pb-8 px-6">
          <div className="max-w-5xl mx-auto space-y-6 pt-10">
            <Link href="/account" className="group justify-center flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-black transition-all">
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to History
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
             <div className="space-y-1 md:space-y-4 flex flex-col items-center md:items-start">
  <div className="flex items-center justify-center md:justify-start gap-3 w-full">
    <h1 className="text-2xl md:text-5xl font-light tracking-tighter text-neutral-900 uppercase">
      Order <span className="font-serif italic text-neutral-400">#{order.id.slice(0, 8).toUpperCase()}</span>
    </h1>
  </div>

  <div className="flex items-center justify-center md:justify-start gap-4 w-full">
    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
      order.status === 'cancelled' 
        ? 'bg-red-50 text-red-600 border-red-100' 
        : 'bg-green-50 text-green-700 border-green-100'
    }`}>
      {order.status}
    </span>
    <span className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
      <Calendar className="w-3 h-3" /> 
      {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
    </span>
  </div>
</div>

              {canCancel() && (
                <button 
                  disabled={actionLoading}
                  onClick={cancelOrder}
                  className="flex items-center justify-center gap-2 md:px-8 py-2 px-4 md:py-4 bg-white border border-red-100 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-all active:scale-95 shadow-sm"
                >
                  <XCircle className="md:w-4 w-3 h-3 md:h-4" />
                  {actionLoading ? 'Processing...' : 'Cancel Order'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-3 md:px-6 mt-4 md:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-8">
          
          <div className="lg:col-span-2 space-y-3">
            <section className="bg-white rounded-xl p-4 md:p-10 border border-neutral-100 shadow-sm">
              <div className="flex items-center justify-center gap-3 md:mb-8 border-b border-neutral-50 pb-4">
                <Package className="md:w-4 w-3 h-3 md:h-4 text-neutral-400" />
                <h2 className="text-[8px] md:text-[11px] font-black uppercase tracking-[0.3em] text-neutral-900">Reserved Items</h2>
              </div>

              <div className="space-y-6">
                {order.order_items.map((item, idx) => {
                  const product = getProduct(item.product_id)
                  return (
                    <div key={item.id} className="flex items-center gap-6 group">
                      <div className="w-20 h-24 rounded-2xl overflow-hidden border border-neutral-50 bg-neutral-50 shrink-0">
                        {product?.image && <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-all duration-700" />}
                      </div>
                      <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-black text-neutral-900 uppercase tracking-tight">{product?.name || 'Product'}</p>
                          <p className="text-xs text-neutral-400 font-bold uppercase mt-1">Quantity × {item.quantity}</p>
                        </div>
                        <p className="text-sm font-serif italic text-neutral-500">₹{product?.price || '...'}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="md:mt-10 pt-4 md:pt-8 border-t border-neutral-50 flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[8px] md:text-[10px] font-black text-neutral-600 uppercase tracking-widest">Pricing Structure</p>
                  <p className="text-[10px] md:text-xs text-neutral-900 font-medium uppercase">Incl. Taxes & Handling</p>
                </div>
                <div className="text-right">
                   <p className="text-lg md:text-3xl text-black font-light tracking-tighter">₹{order.total_amount.toLocaleString()}</p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-3">
            <section className="bg-white rounded-2xl p-4 md:p-8 border border-neutral-100 shadow-sm">
              <h3 className="text-[8px] md:text-[10px] justify-center font-black uppercase tracking-[0.3em] text-neutral-900 mb-6 flex items-center gap-2">
                <MapPin className="w-3 h-3" /> Shipping Address
              </h3>
              <div>
                <p className="text-sm font-black text-neutral-900">{order.full_name}</p>
                <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                  {order.address_line1}{order.address_line2 && `, ${order.address_line2}`}<br />
                  {order.city}, {order.state} – {order.pincode}
                </p>
                <div className="pt-2 md:pt-4 border-t border-neutral-100 space-y-2">
                  <p className="text-[11px] flex items-center gap-2 text-neutral-600 font-medium">
                    <Phone className="w-3 h-3" /> {order.phone}
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-neutral-900 text-white rounded-2xl md:rounded-[2.5rem] p-4 md:p-8 shadow-2xl relative overflow-hidden">
               <ShieldCheck className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5" />
               <h3 className="text-[8px] md:text-[10px] justify-center font-black uppercase tracking-[0.3em] text-neutral-100 mb-6 flex items-center gap-2">
                <CreditCard className="w-3 h-3 text-neutral-500" /> Transaction
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-white/10 pb-4">
                   <span className="text-[10px] font-bold uppercase text-neutral-400">Method</span>
                   <span className="text-[10px] font-black uppercase tracking-widest">{order.payment_method}</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-[10px] font-bold uppercase text-neutral-400">Final Price</span>
                   <span className="text-sm font-bold tracking-widest">₹{order.total_amount}</span>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl md:rounded-[2.5rem] p-4 md:p-8 border border-neutral-100 shadow-sm relative overflow-hidden">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-6 flex items-center gap-2">
                <Truck className="w-3 h-3" /> Tracking
              </h3>
              
              {order.shiprocket_awb ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-[9px] font-black text-neutral-300 uppercase mb-1">Carrier</p>
                    <p className="text-xs font-bold text-neutral-900 uppercase tracking-widest">{order.shiprocket_courier}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-neutral-300 uppercase mb-1">AWB Tracking</p>
                    <p className="text-xs font-mono font-bold text-neutral-600 tracking-tight">{order.shiprocket_awb}</p>
                  </div>
                  <a
                    href={`https://shiprocket.co/tracking/${order.shiprocket_awb}`}
                    target="_blank"
                    className="w-full py-4 bg-neutral-50 rounded-2xl flex items-center justify-center gap-3 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-neutral-900 hover:text-white transition-all duration-500 group"
                  >
                    Track Manifest <ExternalLink className="w-3 h-3 group-hover:scale-110" />
                  </a>
                </div>
              ) : (
                <div className="py-4 text-center">
                   <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-4 h-4 text-neutral-200" />
                   </div>
                   <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">Manifesting Soon</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
      <LuxuryFooter />
    </>
  )
}