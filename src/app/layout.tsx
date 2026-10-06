import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

// Clean font for buttons, forms, and small UI text
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

// Elegant Serif font for Book Titles, Headings, and reading text
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'AuthorShelf | Independent Fiction',
  description: 'An author-first platform for serialized web fiction.',
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en" className="antialiased">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50`}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
      </html>
  )
}