'use client'

import { useState } from 'react'
import { addDays } from 'date-fns'
import { Search } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { DatePickerWithRange } from '@/components/date-range-picker'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Home() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const val = e.target as HTMLFormElement
    const place = val.place as HTMLInputElement

    console.log(place.value)
    console.log(date)
  }

  return (
    <main className="mx-auto max-w-md">
      <section className="space-y-4 px-2 py-8">
        <form onSubmit={onSubmit}>
          <div className="flex flex-col space-y-3 rounded-xl border px-3 py-4">
            <input
              name="place"
              type="text"
              placeholder="Search any place..."
              className="ml-1 focus-visible:outline-none"
              required
            />
            <div className="mx-auto flex space-x-2">
              <DatePickerWithRange dateRange={date} onSelection={setDate} />
              <Button variant="outline" size="icon" type="submit">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>

        <Input type="text" placeholder="What kind of traveller are you?" />
      </section>
    </main>
  )
}
