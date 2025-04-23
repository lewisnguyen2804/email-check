"use client"

import { FC } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Badge } from '../ui/badge'

const Endpoint: FC<{ url: string, key: string, locations: string[], countries: string[] }> = ({
  url = '',
  locations = [],
  countries = [],
  key,
}) => {
  const [method, ...uri] = url.split('/')
  const cn = () => {
    switch (method) {
      case 'GET':
        return 'bg-blue-500'
      case 'POST':
        return 'bg-green-500'
      case 'PATCH':
        return 'bg-yellow-500'
      case 'DELETE':
        return 'bg-red-500'
      case 'PUT':
        return 'bg-purple-500'
    }
  }

  return (
    <Accordion type='multiple'>
      <AccordionItem value="url">
        <AccordionTrigger className='flex text-left w-full p-3'>
          <div className='min-w-[100px]'>
            <Badge className={cn()}>{method}</Badge>
          </div>
          <p>/{uri.join('/')}</p>
        </AccordionTrigger>
        <AccordionContent className='grid grid-cols-2'>
          <div >
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Allow Countries</h4>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              {countries.map((location, index) => (
                <li key={index}>{location}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Allow Locations</h4>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              {locations.map((location, index) => (
                <li key={index}>{location}</li>
              ))}
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default Endpoint
