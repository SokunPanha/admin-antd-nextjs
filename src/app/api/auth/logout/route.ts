import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(){
    try{
        const cookieStore = await cookies()
        cookieStore.delete('access_token')
        cookieStore.delete('refresh_token')

        return NextResponse.json({ success: true, message: 'Logged out successfully' })

    }
    catch(error){
        console.log(error)
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
    }
}
