import Link from 'next/link'
import { CompassIcon } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10">
      <nav className="bg-black text-white">
        <div className="mx-auto max-w-md">
          <div className="flex h-20 items-center justify-between space-x-6 px-8">
            <div></div>
            <Link href="/" className="flex items-center">
              <CompassIcon className="mr-2 h-6 w-6" />
              <span className="text-xl font-bold">Robynhood Advisor</span>
            </Link>
            <div></div>
          </div>
        </div>
      </nav>
    </header>
  )
}
