import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // In a real application, you would verify the JWT token here
    // For now, we'll just check for a cookie
    const token = request.cookies.get('token');
    
    if (!token) {
      // Redirect to login page if not authenticated
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // TODO: Verify token and check if user is admin
    // For now, we'll allow access
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
