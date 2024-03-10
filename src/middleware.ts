import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export const verifyToken = async (req: NextRequest) => {
  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return NextResponse.json(
      { message: 'Authorization header missing' },
      { status: 401, statusText: 'Missing Token' }
    );
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded: any = jwt.verify(token, 'veysecret');
    (req as any).userData = decoded;
    return decoded;
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: 'Invalid token' },
      { status: 401, statusText: 'Invalid Token' }
    );
  }
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup';

  const token = request.cookies.get('token')?.value || '';

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // Continue to the next middleware
  return NextResponse.next();
}

// Define the paths that this middleware applies to
export const config = {
  // All paths except '/login' and '/signup' will be covered by this middleware
  matcher: [
    '/',
    '/all-services',
    '/add-services',
    '/login',
    '/signup',
    '/all-blogs',
    '/users',

  ],
};

