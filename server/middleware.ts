import { EUserCookies } from '@/global/config';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const activeToken = request.cookies.get(EUserCookies.user)?.value;
  if (!activeToken && request.nextUrl.pathname !== '/') {
    return Response.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
