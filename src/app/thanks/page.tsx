'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export default function ThanksPage() {
  const router = useRouter()
  const onClick = () => router.push('/')

  return (
    <div className="grid h-full place-content-center">
      <div className="flex flex-col text-center">
        <span className="font-bold uppercase">Thanks!</span>
        <span className="mt-1 text-sm">New features are coming soon</span>
        <Button onClick={onClick} className="mt-6">
          Go back
        </Button>
      </div>
    </div>
  )
}
