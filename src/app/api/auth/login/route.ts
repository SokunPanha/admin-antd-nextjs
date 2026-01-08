import getEnvironment from "@/core/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try{
        const body = await request.json()
        const response = await fetch(getEnvironment().gateway + '/admin/v1/auth/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // 'Accept-Language': request.headers.get('Accept-Language'),
            },
            body: JSON.stringify(body)
        })
        console.log("🚀 ~ POST ~ response:", response)

        // Check if response is ok
        if (!response.ok) {
            const errorData = await response.json()
            return NextResponse.json(
                { error: errorData.message || 'Login failed' },
                { status: response.status }
            )
        }

        const responseJson = await response.json()
        console.log('Login API Response:', responseJson)

        // Handle different response structures
        const data = responseJson.data || responseJson

        if (!data || !data.access_token) {
            console.error('Invalid response structure:', responseJson)
            return NextResponse.json(
                { error: 'Invalid response from authentication server' },
                { status: 500 }
            )
        }

       // Create a serializable response object
       const responseData = {
           access_token: data.access_token,
           refresh_token: data.refresh_token,
           user: data.user ? {
               id: String(data.user.id), // Convert BigInt to string if needed
               email: data.user.email,
               name: data.user.name,
               role: data.user.role,
           } : null
       }

       const res = NextResponse.json({ success: true, data: responseData })
       res.cookies.set('access_token', data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
    })
       res.cookies.set('refresh_token', data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
    })
    return res
    
    }
    catch(error){
        console.log(error)
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
    }
}