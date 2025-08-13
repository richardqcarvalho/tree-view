import LocationSvg from '@/images/location.svg?react'
import type { LocationPropsT } from '@/types/location'
import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function Location({ location }: LocationPropsT) {
  const [showChildren, setShowChildren] = useState(false)

  return (
    <div>
      <button
        className='flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1 hover:bg-blue-300'
        key={location.id}
        onClick={() => {
          if (location.children) setShowChildren(previous => !previous)
        }}
      >
        {location.children && (
          <ChevronRight
            size={16}
            className={clsx({
              'transition-transform duration-200': true,
              'rotate-90': showChildren,
            })}
          />
        )}
        <LocationSvg className='text-select h-4' />
        {location.name}
      </button>
      {showChildren && (
        <div className='ml-8'>
          {location.children.map(child => (
            <Location
              key={child.id}
              location={child}
            />
          ))}
        </div>
      )}
    </div>
  )
}
