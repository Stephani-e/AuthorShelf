'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { User, LogOut, BookOpen, ShieldCheck } from 'lucide-react'

export default function AuthorProfileDashboard() {
    const supabase = createClient()
    const router = useRouter()

    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchUser() {
            const { data: { user }, error } = await supabase.auth.getUser()
            if (error || !user) {
                router.push('/author-login')
            } else {
                setUserEmail(user.email || 'Author')
            }
            setLoading(false)
        }
        fetchUser()
    }, [router, supabase])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/author-login')
    }

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-sm font-medium text-zinc-500 font-serif">Loading your studio...</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">

            {/* Header Banner */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#2D4A3E]/10 text-[#2D4A3E] text-xs font-semibold mb-3">
                        Creator Studio Workspace
                    </span>
                    <h1 className="text-3xl font-serif font-bold text-zinc-900">
                        Welcome back, Creator.
                    </h1>
                    <p className="text-sm text-zinc-500 mt-1">
                        Logged in as <span className="font-medium text-zinc-800">{userEmail}</span>
                    </p>
                </div>

                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
                >
                    <LogOut size={14} /> Sign Out
                </button>
            </div>

            {/* Quick Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2D4A3E] flex items-center justify-center mb-4">
                        <ShieldCheck size={20} />
                    </div>
                    <h3 className="font-semibold text-zinc-800 text-sm">Account Status</h3>
                    <p className="text-xs text-zinc-500 mt-1">Verified & Secure via Supabase</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2D4A3E] flex items-center justify-center mb-4">
                        <BookOpen size={20} />
                    </div>
                    <h3 className="font-semibold text-zinc-800 text-sm">Active Books</h3>
                    <p className="text-xs text-zinc-500 mt-1">0 Published Serials</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2D4A3E] flex items-center justify-center mb-4">
                        <User size={20} />
                    </div>
                    <h3 className="font-semibold text-zinc-800 text-sm">Public Profile</h3>
                    <p className="text-xs text-zinc-500 mt-1">Ready to be configured</p>
                </div>

            </div>

        </div>
    )
}