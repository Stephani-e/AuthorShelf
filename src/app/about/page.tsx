'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, PenTool, ShieldCheck, Heart, Search, Lock, Send, MessageSquareText } from 'lucide-react'

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#EAE6DF] font-sans text-zinc-900 flex flex-col justify-between">
            {/* Navigation Header */}
            <header className="px-6 sm:px-12 py-6 flex items-center justify-between border-b border-[#2D4A3E]/10 bg-[#EAE6DF]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-[#2D4A3E] text-[#EAE6DF] flex items-center justify-center font-serif font-bold text-lg">
                        A
                    </div>
                    <Link href="/" className="font-serif text-2xl font-bold text-[#2D4A3E] tracking-tight">
                        AuthorShelf.
                    </Link>
                </div>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#2D4A3E] hover:text-[#1d3028] bg-white/60 hover:bg-white px-4 py-2 rounded-full border border-[#2D4A3E]/10 transition-all shadow-sm"
                >
                    <ArrowLeft size={14} />
                    Back to Home
                </Link>
            </header>

            {/* Hero Section */}
            <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-[#2D4A3E] bg-[#2D4A3E]/10 px-3.5 py-1.5 rounded-full">
                    Our Story & Philosophy
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2D4A3E] mt-6 leading-tight">
                    Your Personal Storytelling Haven
                </h1>
                <p className="text-base sm:text-lg text-zinc-700 mt-6 max-w-2xl mx-auto leading-relaxed">
                    AuthorShelf is built as a direct distribution platform for independent writers. No algorithms, no popularity ranking pressure—just clean author profile links and an uninhibited reading experience.
                </p>
            </section>

            {/* Two Pillars: For Authors & For Readers */}
            <section className="max-w-5xl mx-auto px-6 py-8 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* For Readers Card */}
                <div className="bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                        <div className="w-12 h-12 rounded-2xl bg-[#2D4A3E]/10 text-[#2D4A3E] flex items-center justify-center mb-6">
                            <BookOpen size={24} />
                        </div>
                        <h2 className="font-serif text-2xl font-bold text-[#2D4A3E] mb-3">
                            For Readers
                        </h2>
                        <p className="text-sm text-zinc-600 leading-relaxed">
                            Follow direct links from your favorite writers or search pen names alphabetically by genre. Read chapters seamlessly as a guest—and create a free account whenever you're ready to bookmark stories, leave comments, and receive update alerts.
                        </p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-zinc-100 flex items-center justify-between">
                        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">A–Z Directory</span>
                        <Link href="/authors" className="text-sm font-bold text-[#2D4A3E] hover:underline flex items-center gap-1">
                            Search Pen Names →
                        </Link>
                    </div>
                </div>

                {/* For Authors Card */}
                <div className="bg-[#2D4A3E] text-[#EAE6DF] p-8 sm:p-10 rounded-3xl shadow-md flex flex-col justify-between hover:bg-[#253f35] transition-colors">
                    <div>
                        <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#EAE6DF] flex items-center justify-center mb-6">
                            <PenTool size={24} />
                        </div>
                        <h2 className="font-serif text-2xl font-bold text-[#EAE6DF] mb-3">
                            For Authors
                        </h2>
                        <p className="text-sm text-[#EAE6DF]/80 leading-relaxed">
                            Create your personal Author Shelf, upload your serials, and drop your dedicated profile link in your social bio. Focus entirely on your craft without worrying about algorithm updates or pay-to-win visibility.
                        </p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#EAE6DF]/60 uppercase tracking-wider">Creator Studio</span>
                        <Link href="/author-login" className="text-sm font-bold text-white hover:underline">
                            Start Writing →
                        </Link>
                    </div>
                </div>
            </section>

            {/* NEW FEATURE: Advance Shelf / Private Review */}
            <section className="max-w-5xl mx-auto px-6 py-4 w-full">
                <div className="bg-white rounded-3xl border border-[#2D4A3E]/15 shadow-sm p-8 sm:p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#2D4A3E]/5 rounded-full blur-2xl -mr-10 -mt-10"></div>

                    <div className="flex flex-col sm:flex-row sm:items-start gap-6 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-[#2D4A3E] text-white flex items-center justify-center shrink-0">
                            <Lock size={22} />
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <h3 className="font-serif text-2xl font-bold text-[#2D4A3E]">
                                    Introducing Advance Shelf
                                </h3>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-[#2D4A3E] px-2.5 py-1 rounded-full">
                                    New Feature
                                </span>
                            </div>
                            <p className="text-sm text-zinc-600 leading-relaxed max-w-3xl">
                                Not every draft is ready for the world. The <span className="font-semibold text-[#2D4A3E]">Advance Shelf</span> is your private space to get real feedback before you go public. Share your book with selected readers — editors, friends, or trusted beta readers — without them needing to create an account.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
                                <div className="flex gap-3">
                                    <div className="p-2 h-fit rounded-lg bg-[#EAE6DF] text-[#2D4A3E]">
                                        <Send size={16} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-zinc-800">Private Invite Links</h4>
                                        <p className="text-xs text-zinc-600 mt-1 leading-relaxed">Enter name & email and send a secure, private link to your draft.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="p-2 h-fit rounded-lg bg-[#EAE6DF] text-[#2D4A3E]">
                                        <BookOpen size={16} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-zinc-800">No Account Needed</h4>
                                        <p className="text-xs text-zinc-600 mt-1 leading-relaxed">Readers can open and read instantly as guests on their own private shelf.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="p-2 h-fit rounded-lg bg-[#EAE6DF] text-[#2D4A3E]">
                                        <MessageSquareText size={16} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-zinc-800">Centralized Feedback</h4>
                                        <p className="text-xs text-zinc-600 mt-1 leading-relaxed">View author notes, inline comments, and all thoughts in one place to revise faster.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Pillars */}
            <section className="max-w-4xl mx-auto px-6 py-12 w-full">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-[#2D4A3E]/10 p-8 sm:p-12 text-center">
                    <h3 className="font-serif text-2xl font-bold text-[#2D4A3E] mb-8">
                        The AuthorShelf Commitment
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                        <div className="flex gap-4 items-start">
                            <div className="p-2.5 rounded-xl bg-[#2D4A3E]/10 text-[#2D4A3E] shrink-0 mt-1">
                                <Search size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-zinc-800 text-sm">Alphabetical Search Only</h4>
                                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                                    No "Top 100" leaderboards or subscriber ranking lists. Readers filter simply by genre and pen name alphabetically.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="p-2.5 rounded-xl bg-[#2D4A3E]/10 text-[#2D4A3E] shrink-0 mt-1">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-zinc-800 text-sm">Powered by Byte&Security</h4>
                                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                                    Protected account sessions, server-validated actions, and dedicated support routing for creator peace of mind.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 text-center text-xs text-zinc-500 border-t border-[#2D4A3E]/10">
                <p>© {new Date().getFullYear()} AuthorShelf. Powered securely by Byte&Security.</p>
            </footer>
        </main>
    )
}