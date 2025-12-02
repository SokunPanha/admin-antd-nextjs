import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const VALID_CREDENTIALS = {
    email: 'admin@gmail.com',
    password: 'admin',
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validate credentials
        if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
            // Create a simple token (in production, use proper JWT)
            const token = Buffer.from(JSON.stringify({ email, timestamp: Date.now() })).toString('base64');

            // Set cookie
            const cookieStore = await cookies();
            cookieStore.set('auth-token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/',
            });

            return NextResponse.json(
                {
                    success: true,
                    message: 'Login successful',
                    user: { email }
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid email or password'
                },
                { status: 401 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: 'An error occurred during login'
            },
            { status: 500 }
        );
    }
}
