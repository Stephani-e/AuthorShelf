import Link from 'next/link'
import React from "react";

export default function AuthorLayout({
                                         children,
                                     }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
            {/* Author Sidebar Navigation */}
            <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between hidden md:flex">
                <div>
                    {/* Platform Branding */}
                    <Link href="/" className="font-serif text-2xl font-bold tracking-tight block mb-8">
                        AuthorShelf.
                    </Link>

                    {/* Navigation Links */}
                    <nav className="space-y-1">
                        <Link
                            href="/dashboard/profile"
                            className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                        >
                            Author Profile
                        </Link>
                        <Link
                            href="/dashboard/books"
                            className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                        >
                            My Books
                        </Link>
                        <Link
                            href="/dashboard/books/new"
                            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-emerald-600 dark:text-emerald-400 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
                        >
                            + Create New Book
                        </Link>
                    </nav>
                </div>

                {/* User Account / Footer */}
                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
                    <Link
                        href="/author-login"
                        className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                        Sign Out
                    </Link>
                </div>
            </aside>

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