'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X, RefreshCcw, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react'

export default function CancellationModal({ isOpen, onClose, onConfirm, loading, order, isSuccess }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={loading ? null : onClose}
          className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md"
        />
        
        {/* Modal Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-[400px] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          {!isSuccess ? (
            <div className="p-8 md:p-10 text-center">
              {/* Icon Section */}
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <AlertTriangle className="w-10 h-10 text-red-500" />
                <motion.div 
                   animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="absolute inset-0 rounded-full bg-red-500"
                />
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-light text-neutral-900 uppercase tracking-tighter mb-3">
                Cancel <span className="font-serif italic text-neutral-400">Request</span>
              </h3>
              
              <div className="space-y-4 mb-10">
                <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                  Are you sure you wish to cancel <span className="text-black font-bold">Order #{order?.id.slice(0,8)}</span>?
                </p>

                {order?.payment_method === 'online' && (
                  <div className="bg-green-50/50 border border-green-100 rounded-2xl p-4 flex items-start gap-3 text-left">
                    <RefreshCcw className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] font-black text-green-700 uppercase tracking-widest">Refund Policy</p>
                      <p className="text-[11px] text-green-600 font-medium leading-tight mt-1">
                        Full refund of ₹{order.total_amount} will be initiated immediately to your original payment method.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  disabled={loading}
                  onClick={() => onConfirm(order.id)}
                  className="w-full py-4 bg-red-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-red-200 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <RefreshCcw className="w-4 h-4 animate-spin" />
                  ) : (
                    "Confirm Cancellation"
                  )}
                </button>
                <button
                  disabled={loading}
                  onClick={onClose}
                  className="w-full py-4 bg-neutral-100 text-neutral-400 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-neutral-200 transition-all"
                >
                  Keep Order
                </button>
              </div>
            </div>
          ) : (
            /* SUCCESS STATE */
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="p-10 text-center"
            >
              <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-light text-neutral-900 uppercase tracking-tighter mb-2">Order Cancelled</h3>
              <p className="text-sm text-neutral-500 font-medium mb-8">Your request has been processed successfully. We hope to serve you again soon.</p>
              <button
                onClick={onClose}
                className="w-full py-4 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest group flex items-center justify-center gap-2"
              >
                Return to Account <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {/* Security Badge */}
          <div className="bg-neutral-50 py-4 flex items-center justify-center gap-2">
            <ShieldAlert className="w-3 h-3 text-neutral-300" />
            <span className="text-[8px] font-black text-neutral-300 uppercase tracking-widest">Secure Cancellation Protocol</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}