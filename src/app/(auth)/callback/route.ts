import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')

    let next = searchParams.get('next') ?? '/dashboard/profile'

    // Must start with '/' but MUST NOT start with '//'
    if (!next.startsWith('/') || next.startsWith('//')) {
        next = '/dashboard/profile'
    }

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // Success! Redirect user to their destination
            return NextResponse.redirect(`${origin}${next}`)
        }
    }

    // If the code is missing or exchange failed, send them back to login with an error message
    return NextResponse.redirect(`${origin}/login?error=Could not authenticate user. Please try again.`)
}