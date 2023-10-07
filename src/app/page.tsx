'use client'

import { useRouter } from 'next/navigation'
import { MouseEventHandler, useState } from 'react'
import { useChat } from 'ai/react'
import { addDays, eachDayOfInterval, format } from 'date-fns'
import { CalendarClockIcon, Search, Terminal, X } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { DatePickerWithRange } from '@/components/date-range-picker'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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

const tarapotoOptions = [
  {
    id: 10,
    name: 'Lamas Community',
    description:
      'The Wayku Quechua Native Community, or also known as the Wayku Barrio Native Community, is located in the San Martín region, in Lamas, approximately 40 minutes from the city of Tarapoto by car.',
    image: 'https://caaap.org.pe/wp-content/uploads/2020/08/ComunidadLamas.jpg',
  },
  {
    id: 11,
    name: 'Carpishuyaco Waterfall',
    description:
      'Tarapoto is a Peruvian city that has great charm, that is why many people go there in order to discover its attractions, one of them being the Carpishuyacu Waterfall; a well-known place thanks to the beauty it has and the great height of its fall.',
    image:
      'https://www.somosperu.org.pe/wp-content/uploads/2019/08/Catarata-de-Carpishuyacu-peru-tarapoto.jpg',
  },
  {
    id: 12,
    name: 'Gocta Waterfall',
    description:
      'Its more than 700 meters high make it one of the largest in the world. Its majesty and natural beauty, which cannot be found just like that, captivates all its visitors.',
    image:
      'https://www.peru.travel/Contenido/Atractivo/Imagen/es/11/1.2/Principal/Catarata%20de%20Gocta.jpg',
  },
]

function Events({ options }: { options: typeof availableOptions }) {
  return (
    <div className="flex flex-col space-y-4">
      {options.map((option) => (
        <Card key={option.id} className="px-2 py-4">
          <div className="flex space-x-2">
            <picture>
              <img
                src={option.image}
                alt={option.name}
                className="h-20 w-20 overflow-hidden rounded-lg object-cover"
              />
            </picture>
            <div className="grid flex-1 space-y-2 leading-none">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {option.name}
              </label>
              <p className="text-sm">{option.description}</p>
            </div>
            <Button variant="outline" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

function ConfirmationModal({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Save</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Is your itinerary complete?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Your itinerary can not be edited in
            this MVP, please check your itinerary carefully.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default function Home() {
  const router = useRouter()

  const [stepIndex, setStepIndex] = useState(0)
  const [place, setPlace] = useState('')
  const [options, setOptions] = useState(availableOptions)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        id: 'context-1',
        role: 'system',
        content:
          'You are a tourist agent, focused on recomending natural tourist places, you are against big travel agencies and you prefer ecotourism and help local comunnities. Be consice when you provide recommendations, no more than 20 words for each tourist place, and no more than 3 options.',
      },
      {
        id: 'context-2',
        role: 'user',
        content: `I want to travel specifically to ${place}`,
      },
    ],
  })

  const allDays =
    dateRange &&
    dateRange.from &&
    dateRange.to &&
    eachDayOfInterval({
      start: dateRange.from,
      end: dateRange.to,
    })

  const dayWith1Event = allDays && Math.floor(Math.random() * allDays.length)
  const dayWith2Events = allDays && Math.floor(Math.random() * allDays.length)

  const finishDemo = () => router.push('/thanks')

  const previousIndex = () => {
    setStepIndex((current) => (current ? current - 1 : 0))
  }

  const nextIndex = () => {
    setStepIndex((current) => (current < 4 ? current + 1 : current))
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const val = e.target as HTMLFormElement
    const placeVal = val.place as HTMLInputElement

    setPlace(placeVal.value)

    if (placeVal.value.toLowerCase() === 'tarapoto') {
      setOptions(tarapotoOptions)
    }

    nextIndex()
  }

  return (
    <main className="mx-auto max-w-md">
      <section className="space-y-4 px-2 py-6">
        {stepIndex >= 0 && (
          <Card className="px-3 py-4">
            <form
              onSubmit={onSubmit}
              className="mx-auto max-w-[348px] space-y-3"
            >
              <input
                name="place"
                type="text"
                placeholder="Search any place..."
                className="ml-1 focus-visible:outline-none"
                required
              />
              <div className="flex space-x-2">
                <DatePickerWithRange
                  dateRange={dateRange}
                  onSelection={setDateRange}
                />
                <Button variant="outline" size="icon" type="submit">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </Card>
        )}

        {stepIndex === 1 && (
          <form
            onSubmit={(e) => {
              nextIndex()
              handleSubmit(e)
            }}
          >
            <Input
              type="text"
              placeholder="What kind of traveller are you?"
              value={input}
              onChange={handleInputChange}
            />
            <div className="flex justify-end px-2 py-4">
              <Button type="submit">Generate options</Button>
            </div>
          </form>
        )}

        {stepIndex === 2 && (
          <div>
            <Alert className="my-4">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Your personal AI assistant:</AlertTitle>
              <AlertDescription>
                {messages
                  .filter((m) => m.role === 'assistant')
                  .map((m) => (
                    <p key={m.id}>{m.content}</p>
                  ))}
              </AlertDescription>
            </Alert>
            <h3 className="text-lg font-semibold text-gray-700">
              Available options:
            </h3>
            <div className="flex flex-col space-y-6">
              {options.map((option) => {
                const optionKey = `option-${option.id}`

                return (
                  <Card key={optionKey} className="flex space-x-2 px-2 py-4">
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
                      <picture>
                        <img
                          src={option.image}
                          alt={option.name}
                          className="h-20 w-20 overflow-hidden rounded-lg object-cover"
                        />
                      </picture>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {stepIndex === 3 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Experiences:
            </h3>
            <ul className="my-4 grid grid-cols-2 gap-x-3 gap-y-5">
              {options.map((option) => {
                const optionKey = `option-${option.id}`
                return (
                  <>
                    <li
                      key={optionKey}
                      className="flex flex-col text-center hover:animate-pulse"
                    >
                      <picture className="grid place-content-center">
                        <img
                          src={option.image}
                          alt={option.name}
                          className="h-20 w-20 overflow-hidden rounded-lg object-cover"
                        />
                      </picture>
                      <span className="text-sm font-bold text-gray-400">
                        Proveedor
                      </span>
                      <span className="text-sm text-gray-700">
                        {option.name}
                      </span>
                    </li>
                    <li
                      key={optionKey + '-2'}
                      className="flex flex-col text-center hover:animate-pulse"
                    >
                      <picture className="grid place-content-center">
                        <img
                          src={option.image}
                          alt={option.name}
                          className="h-20 w-20 overflow-hidden rounded-lg object-cover"
                        />
                      </picture>
                      <span className="text-sm font-bold text-gray-400">
                        Proveedor
                      </span>
                      <span className="text-sm text-gray-700">
                        {option.name}
                      </span>
                    </li>
                  </>
                )
              })}
            </ul>
          </div>
        )}

        {stepIndex === 4 && (
          <div>
            <h3 className="mb-2 flex space-x-2 text-lg font-semibold text-gray-700">
              <CalendarClockIcon className="h-6 w-6" />
              <span>My Itinerary:</span>
            </h3>
            {allDays?.map((day, index) => (
              <>
                <p key={day.toDateString()}>{format(day, 'EEEE dd')}</p>
                <div className="border-l border-dashed border-slate-200 pl-4">
                  {index === dayWith2Events ? (
                    <Events options={[options[0], options[1]]} />
                  ) : index === dayWith1Event ? (
                    <Events options={[options[2]]} />
                  ) : (
                    <p className="h-8"></p>
                  )}
                </div>
              </>
            ))}
          </div>
        )}
      </section>
      {stepIndex > 1 && (
        <div className="flex justify-between px-2 py-4">
          <Button variant="outline" onClick={previousIndex}>
            Previous
          </Button>
          {stepIndex === 4 ? (
            <ConfirmationModal onClick={finishDemo} />
          ) : (
            <Button onClick={nextIndex}>Next</Button>
          )}
        </div>
      )}
    </main>
  )
}
