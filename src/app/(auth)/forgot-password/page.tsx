'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Mail, ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

function ForgotPasswordContent() {
    const searchParams = useSearchParams()
    const supabase = createClient()

    const [email, setEmail] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

    // Capture URL error parameter (e.g., from expired reset-password session redirect)
    useEffect(() => {
        const urlError = searchParams.get('error')
        if (urlError) {
            setMessage({ text: urlError, type: 'error' })
        }
    }, [searchParams])

    // Live email validation check
    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        setIsEmailValid(emailRegex.test(email))
    }, [email])

    const handleResetRequest = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isEmailValid) return

        setLoading(true)
        setMessage(null)

        try {
            // Sends the reset link and instructs the callback route to forward to /reset-password
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/callback?next=/reset-password`
            })

            if (error) throw error

            setMessage({
                text: 'Password recovery email sent! Check your inbox for the link.',
                type: 'success'
            })
        } catch (err: any) {
            setMessage({
                text: err.message || 'Failed to send recovery email. Please try again.',
                type: 'error'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-zinc-200/80 p-8">
            <div className="text-center mb-8">
                <Link href="/" className="font-serif text-2xl font-bold text-[#2D4A3E] tracking-tight">
                    AuthorShelf.
                </Link>
                <h1 className="text-xl font-semibold text-zinc-800 mt-4">Reset Your Password</h1>
                <p className="text-sm text-zinc-500 mt-2">
                    Enter your account email and we'll send you a secure link to create a new password.
                </p>
            </div>

            {message && (
                <div className={`mb-6 rounded-lg p-3 text-sm font-medium border text-center ${
                    message.type === 'error'
                        ? 'bg-rose-50 text-rose-600 border-rose-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleResetRequest} className="space-y-5">
                <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1 ml-1">Email Address</label>
                    <div className={`flex items-center bg-zinc-50 border rounded-xl overflow-hidden transition-all ${
                        email && !isEmailValid ? 'border-rose-300' : 'border-zinc-200 focus-within:border-[#2D4A3E]'
                    }`}>
                        <div className="p-3 text-[#2D4A3E] border-r border-zinc-200 bg-white">
                            <Mail size={18} />
                        </div>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="author@example.com"
                            className="flex-1 p-3 bg-transparent text-sm text-black outline-none w-full"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading || !isEmailValid}
                    className="w-full rounded-full bg-gradient-to-r from-[#2D4A3E] to-[#436D5A] py-3.5 text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-40 hover:-translate-y-[2px] disabled:cursor-not-allowed cursor-pointer mt-2"
                >
                    {loading ? 'Sending Link...' : 'Send Recovery Link'}
                </button>
            </form>

            <div className="mt-8 text-center">
                <Link
                    href="/author-login"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#2D4A3E] hover:text-[#1d3028] transition-colors"
                >
                    <ArrowLeft size={14} />
                    Back to Login
                </Link>
            </div>
        </div>
    )
}

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#EAE6DF] px-4 font-sans">
            <Suspense fallback={<div className="text-zinc-500 text-sm">Loading...</div>}>
                <ForgotPasswordContent />
            </Suspense>
        </div>
    )
}