import { useElementStore } from '@/store'
import type { StructuredAssetT } from '@/types/asset'
import type { StructuredLocationT } from '@/types/location'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function Component() {
  const navigate = useNavigate()
  const { componentId } = useParams()
  const { elements } = useElementStore()

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

  const component: StructuredAssetT = getComponentById(elements, componentId)

  useEffect(() => {
    if (!component) navigate('/')
  }, [elements])

  if (!component) return

  return (
    <div className='m-2 flex flex-1 flex-col overflow-auto border border-zinc-300 p-4'>
      <span>{component.name}</span>
      {component.status && <span>{component.status}</span>}
      {component.sensorType && <span>{component.sensorType}</span>}
      {component.sensorId && <span>{component.sensorId}</span>}
    </div>
  )
}
