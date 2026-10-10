import Link from 'next/link'
import React from "react";
import Sidebar from "@/components/(author)/dashboard/Sidebar"

export default function AuthorLayout({
                                         children,
                                     }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
            {/* Author Sidebar Navigation */}
            <Sidebar />

            {/* Main Author Workspace */}
            <div className="flex-1 flex flex-col">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
                    <Link href="/" className="font-serif text-xl font-bold">
                        AuthorShelf.
                    </Link>
                    <div className="flex gap-4 text-sm font-medium">
                        <Link href="/dashboard/profile">Profile</Link>
                        <Link href="/dashboard/books">Books</Link>
                    </div>
                </header>

                <main className="flex-1 p-6 md:p-10">
                    {children}
                </main>
            </div>
        </div>
    )
}