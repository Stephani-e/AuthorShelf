'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Info } from 'lucide-react'

export default function LandingPage() {
  return (
      <main className="flex min-h-screen flex-col font-sans">
        {/* Navigation - Parchment Base */}
        <header className="flex items-center justify-between px-8 py-6 bg-[#EAE6DF] border-b border-[#2D4A3E]/10">
          <div className="flex items-center gap-3">
            {/* Reserved Logo Slot */}
            <div className="w-8 h-8 rounded-md bg-[#2D4A3E]/10 flex items-center justify-center border border-[#2D4A3E]/20">
              <span className="text-[10px] text-[#2D4A3E] font-bold uppercase tracking-wider">Logo</span>
            </div>
            <Link href="/" className="font-serif text-2xl text-[#2D4A3E] font-bold tracking-tight">
              AuthorShelf.
            </Link>
          </div>

          {/* About AuthorShelf Icon Link */}
          <div className="flex items-center">
            <Link
                href="/about"
                title="About AuthorShelf"
                aria-label="About AuthorShelf"
                className="p-2.5 text-[#2D4A3E] hover:bg-[#2D4A3E]/10 rounded-full transition-all duration-200 group relative flex items-center justify-center"
            >
              <Info size={20} className="transition-transform group-hover:scale-110" />
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex-1 flex flex-col md:flex-row items-stretch">

          {/* Readers Split - White Base to Parchment Hover */}
          <div className="flex-1 flex flex-col items-center justify-center p-12 bg-white hover:bg-[#EAE6DF] md:border-r border-[#2D4A3E]/10 transition-colors duration-500 group cursor-default">
            <div className="w-48 h-64 rounded-lg mb-8 overflow-hidden relative shadow-md group-hover:shadow-2xl group-hover:-rotate-3 group-hover:-translate-y-2 transition-all duration-500">
              <Image
                  src={"/Images/BookCover.jpg"}
                  alt={"Book Cover"}
                  fill
                  className="object-cover"
              />
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4 text-center text-[#2D4A3E] group-hover:text-zinc-900 transition-colors duration-300">
              For Readers
            </h2>
            <p className="text-zinc-600 group-hover:text-zinc-900 mb-8 max-w-sm text-center leading-relaxed transition-colors duration-300">
              Discover breathtaking serialized fiction. Support authors directly and read in a beautifully designed environment.
            </p>
            <Link
                href="/explore"
                className="px-8 py-3.5 bg-[#2D4A3E] text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:-translate-y-[2px] active:translate-y-0 transition-all"
            >
              Start Reading
            </Link>
          </div>

          {/* Authors Split - Pine Theme */}
          <div className="flex-1 flex flex-col items-center justify-center p-12 bg-[#2D4A3E] hover:bg-[#233a31] transition-colors duration-500 group cursor-default">
            {/* Image Container */}
            <div className="w-48 h-64 rounded-lg mb-8 overflow-hidden relative shadow-lg group-hover:shadow-2xl group-hover:rotate-3 group-hover:-translate-y-2 transition-all duration-500">
              <Image
                  src={"/Images/AuthorDesk.jpg"}
                  alt={"Author Desk"}
                  fill
                  className="object-cover"
              />
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4 text-center text-[#EAE6DF]">
              For Authors
            </h2>
            <p className="text-[#EAE6DF]/80 group-hover:text-[#EAE6DF] mb-8 max-w-sm text-center leading-relaxed transition-colors duration-300">
              Your fiction, your audience. Publish beautifully crafted chapters, build your brand, and connect with your readers.
            </p>
            <Link
                href="/author-login"
                className="px-8 py-3.5 border-2 border-[#EAE6DF] text-[#EAE6DF] rounded-full font-medium hover:bg-[#EAE6DF] hover:text-[#2D4A3E] hover:-translate-y-[2px] active:translate-y-0 transition-all"
            >
              Start Writing
            </Link>
          </div>

        </section>
      </main>
  )
}