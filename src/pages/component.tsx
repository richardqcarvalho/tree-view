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
    <div className='flex flex-col p-5'>
      <span>{component.name}</span>
      <span>{component.status}</span>
      <span>{component.sensorType}</span>
      <span>{component.sensorId}</span>
    </div>
  )
}
