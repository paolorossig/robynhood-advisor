import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Navbar from '@/components/layout/navbar'

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
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
