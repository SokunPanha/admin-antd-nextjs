import getEnvironment from "@/core/config"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies()
        const path = request.nextUrl.pathname.replace('/api/proxy', '')
        const access_token = cookieStore.get('access_token')?.value
        const refresh_token = cookieStore.get('refresh_token')?.value

        // Get locale from cookie or default to 'en'
        const locale = cookieStore.get('locale')?.value || 'en'

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

        let response = await fetch(getEnvironment().gateway + path, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
                'Accept-Language': locale, // Forward language preference
            },
            body: body ? JSON.stringify(body) : undefined
        })

        // If unauthorized and we have a refresh token, try to refresh
        if (response.status === 401 && refresh_token) {
            const refreshRes = await fetch(getEnvironment().gateway + '/admin/v1/auth/refresh', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh_token })
            })

            if (refreshRes.ok) {
                const tokenData = await refreshRes.json()
                const newAccessToken = tokenData.data?.access_token
                const newRefreshToken = tokenData.data?.refresh_token

                if (newAccessToken) {
                    // Retry the original request with the new access token
                    response = await fetch(getEnvironment().gateway + path, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${newAccessToken}`,
                            'Accept-Language': locale, // Forward language preference
                        },
                        body: body ? JSON.stringify(body) : undefined
                    })

                    // Get the response data
                    const data = await response.json()

                    // Create a response with the new tokens set as cookies
                    const nextResponse = NextResponse.json(data, { status: response.status })
                    nextResponse.cookies.set('access_token', newAccessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'lax',
                        path: '/'
                    })
                    if (newRefreshToken) {
                        nextResponse.cookies.set('refresh_token', newRefreshToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'lax',
                            path: '/'
                        })
                    }

                    return nextResponse
                }
            }
        }

        // Return the original response if no refresh was needed or refresh failed
        const data = await response.json()
        return NextResponse.json(data, { status: response.status })
    }
    catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}