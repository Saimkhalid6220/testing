import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  if (code) {
      await supabase.auth.exchangeCodeForSession(code)
      const session =await supabase.auth.exchangeCodeForSession(code)
      localStorage.setItem("session", JSON.stringify(session)) 
    //  localStorage.setItem("session" , JSON.stringify(session))
  }

  return NextResponse.redirect(new URL('/', req.url))
}