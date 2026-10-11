import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // const next = searchParams.get('next') ?? '/dashboard'

    let next = searchParams.get('next') ?? '/dashboard'
    if (next.includes('/reset-password/callback')) {
        next = '/reset-password' // Forces it to be correct no matter what Supabase sends!
    }

    console.log('--- CALLBACK TRIGGERED ---')
    console.log('Code present:', !!code)
    console.log('Target Next URL:', next)

    if (code) {
        const response = NextResponse.redirect(`${origin}${next}`)

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        const cookieHeader = request.headers.get('cookie') || ''
                        return cookieHeader.split(';').map(c => {
                            const [name, ...rest] = c.trim().split('=')
                            return { name, value: rest.join('=') }
                        }).filter(c => c.name)
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            response.cookies.set(name, value, options)
                        })
                    },
                },
            }
        )

        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
            console.error('--- SUPABASE ERROR ---:', error.message)
            return NextResponse.redirect(`${origin}/forgot-password?error=${encodeURIComponent(error.message)}`)
        }

        console.log('--- SUCCESS: Redirecting to', `${origin}${next}`)
        return response
    }

    console.error('--- NO CODE FOUND IN URL ---')
    return NextResponse.redirect(`${origin}/forgot-password?error=No code provided.`)
}