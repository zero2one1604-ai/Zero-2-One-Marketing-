'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import {
  Loader2,
  Package,
  ChevronRight,
  Truck,
  ShoppingBag,
  User as UserIcon,
  ArrowUpRight,
  XCircle,
  Clock,
  CheckCircle2
} from 'lucide-react'
import Link from 'next/link'
import LuxuryFooter from '@/app/components/Footer'
import products from '@/data/products'
import CancellationModal from '@/app/components/CancellationModal'
import { motion, AnimatePresence } from 'framer-motion'

export default function AccountPage () {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
const [selectedOrder, setSelectedOrder] = useState(null);
  const [actionLoading, setActionLoading] = useState(null)
const [cancelModal, setCancelModal] = useState({ open: false, orderId: null });
const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    const load = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/'
        return
      }
      setUser(user)

      const { data } = await supabase
        .from('orders')
        .select(`*, order_items ( id, product_id, quantity )`)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      setOrders(data || [])
      setLoading(false)
    }
    load()
  }, [])

  const getProductById = id => products.find(p => String(p.id) === String(id))

  const canCancel = order => {
    if (order.status === 'cancelled') return false
    if (['SHIPPED', 'DELIVERED', 'CANCELLED'].includes(order.shipment_status))
      return false
    return true
  }

const cancelOrder = async (orderId) => {
  setActionLoading(orderId)

  const { data: { user } } = await supabase.auth.getUser()

  const order = orders.find(o => o.id === orderId)

  if (order.payment_method === 'online' && order.status === 'paid') {
    const res = await fetch('/api/orders/refund', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId,
        userId: user.id
      })
    })

    const result = await res.json()

    if (!res.ok) {
      alert(result.error || 'Refund failed')
      setActionLoading(null)
      return
    }
  } else {
    // COD or unpaid
    await supabase
      .from('orders')
      .update({
        status: 'cancelled',
        shipment_status: 'CANCELLED',
        awb_pending: false
      })
      .eq('id', orderId)
  }

  setOrders(prev =>
    prev.map(o =>
      o.id === orderId
        ? { ...o, status: 'cancelled' }
        : o
    )
  )
setIsSuccess(true);
  setActionLoading(null)
}
const triggerCancelFlow = (order) => {
    setSelectedOrder(order);
    setIsSuccess(false);
    setCancelModal({ open: true, orderId: order.id });
  }


  const getStatusStyle = status => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-50 text-green-700 border-green-100'
      case 'cancelled':
        return 'bg-red-50 text-red-600 border-red-100'
      case 'shipped':
        return 'bg-blue-50 text-blue-700 border-blue-100'
      default:
        return 'bg-amber-50 text-amber-700 border-amber-100'
    }
  }

  if (loading)
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#FAF9F6]'>
        <Loader2 className='animate-spin w-10 h-10 text-neutral-200' />
      </div>
    )

  return (
    <>
      <div className='min-h-screen bg-[#FAF9F6] pb-14'>
        <section className='bg-white pt-12 pb-5 px-6 border-b-4 md:border-b-8 border-gold-texture'>
          <h1 className='text-2xl md:text-5xl font-light text-neutral-900 tracking-tightest text-center uppercase md:mb-2'>
            My{' '}
            <span className='font-serif italic text-neutral-400'>Account</span>
          </h1>
          <p className='text-xs md:text-lg text-neutral-500 text-center font-light leading-relaxed max-w-2xl mx-auto'>
            Manage your profile, orders, and other details here
          </p>
          <div className='max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between mt-4 md:mt-10 gap-8'>
            <div className='flex flex-col md:flex-col md:space-y-4 flex-row items-center md:items-start gap-5 md:gap-4'>
              <div className='w-16 h-16 md:w-20 md:h-20 relative group shrink-0'>
                {user?.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata?.full_name || 'User'}
                    className='w-full h-full object-cover rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border-2 border-white ring-1 ring-neutral-100 transition-transform duration-500 group-hover:scale-105'
                  />
                ) : (
                  <div className='w-full h-full bg-neutral-900 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center text-white shadow-2xl border-2 border-white'>
                    <span className='text-xl md:text-2xl font-light font-serif italic'>
                      {user?.user_metadata?.full_name?.charAt(0) ||
                        user?.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className='absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-green-500 border-[3px] md:border-4 border-white rounded-full shadow-sm' />
              </div>

              <div className='min-w-0'>
                <h1 className='text-xl the-seasons md:text-4xl font-light tracking-tighter text-neutral-400 uppercase whitespace-nowrap'>
                  Welcome,{' '}
                  <span className=' text-neutral-900'>
                    {user.user_metadata?.full_name?.split(' ')[0] || 'Guest'}
                  </span>
                </h1>
                <p className='text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-neutral-400 truncate'>
                  Session Active:{' '}
                  <span className='lowercase tracking-normal font-normal text-xs md:text-base opacity-80 md:opacity-100'>
                    {user.email}
                  </span>
                </p>
              </div>
            </div>
            <div className='hidden md:flex gap-4'>
              <div
                className='p-[1.5px] rounded-[1.25rem] relative overflow-hidden shadow-lg group transition-transform duration-500 hover:scale-[1.02]'
                style={{
                  background: `linear-gradient(
        135deg, 
        #BF953F 0%, 
        #FCF6BA 25%, 
        #B38728 50%, 
        #FBF5B7 75%, 
        #AA771C 100%
      )`
                }}
              >
                <div
                  className='absolute inset-0 w-full h-full animate-gold-shine pointer-events-none'
                  style={{
                    background:
                      'linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)',
                    transform: 'skewX(-25deg)'
                  }}
                />

                <div className='px-6 py-4 bg-white rounded-[1.2rem] relative z-10'>
                  <p className='text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-1'>
                    Total Orders
                  </p>
                  <div className='flex items-baseline gap-1'>
                    <p className='text-2xl font-light text-neutral-900 tracking-tighter'>
                      {orders.length}
                    </p>
                    <span className='text-[10px] font-bold text-[#B38728]'>
                      Orders
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <main className='max-w-5xl mx-auto px-3 md:px-6 mt-8 md:mt-16 space-y-6'>
          <div className='flex items-center justify-center gap-2 border-b border-neutral-100 md:pb-4'>
            <h2 className='text-[8px] md:text-[11px] font-black uppercase tracking-[0.4em] text-neutral-900'>
              Purchase History
            </h2>
            <ShoppingBag className='md:w-4 w-3 h-3 md:h-4 text-neutral-900' />
          </div>

          <AnimatePresence>
            {orders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-center py-20'
              >
                <p className='text-neutral-400 font-serif italic'>
                  Your wardrobe is waiting for its first Saavi perfume...
                </p>
                <Link
                  href='/shop'
                  className='mt-6 inline-block text-[10px] font-black uppercase tracking-widest underline underline-offset-8'
                >
                  Explore Collection
                </Link>
              </motion.div>
            ) : (
              <div className='space-y-3'>
                {orders.map((order, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={order.id}
                    className='bg-white rounded-2xl border border-neutral-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] overflow-hidden group hover:border-neutral-900 transition-all duration-500'
                  >
                    <div className='p-6 md:p-10 flex flex-row justify-between gap-6 border-b border-neutral-200'>
                      <div className='space-y-1'>
                        <div className='flex items-center gap-1 md:gap-3'>
                          <span className='text-[8px] md:text-[10px] font-black uppercase tracking-widest text-neutral-500'>
                            Order Ref
                          </span>
                          <span className='text-[10px] md:text-xs font-mono text-slate-800 font-bold'>
                            #{order.id.slice(0, 8).toUpperCase()}
                          </span>
                        </div>
                        <div className='flex items-center gap-4 md:pt-2'>
                          <h3 className='text-lg md:text-2xl text-black font-light tracking-tighter'>
                            ₹{order.total_amount.toLocaleString()}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-[7px] md:text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>

                      <div className='flex flex-wrap gap-1 md:gap-3 items-center'>
                        {order.shiprocket_awb && (
                          <a
                            href={`https://shiprocket.co/tracking/${order.shiprocket_awb}`}
                            target='_blank'
                            className='flex items-center gap-2 px-2  cursor-pointer md:px-6 py-1 md:py-3 bg-neutral-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-lg'
                          >
                            <Truck className='md:w-3.5 h-2 w-2 md:h-3.5' /> Track Package
                          </a>
                        )}
                        <Link
                          href={`/account/orders/${order.id}`}
                          className='md:px-6 px-2 py-1 md:py-3 border border-neutral-300 rounded-full text-[8px] md:text-[10px] text-black font-black uppercase tracking-widest hover:bg-neutral-50 transition-all'
                        >
                          Details
                        </Link>
                        {canCancel(order) && (
                          <button
                            disabled={actionLoading === order.id}
                        onClick={() => triggerCancelFlow(order)}
                            className='md:px-6 px-2 py-1 cursor-pointer md:py-3 text-[8px] md:text-[10px] font-black uppercase tracking-widest border border-red-300 text-red-500 hover:bg-red-50 rounded-full transition-all'
                          >
                            {actionLoading === order.id
                              ? 'Processing...'
                              : 'Cancel Order'}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className='p-2 md:p-10 bg-neutral-50/30'>
                      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {order.order_items?.map(item => {
                          const product = getProductById(item.product_id)
                          return (
                            <div
                              key={item.id}
                              className='flex items-center gap-4 bg-white md:p-4 rounded-2xl border border-neutral-100 group-hover:shadow-sm transition-all'
                            >
                              <div className='w-16 h-20 rounded-xl overflow-hidden bg-neutral-50 flex-shrink-0'>
                                {product?.image ? (
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className='w-full h-full object-cover'
                                  />
                                ) : (
                                  <div className='w-full h-full flex items-center justify-center'>
                                    <Package className='w-4 h-4 text-neutral-200' />
                                  </div>
                                )}
                              </div>
                              <div className='space-y-1'>
                                <p className='text-xs font-black uppercase tracking-tight text-neutral-900 line-clamp-1'>
                                  {product?.name || 'Saavi Product'}
                                </p>
                                <p className='text-[10px] font-bold text-neutral-400 uppercase'>
                                  Quantity: {item.quantity}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>
 <CancellationModal 
  isOpen={cancelModal.open} // FIX: Access the .open property directly
  onClose={() => setCancelModal({ open: false, orderId: null })} // FIX: Reset the object properly
  onConfirm={cancelOrder} 
  loading={actionLoading === selectedOrder?.id}
  order={selectedOrder}
  isSuccess={isSuccess}
/>

      <LuxuryFooter />
    </>
  )
}
