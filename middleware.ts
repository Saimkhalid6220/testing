import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser() 

  // if user is signed in and the current path is /dashboard redirect the user to /dashboard
  // if (user?.email === 'saimkhalid6220@gmail.com' && req.nextUrl.pathname === '/signup') {
  //   return NextResponse.redirect(new URL('/dashboard', req.url))
  // }

//   // if user is  signed in and the current path is not /dashboard redirect the user to /
  if (user?.email !== 'saimkhalid6220@gmail.com' && req.nextUrl.pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: [ '/dashboard'],
}