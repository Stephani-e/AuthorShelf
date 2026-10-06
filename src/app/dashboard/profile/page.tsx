'use client'

import React, {FormEvent, useEffect, useState} from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AuthorProfilePage() {
    const supabase = createClient()

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    // Profile Form State
    const [username, setUsername] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [bio, setBio] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const [twitter, setTwitter] = useState('')
    const [substack, setSubstack] = useState('')

    useEffect(() => {
        async function loadProfile() {
            try {
                const { data: { user } } = await supabase.auth.getUser()

                if (user) {
                    const { data, error } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', user.id)
                        .single()

                    if (data) {
                        setUsername(data.username || '')
                        setDisplayName(data.display_name || '')
                        setBio(data.bio || '')
                        setAvatarUrl(data.avatar_url || '')
                        setTwitter(data.social_links?.twitter || '')
                        setSubstack(data.social_links?.substack || '')
                    }
                }
            } catch (err) {
                console.error('Error loading profile:', err)
            } finally {
                setLoading(false)
            }
        }

        void loadProfile()
    }, [])

    const handleSaveProfile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        setMessage(null)

        try {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                setMessage({ type: 'error', text: 'You must be logged in to update your profile.' })
                return
            }

            const updates = {
                id: user.id,
                role: 'author',
                username: username.trim().toLowerCase().replace(/[^a-z0-9_-]/g, ''),
                display_name: displayName,
                bio,
                avatar_url: avatarUrl,
                social_links: {
                    twitter,
                    substack,
                },
            }

            const { error } = await supabase.from('profiles').upsert(updates)

            if (error) throw error


            setMessage({ type: 'success', text: 'Author profile updated successfully!' })
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || 'Failed to save profile.' })
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-zinc-500">Loading profile data...</p>
            </div>
        )
    }

    return (
        <main className="mx-auto max-w-3xl px-4 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Author Profile
                </h1>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Set up your public pen name, bio, and handle. This powers your public author page.
                </p>
            </div>

            {message && (
                <div
                    className={`mb-6 rounded-lg p-4 text-sm font-medium ${
                        message.type === 'success'
                            ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                            : 'bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300'
                    }`}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-6">
                {/* Username / Custom Link */}
                <div>
                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        Author Handle (Username)
                    </label>
                    <div className="mt-2 flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-zinc-300 bg-zinc-50 px-3 text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
              authorshelf.com/
            </span>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="roan-author"
                            className="block w-full min-w-0 flex-1 rounded-r-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-100 dark:focus:ring-zinc-100"
                        />
                    </div>
                    <p className="mt-1 text-xs text-zinc-500">
                        This forms your direct share link. Only letters, numbers, hyphens, and underscores.
                    </p>
                </div>

                {/* Display Name */}
                <div>
                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        Display / Pen Name
                    </label>
                    <input
                        type="text"
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="E.g., Stephanie Roan"
                        className="mt-2 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-100 dark:focus:ring-zinc-100"
                    />
                </div>

                {/* Avatar Image URL */}
                <div>
                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        Profile Avatar URL
                    </label>
                    <input
                        type="url"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        placeholder="https://..."
                        className="mt-2 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-100 dark:focus:ring-zinc-100"
                    />
                </div>

                {/* Bio */}
                <div>
                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        Author Bio
                    </label>
                    <textarea
                        rows={4}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Write a short blurb about yourself and your stories..."
                        className="mt-2 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-100 dark:focus:ring-zinc-100"
                    />
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                            Twitter / X Handle
                        </label>
                        <input
                            type="text"
                            value={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                            placeholder="@handle"
                            className="mt-2 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-100 dark:focus:ring-zinc-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                            Substack Link
                        </label>
                        <input
                            type="url"
                            value={substack}
                            onChange={(e) => setSubstack(e.target.value)}
                            placeholder="https://yourname.substack.com"
                            className="mt-2 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-100 dark:focus:ring-zinc-100"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                        {saving ? 'Saving Profile...' : 'Save Author Profile'}
                    </button>
                </div>
            </form>
        </main>
    )
}