'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import AdminSidebar from './components/AdminSidebar'
import AdminHeader from './components/AdminHeader'

const ALLOWED_ADMINS = [
  'pravingupta2020@gmail.com',
  'support@saaviskincare.com'
]

export default function AdminLayout({ children }) {
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user || !ALLOWED_ADMINS.includes(user.email)) {
        router.replace('/')
      }
    }

    checkAdmin()
  }, [])

  return (
    <div className="flex min-h-screen bg-[#FAF9F6]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
