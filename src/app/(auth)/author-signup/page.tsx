'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {User, Mail, Lock, CheckCircle2, Circle, EyeOff, Eye} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import {authorSignUpAction} from "@/app/actions/authAction";

export default function SignUpPage() {
    const router = useRouter()
    const supabase = createClient()

    // Form State
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [termsAccepted, setTermsAccepted] = useState(false)

    // Validation State
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [pwdChecks, setPwdChecks] = useState({
        length: false,
        uppercase: false,
        number: false,
        special: false
    })

    // Submission State
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

    // Real-time validation
    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        setIsEmailValid(emailRegex.test(email))

        setPwdChecks({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password)
        })
    }, [email, password])

    const isPasswordValid = Object.values(pwdChecks).every(Boolean)
    const isFormValid = username.length > 0 && isEmailValid && isPasswordValid && termsAccepted

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isFormValid) return

        setLoading(true)
        setMessage(null)

        try {
            const res = await authorSignUpAction(email, password, username)

            if (res?.error) {
                throw new Error(res.error)
            }

            // Standard Existing Account (Email/Password or Unconfirmed)
            if (res?.isExistingUser) {
                setMessage({
                    text: 'An account with this email already exists. Try logging in, or click "Forgot Password" if you need to recover access.',
                    type: 'error'
                })
                return
            }

            // Existing Google OAuth Account
            if (res?.isExistingGoogleUser) {
                setMessage({
                    text: 'This email was registered using Google Sign-In. Please click "Continue with Google" below to log in.',
                    type: 'error'
                })
                return
            }

            setMessage({ text: 'Success! Please check your email inbox to confirm your account.', type: 'success' })
        } catch (err: any) {
            setMessage({ text: err.message || 'Sign up failed.', type: 'error' })
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleAuth = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: `${window.location.origin}/callback` }
        })
        if (error) setMessage({ text: error.message, type: 'error' })
    }

    const Requirement = ({ met, text }: { met: boolean, text: string }) => (
        <div className={`flex items-center gap-1.5 text-xs transition-colors duration-300 ${met ? 'text-[#2D4A3E]' : 'text-zinc-400'}`}>
            {met ? <CheckCircle2 size={14} /> : <Circle size={14} />}
            <span>{text}</span>
        </div>
    )

    return (
        <main className="min-h-screen flex bg-linear-to-br from-[#2D4A3E] to-[#EAE6DF] font-sans text-zinc-900">
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
                <div className="w-full max-w-md bg-white rounded-4xl shadow-xl p-8 relative overflow-hidden">
                    <div className="text-center mb-8">
                        <Link href="/" className="font-serif text-2xl font-bold text-[#2D4A3E] tracking-tight">
                            AuthorShelf.
                        </Link>
                        <div className="mt-6 flex items-center justify-center gap-4">
                            <div className="h-px bg-zinc-200 flex-1"></div>
                            <h2 className="text-lg font-semibold text-zinc-800">Sign Up</h2>
                            <div className="h-px bg-zinc-200 flex-1"></div>
                        </div>
                    </div>

                    {message && (
                        <div className={`mb-6 rounded-lg p-3 text-sm font-medium border ${message.type === 'error' ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSignUp} className="space-y-5">
                        {/* Username */}
                        <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1 ml-1">Author Name</label>
                            <div className="flex items-center bg-zinc-50 border border-zinc-200 focus-within:border-[#2D4A3E] rounded-xl overflow-hidden transition-all">
                                <div className="p-3 text-[#2D4A3E] border-r border-zinc-200 bg-white"><User size={18} /></div>
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Pen Name"
                                    className="flex-1 p-3 bg-transparent text-sm outline-none w-full"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1 ml-1">Email</label>
                            <div className={`flex items-center bg-zinc-50 border rounded-xl overflow-hidden transition-all ${email && !isEmailValid ? 'border-rose-300 focus-within:border-rose-500' : 'border-zinc-200 focus-within:border-[#2D4A3E]'}`}>
                                <div className="p-3 text-[#2D4A3E] border-r border-zinc-200 bg-white"><Mail size={18} /></div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="author@example.com"
                                    className="flex-1 p-3 bg-transparent text-sm outline-none w-full"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold text-zinc-700 mb-1 ml-1">Password</label>
                            <div className="flex items-center bg-zinc-50 border border-zinc-200 focus-within:border-[#2D4A3E] rounded-xl overflow-hidden transition-all">
                                <div className="p-3 text-[#2D4A3E] border-r border-zinc-200 bg-white"><Lock size={18} /></div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="flex-1 p-3 bg-transparent text-sm outline-none w-full"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="px-3 text-zinc-400 hover:text-zinc-600 transition-colors focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-2 ml-1">
                                <Requirement met={pwdChecks.length} text="8+ characters" />
                                <Requirement met={pwdChecks.uppercase} text="Uppercase letter" />
                                <Requirement met={pwdChecks.number} text="At least 1 number" />
                                <Requirement met={pwdChecks.special} text="Special character" />
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-center gap-3 pt-2">
                            <input
                                type="checkbox"
                                required
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="w-3 h-3 rounded border-zinc-300 text-[#2D4A3E] focus:ring-[#2D4A3E] cursor-pointer"
                            />
                            <span className="text-sm font-medium text-zinc-600">
                                I agree to AuthorShelf <Link href="/author-terms" className="text-[#2D4A3E] underline font-semibold">Terms of use</Link>
                            </span>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !isFormValid}
                            className="w-full rounded-full bg-gradient-to-r from-[#2D4A3E] to-[#436D5A] py-3.5 text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-40 hover:shadow-[#2D4A3E]/20 hover:-translate-y-[2px] active:translate-y-0 active:shadow-md  transition-all disabled:opacity-40 hover:cursor-pointer mt-4"
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="mt-6 flex items-center justify-center gap-4">
                        <div className="h-px bg-zinc-200 flex-1"></div>
                        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Or</span>
                        <div className="h-px bg-zinc-200 flex-1"></div>
                    </div>

                    <button onClick={handleGoogleAuth} className="mt-6 w-full flex items-center justify-center gap-3 rounded-full border border-zinc-200 bg-white py-3 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 transition-all hover:shadow-[#2D4A3E]/20 hover:-translate-y-[2px] active:translate-y-0 active:shadow-md disabled:opacity-40 hover:cursor-pointer">
                        <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                        Continue with Google
                    </button>

                    <div className="mt-8 text-center text-sm font-medium text-zinc-600">
                        Already have an account? <Link href="/author-login" className="text-[#2D4A3E] hover:text-[#1d3028] font-bold">Sign In here</Link>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="hidden lg:flex w-1/2 flex-col items-center justify-center p-12 lg:pr-16 xl:pr-24 relative">
                <div className="text-center z-10">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto">
                        <span className="font-serif text-3xl font-bold text-[#2D4A3E]">A</span>
                    </div>
                    <h1 className="text-3xl font-bold text-zinc-800 mb-4">
                        Join the AuthorShelf<br/>Community
                    </h1>
                </div>
                <div className="relative w-full max-w-lg aspect-square rounded-4xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(45,74,62,0.3)] border border-white">
                    <Image src="/Images/AuthorLogin.jpg" alt="Author Workspace" fill className="object-contain" />
                </div>
            </div>
        </main>
    )
}