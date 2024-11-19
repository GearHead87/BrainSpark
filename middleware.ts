import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

const protectRoutes = ['/middleware'];

export default async function middleware(request: NextRequest) {
	const session = await auth();

	const isProtected = protectRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

	if (!session && isProtected) {
		const absoluteURL = new URL('/', request.nextUrl.origin);
		return NextResponse.redirect(absoluteURL.toString());
	}

	// Store current request url in a custom header, which you can read later
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('x-url', request.url);
	return NextResponse.next({
		request: {
			// Apply new request headers
			headers: requestHeaders,
		},
	});
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
