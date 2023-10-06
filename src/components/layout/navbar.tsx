import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10">
      <nav className="bg-slate-900 text-white">
        <div className="mx-auto max-w-md">
          <div className="flex h-24 items-center justify-between space-x-6 px-8">
            <div></div>
            <Link href="/" className="text-xl font-bold">
              Robynhood Advisor
            </Link>
            <div></div>
          </div>
        </div>
      </nav>
    </header>
  )
}
