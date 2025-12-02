import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token');

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Not authenticated'
                },
                { status: 401 }
            );
        }

        // Decode token (in production, use proper JWT verification)
        try {
            const decoded = JSON.parse(Buffer.from(token.value, 'base64').toString());

            return NextResponse.json(
                {
                    success: true,
                    user: { email: decoded.email }
                },
                { status: 200 }
            );
        } catch {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid token'
                },
                { status: 401 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: 'An error occurred'
            },
            { status: 500 }
        );
    }
}
