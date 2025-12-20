'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createRazorpayOrder } from '@/app/actions/createRazorpayOrder'
import { ShieldCheck, Truck, Lock, ChevronLeft, CreditCard, Package, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import products from '@/data/products'
import LuxuryFooter from '@/app/components/Footer'
import Image from 'next/image'

export default function CheckoutPage() {
  const { orderId } = useParams()
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState(null)
  const [product, setProduct] = useState(null)

useEffect(() => {
  if (!orderId) return

  const fetchOrder = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          product_id,
          quantity
        )
      `)
      .eq('id', orderId)
      .single()

    if (error) {
      console.error(error)
      return
    }

    setOrder(data)

    // assuming single-product checkout
    const item = data.order_items?.[0]

    if (!item) return

    const matchedProduct = products.find(
      p => String(p.id) === String(item.product_id)
    )

    setProduct({
      ...matchedProduct,
      quantity: item.quantity
    })
  }

  fetchOrder()
}, [orderId])



  const loadRazorpay = () =>
    new Promise(resolve => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })

  const handlePayment = async () => {
    setLoading(true)
    const res = await loadRazorpay()
    if (!res) {
      alert('Payment gateway failed to load. Please check your connection.')
      setLoading(false)
      return
    }

    try {
      const { razorpayOrderId, amount } = await createRazorpayOrder(orderId)
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency: 'INR',
        name: 'Saavi Skincare',
        description: `Order #${orderId.slice(0, 8)}`,
        order_id: razorpayOrderId,
        handler: function () {
          window.location.href = `/orders/${orderId}`
        },
        theme: { color: '#000000' }
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Header Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-100">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-4">
          <Link 
            href="/shop" 
            className="group inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden xs:inline">Back to Shop</span>
            <span className="xs:hidden">Back</span>
          </Link>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-12 py-6 sm:py-8 lg:py-16">

        <div className="mb-8 sm:mb-10 lg:mb-16">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-neutral-900 hidden xs:inline">Cart</span>
            </div>
            <div className="w-8 sm:w-12 md:w-16 h-0.5 bg-neutral-900"></div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold">
                2
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-neutral-900 hidden xs:inline">Payment</span>
            </div>
            <div className="w-8 sm:w-12 md:w-16 h-0.5 bg-neutral-200"></div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-200 text-neutral-400 flex items-center justify-center text-xs font-bold">
                3
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-neutral-400 hidden xs:inline">Done</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
          {/* LEFT: Order Summary */}
          <div className="lg:col-span-3 space-y-6 sm:space-y-8">
            {/* Header */}
            <div className="space-y-1 sm:space-y-2">
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-neutral-500 uppercase">
                Order Summary
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight">
                Review Your Purchase
              </h1>
            </div>

            {/* Product Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200 p-4 sm:p-6 lg:p-8 shadow-sm">
              <div className="flex gap-3 sm:gap-4 md:gap-6">
                <div className="relative w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 bg-neutral-50 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0 border border-neutral-100">
                  {product?.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2 sm:mb-3">
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        {product?.category}
                      </span>
                      <h3 className="text-base sm:text-lg md:text-xl font-light text-neutral-900 mt-1 tracking-tight truncate">
                        {product?.name || 'Loading...'}
                      </h3>
                    </div>
                    {order?.total_amount && (
                      <div className="text-left sm:text-right">
                        <p className="text-xl sm:text-2xl font-light text-neutral-900">
                          ₹{order.total_amount.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-neutral-600">
                    <span className="inline-flex items-center gap-1 sm:gap-1.5">
                      <Package className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Qty: {order?.quantity || 1}
                    </span>
                    <span className="text-neutral-300">•</span>
                    <span className="text-neutral-500 text-[10px] sm:text-xs font-mono">
                      #{orderId?.slice(0, 8).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200 p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 mb-4 sm:mb-6">
                Order Details
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-neutral-600 font-light">Subtotal</span>
                  <span className="text-neutral-900 font-medium">
                    {order?.total_amount ? `₹${order.total_amount.toLocaleString()}` : '₹—'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-neutral-600 font-light">Shipping</span>
                  <span className="text-green-600 font-semibold text-xs sm:text-sm">FREE</span>
                </div>

                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-neutral-600 font-light">Tax</span>
                  <span className="text-neutral-900 font-medium">Included</span>
                </div>

                <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t-2 border-neutral-100 flex justify-between items-center">
                  <span className="text-base sm:text-lg font-medium text-neutral-900">Total Amount</span>
                  <span className="text-2xl sm:text-3xl font-light text-neutral-900">
                    {order?.total_amount ? `₹${order.total_amount.toLocaleString()}` : '₹—'}
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              {[
                { icon: ShieldCheck, label: 'Secure Payment', desc: '256-bit SSL' },
                { icon: Truck, label: 'Free Shipping', desc: 'All Orders' },
                { icon: Package, label: 'Easy Returns', desc: '30 Days' }
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-3 sm:p-4 bg-gradient-to-br from-neutral-50 to-white rounded-xl sm:rounded-2xl border border-neutral-200 text-center"
                >
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-900 mx-auto mb-1.5 sm:mb-2" />
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-neutral-900 mb-0.5 sm:mb-1 leading-tight">
                    {item.label}
                  </p>
                  <p className="text-[8px] sm:text-[9px] text-neutral-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Payment Section */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 space-y-4 sm:space-y-6">
              {/* Payment Card */}
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200 p-5 sm:p-6 lg:p-8 shadow-sm">
                <div className="text-center mb-6 sm:mb-8">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-neutral-900 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                    <Lock className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-light text-neutral-900 tracking-tight mb-1.5 sm:mb-2">
                    Secure Checkout
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light px-2">
                    Your payment is protected with bank-level encryption
                  </p>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={loading || !order}
                  className="w-full h-12 sm:h-14 bg-neutral-900 text-white rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-800 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 shadow-xl mb-5 sm:mb-6"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="text-xs sm:text-sm">Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Pay with Razorpay</span>
                    </>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-[9px] sm:text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3 sm:mb-4">
                    Accepted Payment Methods
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 transition-all">
                    {[
                      { src: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg', alt: 'UPI' },
                      { src: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg', alt: 'GPay' },
                      { src: 'https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg', alt: 'PhonePe' },
                      { src: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg', alt: 'Paytm' }
                    ].map((payment, i) => (
                      <div key={i} className="w-10 h-7 sm:w-12 sm:h-8 bg-white border border-neutral-200 rounded-md sm:rounded-lg flex items-center justify-center p-1 sm:p-1.5">
                        <img src={payment.src} alt={payment.alt} className="w-full h-full object-contain" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-gradient-to-br from-neutral-50 to-white rounded-xl sm:rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <div className="flex gap-3 sm:gap-4">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 mb-1">
                      100% Secure Payment
                    </h4>
                    <p className="text-[10px] sm:text-xs text-neutral-600 leading-relaxed">
                      Your payment information is encrypted and never stored on our servers. We comply with all PCI DSS requirements.
                    </p>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <p className="text-[9px] sm:text-[10px] text-neutral-500 text-center leading-relaxed font-light px-2">
                By completing this purchase, you agree to our{' '}
                <a href="/terms" className="underline hover:text-neutral-900">Terms & Conditions</a>
                {' '}and{' '}
                <a href="/privacy" className="underline hover:text-neutral-900">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <LuxuryFooter />
    </div>
  )
}