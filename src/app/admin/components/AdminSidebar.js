'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Star,
  Gift,
  Mail,
  ChevronRight,
  ShieldCheck,
  ExternalLink
} from 'lucide-react'

const navigation = [
  { group: "Core", items: [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Orders', href: '/admin/orders', icon: Package },
  ]},
  { group: "Engagement", items: [
    { label: 'Reviews', href: '/admin/reviews', icon: Star },
    { label: 'Messages', href: '/admin/contacts', icon: MessageSquare },
  ]},
  { group: "Growth", items: [
    { label: 'Corporate', href: '/admin/corporate', icon: Gift },
    { label: 'Newsletter', href: '/admin/newsletter', icon: Mail },
  ]}
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-72 bg-white border-r border-neutral-200 min-h-screen sticky top-0 hidden lg:flex flex-col">
      {/* Branding Section */}
      <div className="p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-black text-xs">S</div>
          <h2 className="text-[11px] font-black tracking-[0.3em] uppercase text-neutral-900">
            Saavi <span className="text-neutral-400 font-normal">System</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-green-50 rounded-md w-fit">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[9px] font-black text-green-700 uppercase tracking-tighter">Server: Live</span>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 px-4 space-y-8 overflow-y-auto pt-4">
        {navigation.map((group) => (
          <div key={group.group}>
            <p className="px-4 text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-4">
              {group.group}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between group px-4 py-3 rounded-xl transition-all duration-300 ${
                      active 
                        ? 'bg-neutral-900 text-white shadow-lg shadow-neutral-200' 
                        : 'text-neutral-500 hover:bg-neutral-50 hover:text-black'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-4 h-4 ${active ? 'text-white' : 'text-neutral-400 group-hover:text-black'}`} />
                      <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                    </div>
                    {active && <ChevronRight className="w-3.5 h-3.5 opacity-50" />}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="p-6 border-t border-neutral-100">
        <a 
          href="/" 
          target="_blank"
          className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl group transition-all hover:bg-neutral-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg border border-neutral-200 group-hover:border-black transition-colors">
              <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-black" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-black">Main Site</p>
              <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-tighter">View Live Shop</p>
            </div>
          </div>
        </a>

        <div className="mt-6 flex items-center gap-3 px-2">
           <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-neutral-400" />
           </div>
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-black uppercase tracking-widest">Admin Access</span>
              <span className="text-[8px] font-bold text-green-600 uppercase tracking-tighter">Verified Session</span>
           </div>
        </div>
      </div>
    </aside>
  )
}