import EnergySvg from '@/images/energy.svg?react'
import VibrationSvg from '@/images/vibration.svg?react'
import { useElementStore } from '@/store'
import type { StructuredAssetT } from '@/types/asset'
import type { StructuredLocationT } from '@/types/location'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function Component() {
  const navigate = useNavigate()
  const { componentId } = useParams()
  const { filteredElements } = useElementStore()

  function getComponentById(
    data: (StructuredAssetT | StructuredLocationT)[],
    id: string,
  ): StructuredAssetT {
    for (const element of data) {
      if (element.id === id) return element
      else if (element.children) {
        const child = getComponentById(element.children, componentId)

        if (child) return child
      }
    }

    return undefined
  }

  const component: StructuredAssetT = getComponentById(
    filteredElements,
    componentId,
  )

  useEffect(() => {
    if (!component) navigate('/')
  }, [filteredElements])

  if (!component) return

  const statusClassName = clsx([
    'w-2',
    component.status === 'alert' ? 'text-alert!' : 'text-operating!',
  ])

  return (
    <div className='flex flex-1 flex-col gap-2 overflow-auto border border-zinc-300 p-4'>
      <div className='flex gap-2'>
        <span className='text-xl font-bold uppercase'>{component.name}</span>
        {component.status && (
          <>
            {component.sensorType === 'energy' ? (
              <EnergySvg className={statusClassName} />
            ) : (
              <VibrationSvg className={statusClassName} />
            )}
          </>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        {component.sensorType && (
          <div className='flex flex-col'>
            <span className='font-bold'>Equipment type</span>
            <span className='first-letter:uppercase'>
              {component.sensorType}
            </span>
          </div>
        )}
        {component.sensorId && (
          <div className='flex flex-col'>
            <span className='font-bold'>Sensor</span>
            <span>{component.sensorId}</span>
          </div>
        )}
      </div>
    </div>
  )
}
