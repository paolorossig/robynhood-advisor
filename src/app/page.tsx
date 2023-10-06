'use client'

import { useState } from 'react'
import { addDays } from 'date-fns'
import { Search } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { DatePickerWithRange } from '@/components/date-range-picker'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'

const availableOptions = [
  {
    id: 0,
    name: 'Machu Picchu',
    description:
      'Ancient Incan citadel located in the Andes mountains, known for its breathtaking scenery and historical significance.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/c/ca/Machu_Picchu%2C_Peru_%282018%29.jpg',
  },
  {
    id: 1,
    name: 'Cusco',
    description:
      'Historic city with well-preserved Inca architecture and a gateway to Machu Picchu.',
    image:
      'https://www.exploorperu.com/wp-content/uploads/2022/05/top-things-to-do-peru-exploor-peru-cusco.png',
  },
  {
    id: 2,
    name: 'Arequipa',
    description:
      'Picturesque city surrounded by volcanoes, known for its colonial architecture and rich culture.',
    image:
      'https://media.vogue.mx/photos/5e5c4a5b25623100081c4370/16:9/w_1280,c_limit/Arequipa--paisaje.jpg',
  },
  {
    id: 3,
    name: 'Lake Titicaca',
    description:
      'High-altitude lake famous for its stunning scenery and traditional floating reed islands.',
    image:
      'https://images.ecestaticos.com/q7iKO2qHP2Y982eg7QxOMoWu5So=/0x0:2121x1414/1200x675/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F153%2F67b%2Fb5c%2F15367bb5c1f178d062732bd9c5e600fa.jpg',
  },
  {
    id: 4,
    name: 'Nazca Lines',
    description:
      'Mysterious geoglyphs etched into the desert floor, best viewed from the air.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6FSvE3gX9tg_XRqX42QnKtgUZi6IpNCuxzjZtCW5RcsAES9quH_th6tP8hZTlLHj4C7Y&usqp=CAU',
  },
  {
    id: 5,
    name: 'Amazon Rainforest',
    description:
      'Vast and biodiverse tropical rainforest offering unique wildlife and adventure opportunities.',
    image:
      'https://services.meteored.com/img/article/expedicion-navegara-amazonas-2024-rio-mas-largo-del-mundo-peru-mantaro-africa-nilo-guiness-1692197134366_1280.jpg',
  },
  {
    id: 6,
    name: 'Colca Canyon',
    description:
      "One of the world's deepest canyons, known for its condor watching and hiking trails.",
    image:
      'https://www.wamanadventures.com/blog/wp-content/uploads/2020/09/Canon-del-Colca-.jpg',
  },
  {
    id: 7,
    name: 'Huacachina',
    description:
      'Oasis town surrounded by sand dunes, popular for sandboarding and dune buggy rides.',
    image: 'https://www.civitatis.com/f/peru/huacachina/huacachina-m.jpg',
  },
  {
    id: 8,
    name: 'Trujillo',
    description:
      'Historic city with archaeological sites like Chan Chan and Huaca de la Luna.',
    image:
      'https://www.diariamenteali.com/medias/mira-todo-lo-que-trujillo-tiene-para-ti-1900Wx500H?context=bWFzdGVyfHJvb3R8MTk0NDg2fGltYWdlL2pwZWd8aDM1L2hhMC85MDc0NDI5MjMxMTM0L21pcmEtdG9kby1sby1xdWUtdHJ1amlsbG8tdGllbmUtcGFyYS10aV8xOTAwV3g1MDBIfGE1NTdjYjk1M2MwZTZmZDRkZjJiN2M0YTMxYmVmN2RhNTBlN2Y2ZmVhYzBjYzRhMGU2MWZmYzgxMjU2YWRhOGQ',
  },
  {
    id: 9,
    name: 'Huaraz',
    description:
      'Gateway to the Cordillera Blanca, offering trekking and mountaineering adventures.',
    image:
      'https://denomades.s3.us-west-2.amazonaws.com/blog/wp-content/uploads/2020/09/06210401/tours-laguna-paron1.jpg',
  },
]

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
      <section className="space-y-4 px-2 py-6">
        <Card className="px-3 py-4">
          <form onSubmit={onSubmit} className="mx-auto max-w-[348px] space-y-3">
            <input
              name="place"
              type="text"
              placeholder="Search any place..."
              className="ml-1 focus-visible:outline-none"
              required
            />
            <div className="flex space-x-2">
              <DatePickerWithRange dateRange={date} onSelection={setDate} />
              <Button variant="outline" size="icon" type="submit">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>

        <Input type="text" placeholder="What kind of traveller are you?" />

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-700">
              Available options:
            </h3>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-6">
              {availableOptions.map((option) => {
                const optionKey = `option-${option.id}`

                return (
                  <div key={optionKey} className="flex space-x-2">
                    <Checkbox id={optionKey} />
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 space-y-2 leading-none">
                        <label
                          htmlFor={optionKey}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {option.name}
                        </label>
                        <p className="text-sm">{option.description}</p>
                      </div>
                      <picture className="">
                        <img
                          src={option.image}
                          alt={option.name}
                          className="h-20 w-20 overflow-hidden rounded-lg object-cover"
                        />
                      </picture>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <div className="text-end">
          <Button type="submit">Submit</Button>
        </div>
      </section>
    </main>
  )
}
