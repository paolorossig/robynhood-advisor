import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Navbar from '@/components/layout/navbar'
import { cn } from '@/lib/utils'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s - Robynhood Advisor',
    default: 'Robynhood Advisor - Plan your trip',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(inter.className, 'h-full')}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
