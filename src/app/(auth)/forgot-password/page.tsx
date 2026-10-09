'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const supabase = createClient()

    const handleResetRequest = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMessage('')

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/callback?next=/reset-password`,
        })

        if (error) {
            setErrorMessage(error.message)
            setStatus('error')
        } else {
            setStatus('success')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#EAE6DF] px-4 font-sans">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm border border-zinc-200/80">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-serif font-bold text-[#2D4A3E]">Recover Account</h1>
                    <p className="text-sm text-zinc-500 mt-2">Enter your email to receive a reset link.</p>
                </div>

                {status === 'success' ? (
                    <div className="bg-emerald-50 text-[#2D4A3E] p-4 rounded-xl text-sm font-medium text-center border border-emerald-100">
                        If an account exists, a recovery link has been sent to your email.
                    </div>
                ) : (
                    <form onSubmit={handleResetRequest} className="space-y-5">
                        <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1 ml-1">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="author@example.com"
                                className="w-full p-3 bg-zinc-50 border border-zinc-200 focus:border-[#2D4A3E] rounded-xl outline-none text-sm text-black transition-colors"
                            />
                        </div>

                        {status === 'error' && (
                            <p className="text-red-600 text-xs font-medium ml-1">{errorMessage}</p>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-[#2D4A3E] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#1f332a] transition-colors disabled:opacity-70"
                        >
                            {status === 'loading' ? 'Sending...' : 'Send Recovery Link'}
                        </button>
                    </form>
                )}

                <div className="mt-8 text-center">
                    <Link href="/author-login" className="text-sm text-zinc-500 hover:text-[#2D4A3E] font-medium transition-colors">
                        Return to login
                    </Link>
                </div>
            </div>
        </div>
    )
}