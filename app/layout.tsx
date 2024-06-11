import type { Metadata } from 'next'
import { Balsamiq_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import Banner from '@/components/banner'
import { Toaster } from "@/components/ui/toaster"

const balsamiq_Sans = Balsamiq_Sans({subsets:['latin'],weight:['400','700']})

export const metadata: Metadata = {
  title: 'MovieTube',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn("dark:bg-black bg-white",balsamiq_Sans.className)} >
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
          <Banner/>
        <Header />
        {children}
        </ThemeProvider>
        <Toaster />
        </body>
    </html>
  )
}
