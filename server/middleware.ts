import { EUserCookies } from '@/global/config';
import { ProjectRoutes } from '@/global/routes';

import { NextRequest, NextResponse } from 'next/server';
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPrivateRoute = path.includes(ProjectRoutes.recruitment);
  const accessToken = request.cookies.get(EUserCookies.token);

  if (!isPrivateRoute && accessToken) {
    return NextResponse.redirect(
      new URL(
        `${ProjectRoutes.recruitment}/${ProjectRoutes.dashboard}`,
        request.nextUrl,
      ),
    );
  }

  if (isPrivateRoute && !accessToken) {
    return NextResponse.redirect(new URL(ProjectRoutes.login, request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
