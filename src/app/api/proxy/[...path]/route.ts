import getEnvironment from "@/core/config"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies()
        const path = request.nextUrl.pathname.replace('/api/proxy', '')
        const access_token = cookieStore.get('access_token')?.value
        const refresh_token = cookieStore.get('refresh_token')?.value

        // Safely parse JSON body, handle empty body
        let body = null
        const text = await request.text()
        if (text) {
            try {
                body = JSON.parse(text)
            } catch {
                body = null
            }
        }

        const response = await fetch(getEnvironment().gateway + path, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // 'Accept-Language': request.headers.get('Accept-Language'),
                'Authorization': `Bearer ${access_token}`,
            },
            body: body ? JSON.stringify(body) : undefined
        })

        if (response.status === 401 && refresh_token) {

            const refreshRes = await fetch(getEnvironment().gateway + '/admin/v1/auth/refresh', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    // 'Accept-Language': request.headers.get('Accept-Language'),
                    'Authorization': `Bearer ${refresh_token}`,
                },
                body: JSON.stringify({ refresh_token })
            })

            if (refreshRes.ok) {
                const token = await refreshRes.json()

                // Get the original response data
                const data = await response.json()

                // Create a new response with the refreshed tokens set as cookies
                const nextResponse = NextResponse.json(data, { status: response.status })
                nextResponse.cookies.set('access_token', token.access_token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    path: '/'
                })
                nextResponse.cookies.set('refresh_token', token.refresh_token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    path: '/'
                })

                return nextResponse
            }
        }

        return response
    }
    catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}