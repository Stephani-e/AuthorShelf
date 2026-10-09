'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Lock, Eye, EyeOff, CheckCircle2, Circle } from 'lucide-react'

export default function ResetPasswordPage() {
    const router = useRouter()
    const supabase = createClient()

    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

    // Validation State
    const [pwdChecks, setPwdChecks] = useState({
        length: false,
        uppercase: false,
        number: false,
        special: false
    })

    // Real-time password validation
    useEffect(() => {
        setPwdChecks({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password)
        })
    }, [password])

    const isPasswordValid = Object.values(pwdChecks).every(Boolean)

    const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isPasswordValid) return

        setLoading(true)
        setMessage(null)

        // 1. Update the password securely
        const { error } = await supabase.auth.updateUser({
            password: password
        })

        if (error) {
            setMessage({ text: error.message, type: 'error' })
            setLoading(false)
        } else {
            setMessage({ text: 'Password successfully updated! Redirecting...', type: 'success' })

            // 2. Fetch their metadata to see if they are an author or reader
            const { data: { user } } = await supabase.auth.getUser()
            const role = user?.user_metadata?.role

            await supabase.auth.signOut({ scope: 'others' })

            // 3. Route them based on their role
            setTimeout(() => {
                if (role === 'author') {
                    router.push('/dashboard/profile')
                } else {
                    router.push('/reader-dashboard') // Or wherever the reader dashboard is
                }
            }, 2000)
        }
    }

    const Requirement = ({ met, text }: { met: boolean; text: string }) => (
        <div className={`flex items-center gap-1.5 text-xs transition-colors duration-300 ${met ? 'text-[#2D4A3E]' : 'text-zinc-400'}`}>
            {met ? <CheckCircle2 size={14} /> : <Circle size={14} />}
            <span>{text}</span>
        </div>
    )

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#EAE6DF] px-4 font-sans">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm border border-zinc-200/80">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-serif font-bold text-[#2D4A3E]">Create New Password</h1>
                    <p className="text-sm text-zinc-500 mt-2">Enter a new secure password for your AuthorShelf account.</p>
                </div>

                {message && (
                    <div className={`mb-6 rounded-lg p-3 text-sm font-medium border text-center ${message.type === 'error' ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handlePasswordReset} className="space-y-6">
                    <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1 ml-1">New Password</label>
                        <div className="flex items-center bg-zinc-50 border border-zinc-200 focus-within:border-[#2D4A3E] rounded-xl overflow-hidden transition-all">
                            <div className="p-3 text-[#2D4A3E] border-r border-zinc-200 bg-white">
                                <Lock size={18} />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="flex-1 p-3 bg-transparent text-sm text-black outline-none w-full"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="px-3 text-zinc-400 hover:text-zinc-600 transition-colors focus:outline-none"
                            >
                                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                        </div>

                        {/* Password Requirements Checklist */}
                        <div className="mt-3 grid grid-cols-2 gap-2 ml-1">
                            <Requirement met={pwdChecks.length} text="8+ characters" />
                            <Requirement met={pwdChecks.uppercase} text="Uppercase letter" />
                            <Requirement met={pwdChecks.number} text="At least 1 number" />
                            <Requirement met={pwdChecks.special} text="Special character" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !isPasswordValid}
                        className="w-full rounded-full bg-gradient-to-r from-[#2D4A3E] to-[#436D5A] py-3.5 text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-40 hover:-translate-y-[2px] disabled:cursor-not-allowed cursor-pointer"
                    >
                        {loading ? 'Updating Password...' : 'Save New Password'}
                    </button>
                </form>
            </div>
        </div>
    )
}