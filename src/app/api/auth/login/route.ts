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
        const {data} = await response.json()
       const res =   NextResponse.json(data)
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