import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth-token');
    const { pathname } = request.nextUrl;

    // Define protected routes
    const isProtectedRoute = pathname.startsWith('/admin');
    const isLoginPage = pathname.startsWith('/login');
    const isRootPath = pathname === '/';

    // Handle root path
    if (isRootPath) {
        if (token) {
            // Authenticated user -> redirect to admin
            const adminUrl = new URL('/admin', request.url);
            return NextResponse.redirect(adminUrl);
        } else {
            // Unauthenticated user -> redirect to login
            const loginUrl = new URL('/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // If user is trying to access protected route without token
    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // If user is logged in and trying to access login page, redirect to admin
    if (isLoginPage && token) {
        const adminUrl = new URL('/admin', request.url);
        return NextResponse.redirect(adminUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
    ],
};
