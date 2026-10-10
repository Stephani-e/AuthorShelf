'use server'

import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { z } from 'zod'

const SignUpSchema = z.object({
    email: z.string().email('Invalid email address format.'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters.')
        .regex(/[A-Z]/, 'Password must contain an uppercase letter.')
        .regex(/[0-9]/, 'Password must contain a number.')
        .regex(/[^A-Za-z0-9]/, 'Password must contain a special character.'),
    displayName: z
        .string()
        .trim()
        .min(1, 'Author name is required.')
        .max(50, 'Author name cannot exceed 50 characters.')
})

export async function authorSignUpAction(email: string, password: string, displayName: string) {
    const validation = SignUpSchema.safeParse({ email, password, displayName })

    if (!validation.success) {
        return { error: validation.error.issues[0].message }
    }

    const { email: safeEmail, password: safePassword, displayName: safeDisplayName } = validation.data

    const supabase = await createClient()
    const headerList = await headers()
    const origin = headerList.get('origin') || ''

    const { data, error } = await supabase.auth.signUp({
        email: safeEmail,
        password: safePassword,
        options: {
            data: {
                role: 'author',
                display_name: safeDisplayName
            },
            emailRedirectTo: `${origin}/callback`
        }
    })

    if (error) {
        const errMsg = error.message.toLowerCase()
        if (errMsg.includes('already registered') || error.status === 422) {
            return { isExistingUser: true }
        }
        return { error: error.message }
    }

    // Check identity providers explicitly if user object is returned
    if (data?.user) {
        const identities = data.user.identities || []

        // If identities exist, inspect the provider
        if (identities.length > 0) {
            const hasGoogle = identities.some((id: any) => id.provider === 'google')
            if (hasGoogle) {
                return { isExistingGoogleUser: true }
            }
        } else {
            // Unconfirmed email/password user or already registered
            return { isExistingUser: true }
        }
    }

    return { success: true }
}