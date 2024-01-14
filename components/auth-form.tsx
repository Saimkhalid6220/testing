'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa, ViewType } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthForm({view}:{view:ViewType}) {
  const supabase = createClientComponentClient()

  return (
    <Auth
      supabaseClient={supabase}
      view={view}
      appearance={{ theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: '#0f172a',
              brandAccent:'#0f172a'
            }}}
      }}
      theme="dark"
      showLinks={false}
      providers={['google']}
      redirectTo="https://movietube.vercel.app/auth/callback"
    />
  )
}
