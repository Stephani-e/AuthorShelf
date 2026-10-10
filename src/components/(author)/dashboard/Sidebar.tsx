'use client'

import React, {useState} from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {BookOpen, User, HelpCircle, LogOut, LayoutDashboard, BarChart2, ChevronRight, ChevronLeft} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    const [isCollapsed, setIsCollapsed] = useState(false)

    const handleSignOut = async () => {
        // Sign out other sessions safely and clear user state
        await supabase.auth.signOut({ scope: 'others' })
        await supabase.auth.signOut()
        router.push('/author-login')
        router.refresh()
    }

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'My Works', href: '/author-works', icon: BookOpen },
        { name: 'Analytics', href: '/analytics', icon: BarChart2 },
        { name: 'Profile & Shelf', href: '/author-profile', icon: User },
        { name: 'Support', href: '/author-support', icon: HelpCircle },
    ]

    return (
        <aside
            className={`bg-[#2D4A3E] text-[#EAE6DF] flex flex-col justify-between min-h-screen p-4 shrink-0 font-sans transition-all duration-300 relative ${
                isCollapsed ? 'w-20' : 'w-64'
            }`}
        >
            {/* Collapse Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-9 bg-[#EAE6DF] text-[#2D4A3E] p-1 rounded-full border border-[#2D4A3E]/20 shadow-md hover:scale-110 transition-all cursor-pointer z-20"
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            <div>
                {/* Brand Logo & Header */}
                <div className="mb-10 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EAE6DF] text-[#2D4A3E] flex items-center justify-center font-serif font-bold text-xl shadow-sm">
                        A
                    </div>
                    {!isCollapsed && (
                        <Link href="/dashboard" className="font-serif text-2xl font-bold text-[#EAE6DF] tracking-tight whitespace-nowrap overflow-hidden">
                            AuthorShelf.
                        </Link>
                    )}
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1.5">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname.startsWith(item.href)

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                title={isCollapsed ? item.name : undefined}
                                className={`flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                                    isActive
                                        ? 'bg-[#EAE6DF] text-[#2D4A3E] shadow-sm'
                                        : 'text-[#EAE6DF]/80 hover:bg-white/10 hover:text-white'
                                } ${isCollapsed ? 'justify-center px-0' : ''}`}
                            >
                                <Icon size={18} className="shrink-0" />
                                {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            {/* Footer Action: Sign Out */}
            <div className="pt-6 border-t border-white/10">
                <button
                    onClick={handleSignOut}
                    title={isCollapsed ? "Sign Out" : undefined}
                    className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-sm font-semibold text-rose-300 hover:bg-rose-500 hover:text-rose-200 transition-colors cursor-pointer ${
                        isCollapsed ? 'justify-center px-0' : ''
                    }`}
                >
                    <LogOut size={20} className="shrink-0" />
                    {!isCollapsed && <span>Sign Out</span>}
                </button>
            </div>
        </aside>
    )
}