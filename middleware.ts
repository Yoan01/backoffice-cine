import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const currentUser = request.cookies.get('user')?.value

	const origin = request?.nextUrl?.origin
	const path = request?.nextUrl?.pathname

	if (!path?.includes('/login') && !currentUser) {
		return NextResponse.redirect(new URL('/login', origin))
	} else if (path?.includes('/login') && currentUser) {
		return NextResponse.redirect(new URL('/', origin))
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
