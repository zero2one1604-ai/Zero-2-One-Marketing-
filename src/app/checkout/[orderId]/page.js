'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createRazorpayOrder } from '@/app/actions/createRazorpayOrder'
import { ShieldCheck, Truck, Lock, ChevronLeft, CreditCard, Package, CheckCircle2, MapPin, Edit2, X, Wallet, Banknote } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import products from '@/data/products'
import LuxuryFooter from '@/app/components/Footer'
import Image from 'next/image'

export default function CheckoutPage() {
  const { orderId } = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState(null)
  const [addressSaved, setAddressSaved] = useState(false)
  const [product, setProduct] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  
  const [paymentMethod, setPaymentMethod] = useState('online')

  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    pincode: ''
  })

  useEffect(() => {
    if (!orderId) return

    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`*, order_items (product_id, quantity)`)
        .eq('id', orderId)
        .single()

      if (error) return console.error(error)
      setOrder(data)

      if (data.full_name && data.address_line1 && data.pincode) {
        setAddressSaved(true)
        setForm({
          full_name: data.full_name || '',
          phone: data.phone || '',
          email: data.email || '',
          address_line1: data.address_line1 || '',
          address_line2: data.address_line2 || '',
          city: data.city || '',
          state: data.state || '',
          pincode: data.pincode || ''
        })
      }

      const item = data.order_items?.[0]
      if (!item) return
      const matchedProduct = products.find(p => String(p.id) === String(item.product_id))
      setProduct({ ...matchedProduct, quantity: item.quantity })
    }
    fetchOrder()
  }, [orderId])

  const subtotal = order?.total_amount || 0
  const shippingCharge = paymentMethod === 'cod' ? 100 : 0
  const finalTotal = subtotal + shippingCharge

  const handleAddressSave = async () => {
    if (!form.full_name || !form.phone || !form.address_line1 || !form.city || !form.state || !form.pincode) {
      alert('Please fill all required fields')
      return
    }
    const { error } = await supabase.from('orders').update(form).eq('id', orderId)
  if (error) {
  console.error('ADDRESS SAVE ERROR:', error)
  alert(error.message)
  return
}
    setAddressSaved(true)
    setShowEditModal(false)
  }

  const loadRazorpay = () =>
    new Promise(resolve => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })

  const handleCheckoutAction = async () => {
    if (!addressSaved) return alert('Please save delivery address first')
    
    if (paymentMethod === 'online') {
      setLoading(true)
      const res = await loadRazorpay()
      if (!res) { alert('Gateway failed'); setLoading(false); return }
      try {
        const { razorpayOrderId, amount } = await createRazorpayOrder(orderId)
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount,
          currency: 'INR',
          name: 'Saavi Skincare',
          description: `Order #${orderId.slice(0, 8)}`,
          order_id: razorpayOrderId,
          handler: () => window.location.href = `/orders/${orderId}`,
          theme: { color: '#000000' }
        }
        new window.Razorpay(options).open()
      } catch (err) { console.error(err) } finally { setLoading(false) }
    } else {
      setLoading(true)
      const { error } = await supabase.from('orders').update({ 
        status: 'pending', payment_method: 'cod', total_amount: finalTotal 
      }).eq('id', orderId)
      if (error) return alert('COD failed')
      window.location.href = `/orders/${orderId}`
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
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
     
          <div className="lg:col-span-3 space-y-2 sm:space-y-8">
            <div className="space-y-1 sm:space-y-2">
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-neutral-500 uppercase">
                Order Summary
              </span>
              <h1 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight">
                Review Your Purchase
              </h1>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200 p-2 sm:p-6 lg:p-8 shadow-sm">
  <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
    
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

    <div className="flex-1 min-w-0 flex flex-col justify-center">
      
      <div className="flex flex-col sm:flex-row md:items-center md:justify-between sm:gap-4 sm:mb-3">
        <div className="flex-1 min-w-0">
          <span className="text-[9px] hidden sm:text-[10px] font-bold uppercase tracking-wider text-neutral-500">
            {product?.category}
          </span>
          <h3 className="text-base sm:text-lg md:text-xl font-light text-neutral-900 md:mt-1 tracking-tight truncate">
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


            {!addressSaved ? (
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200 p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-neutral-900">
                    Delivery Address
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                      value={form.full_name}
                      onChange={e => setForm({ ...form, full_name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      placeholder="House No., Building, Street"
                      className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                      value={form.address_line1}
                      onChange={e => setForm({ ...form, address_line1: e.target.value })}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      placeholder="Area, Locality (Optional)"
                      className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                      value={form.address_line2}
                      onChange={e => setForm({ ...form, address_line2: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      placeholder="Your city"
                      className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                      value={form.city}
                      onChange={e => setForm({ ...form, city: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      placeholder="Your state"
                      className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                      value={form.state}
                      onChange={e => setForm({ ...form, state: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      placeholder="6-digit pincode"
                      className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                      value={form.pincode}
                      onChange={e => setForm({ ...form, pincode: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddressSave}
                  className="w-full h-10 md:h-14 cursor-pointer bg-neutral-900 text-white rounded-full text-xs md:text-sm font-semibold md:font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all active:scale-[0.98] shadow-lg"
                >
                  Save & Continue
                </button>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl sm:rounded-3xl border-2 border-green-200 p-3 sm:p-8">
                <div className="flex items-start justify-between md:mb-4">
                  <div className="flex items-center gap-3">
                    <div className="md:w-10 h-7 w-7 md:h-10 rounded-xl bg-green-600 flex items-center justify-center">
                      <MapPin className="md:w-5 w-3 h-3 md:h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-neutral-900">
                        Delivery Address
                      </h3>
                      <p className="text-xs text-green-600 font-medium md:mt-0.5">Saved Successfully</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-full text-xs font-semibold text-neutral-900 hover:bg-neutral-50 transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit
                  </button>
                </div>

                <div className="md:space-y-3 text-sm mt-2 text-neutral-700">
                  <p className="font-medium text-neutral-900">{form.full_name}</p>
                  <p>{form.phone} {form.email && `• ${form.email}`}</p>
                  <p className="leading-relaxed">
                    {form.address_line1}
                    {form.address_line2 && `, ${form.address_line2}`}
                    <br />
                    {form.city}, {form.state} - {form.pincode}
                  </p>
                </div>
              </div>
            )}

           {addressSaved && (
  <div className="space-y-4 mt-8">
    <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-neutral-900">
      Payment Method
    </h3>

    <div className="grid sm:grid-cols-2 gap-1 md:gap-4">

      <button
        onClick={() => setPaymentMethod('online')}
        className={`p-6 rounded-2xl cursor-pointer border-2 text-left transition-all relative ${
          paymentMethod === 'online'
            ? 'border-neutral-900 bg-white shadow-lg'
            : 'border-neutral-200 bg-white hover:border-neutral-900'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center flex-shrink-0">
            <Wallet className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1">
            <p className="text-sm font-bold text-neutral-900">
              Online Payment
            </p>
            <p className="text-xs text-green-600 font-semibold">
              FREE Shipping
            </p>
          </div>

          {paymentMethod === 'online' && (
            <div className="w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            </div>
          )}
        </div>
      </button>

      <button
        onClick={() => setPaymentMethod('cod')}
        className={`p-6 rounded-2xl cursor-pointer border-2 text-left transition-all relative ${
          paymentMethod === 'cod'
            ? 'border-neutral-900 bg-white shadow-lg'
            : 'border-neutral-200 bg-white hover:border-neutral-900'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center flex-shrink-0">
            <Banknote className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1">
            <p className="text-sm font-bold text-neutral-900">
              Cash on Delivery
            </p>
            <p className="text-xs text-neutral-600 font-semibold">
              + ₹100 Shipping Fee
            </p>
          </div>

          {paymentMethod === 'cod' && (
            <div className="w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            </div>
          )}
        </div>
      </button>

    </div>
  </div>
)}


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

          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 space-y-4 sm:space-y-6">
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200 p-5 sm:p-6 lg:p-8 shadow-sm">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 mb-6 pb-4 border-b border-neutral-100">
                  Order Summary
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600 font-light">Subtotal</span>
                    <span className="text-neutral-900 font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600 font-light">Shipping</span>
                    <span className={`font-semibold ${paymentMethod === 'online' ? 'text-green-600' : 'text-neutral-900'}`}>
                      {paymentMethod === 'online' ? 'FREE' : '₹100'}
                    </span>
                  </div>

                  <div className="pt-4 border-t-2 border-neutral-100 flex justify-between items-center">
                    <span className="text-base font-medium text-neutral-900">Total</span>
                    <span className="text-xl md:text-3xl font-light text-neutral-900">₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckoutAction}
                  disabled={loading || !addressSaved}
                  className="w-full h-12 sm:h-14 cursor-pointer bg-neutral-900 text-white rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-800 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 shadow-xl"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{paymentMethod === 'online' ? 'Pay with Razorpay' : 'Confirm Order'}</span>
                    </>
                  )}
                </button>

                <div className="text-center mt-6">
                  <p className="text-[9px] sm:text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3">
                    Accepted Payment Methods
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
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

              <div className="bg-gradient-to-br from-neutral-50 to-white rounded-xl sm:rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <div className="flex gap-3 sm:gap-4">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 mb-1">
                      100% Secure Payment
                    </h4>
                    <p className="text-[10px] sm:text-xs text-neutral-600 leading-relaxed">
                      Your payment information is encrypted and never stored on our servers.
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

      {showEditModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-4 sm:px-8 py-2 md:py-5 flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="md:w-10 w-7 h-7 md:h-10 rounded-xl bg-neutral-900 flex items-center justify-center">
                  <Edit2 className="md:w-5 w-3 h-3 md:h-5 text-white" />
                </div>
                <h2 className="text-sm sm:text-xl font-light text-neutral-900 tracking-tight">
                  Edit Delivery Address
                </h2>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="md:w-10 h-7 w-7 md:h-10 cursor-pointer rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors"
              >
                <X className="md:w-5 w-3 h-3 md:h-5 text-neutral-900" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-5 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="grid sm:grid-cols-2 gap-2 md:gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                    value={form.full_name}
                    onChange={e => setForm({ ...form, full_name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    placeholder="House No., Building, Street"
                    className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                    value={form.address_line1}
                    onChange={e => setForm({ ...form, address_line1: e.target.value })}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    placeholder="Area, Locality (Optional)"
                    className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                    value={form.address_line2}
                    onChange={e => setForm({ ...form, address_line2: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    placeholder="Your city"
                    className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                    value={form.city}
                    onChange={e => setForm({ ...form, city: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    placeholder="Your state"
                    className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                    value={form.state}
                    onChange={e => setForm({ ...form, state: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    placeholder="6-digit pincode"
                    className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                    value={form.pincode}
                    onChange={e => setForm({ ...form, pincode: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-neutral-200 px-3 sm:px-8 py-2 md:py-5 flex gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 cursor-pointer h-10 md:h-12 border-2 border-neutral-300 text-neutral-900 rounded-full text-xs md:text-sm font-semibold md:font-bold uppercase tracking-wider hover:bg-neutral-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddressSave}
                className="flex-1 cursor-pointer h-10 md:h-12 bg-neutral-900 text-white rounded-full text-xs md:text-sm font-semibold md:font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all active:scale-[0.98] shadow-lg"
              >
                Update Address
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pb-24 lg:pb-0">
        <LuxuryFooter />
      </div>
    </div>
  )
}