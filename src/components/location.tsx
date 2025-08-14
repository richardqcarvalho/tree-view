import Asset from '@/components/asset'
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
        className='hover:bg-select flex cursor-pointer items-center gap-2 rounded-sm px-3 py-1 hover:text-white hover:*:text-white'
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
        <span className='whitespace-nowrap'>{location.name}</span>
      </button>
      {showChildren && (
        <div className='ml-8'>
          {location.children.map(child => (
            <div key={child.id}>
              {Object.keys(child).indexOf('status') === -1 ? (
                <Location location={child} />
              ) : (
                <Asset asset={child} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
