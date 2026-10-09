import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AuthorTermsPage() {
    return (
        <main className="min-h-screen bg-[#2D4A3E] font-sans text-zinc-900 py-12 px-4 sm:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-4xl shadow-xl p-8 sm:p-12 border border-zinc-100">

                {/* Header & Back Button */}
                <div className="mb-10 flex items-center justify-between border-b border-zinc-200 pb-6">
                    <Link href="/author-login" className="flex items-center gap-2 text-sm font-medium text-[#2D4A3E] hover:text-[#1d3028] transition-colors">
                        <ArrowLeft size={16} /> Back to Log In
                    </Link>
                    <span className="font-serif text-xl font-bold text-[#2D4A3E]">AuthorShelf.</span>
                </div>

                {/* Content */}
                <article className="prose prose-zinc max-w-none">
                    <h1 className="text-3xl font-serif font-bold text-[#2D4A3E] mb-6">Terms of Use for Authors</h1>
                    <p className="text-sm text-zinc-500 mb-8">Last Updated: <span>October 9, 2026</span></p>

                    <section className="space-y-6 text-zinc-700">
                        <div>
                            <h2 className="text-xl font-bold text-zinc-900 mb-3">1. Acceptance of Terms</h2>
                            <p>By creating an AuthorShelf account, publishing content, or otherwise accessing the AuthorShelf platform as a creator, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the service.</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-zinc-900 mb-3">2. Content Ownership</h2>
                            <p>You retain 100% ownership of all intellectual property rights to the original content you publish on AuthorShelf. By uploading your work, you grant AuthorShelf a non-exclusive, worldwide, royalty-free license to display, distribute, and promote your content strictly within the bounds of the platform's functionality.</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-zinc-900 mb-3">3. Acceptable Use and Content Guidelines</h2>
                            <p>Authors agree not to publish content that:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Infringes upon the copyrights or trademarks of others.</li>
                                <li>Contains malicious code, malware, or spam.</li>
                                <li>Violates applicable local, state, national, or international laws.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-zinc-900 mb-3">4. Account Security</h2>
                            <p>You are responsible for safeguarding the password that you use to access AuthorShelf and for any activities or actions under your password. We encourage you to use "strong" passwords (passwords that use a combination of upper and lower case letters, numbers, and symbols) with your account.</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-zinc-900 mb-3">5. Termination</h2>
                            <p>AuthorShelf reserves the right to suspend or terminate your access to the platform at any time, with or without cause, particularly in the event of a violation of these Terms of Use.</p>
                        </div>
                    </section>
                </article>

            </div>
        </main>
    )
}