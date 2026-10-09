'use server'

import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { z } from 'zod'

// 1. Define strict server-side validation constraints
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
        .max(50, 'Author name cannot exceed 50 characters.') // Prevents payload bloat attacks
})

export async function authorSignUpAction(email: string, password: string, displayName: string) {
    // 2. Validate input parameters FIRST
    const validation = SignUpSchema.safeParse({ email, password, displayName })

    if (!validation.success) {
        // Return the first validation error immediately before touching Supabase
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
        return { error: error.message }
    }

    if (data?.user && data.user.identities && data.user.identities.length === 0) {
        return { isExistingGoogleUser: true }
    }

    return { success: true }
}