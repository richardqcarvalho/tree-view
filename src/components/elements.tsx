import { getElements } from '@/actions/element'
import Asset from '@/components/asset'
import Location from '@/components/location'
import { useCompanyStore, useElementStore } from '@/store'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export default function Elements() {
  const { companyId } = useCompanyStore()
  const { filteredElements, setElements } = useElementStore()
  const {
    data: elements,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ['get-elements', companyId],
    queryFn: () => getElements(companyId),
    enabled: companyId !== '',
  })

  useEffect(() => {
    if (isSuccess) setElements(elements)
  }, [elements])

  if (isPending)
    return (
      <div className='m-2 flex flex-col gap-2 overflow-auto border border-zinc-300 p-4'>
        <div className='h-6 w-72 animate-pulse rounded-sm bg-zinc-300' />
        <div className='h-6 w-72 animate-pulse rounded-sm bg-zinc-300' />
        <div className='h-6 w-72 animate-pulse rounded-sm bg-zinc-300' />
        <div className='h-6 w-72 animate-pulse rounded-sm bg-zinc-300' />
        <div className='h-6 w-72 animate-pulse rounded-sm bg-zinc-300' />
        <div className='h-6 w-72 animate-pulse rounded-sm bg-zinc-300' />
        <div className='h-6 w-72 animate-pulse rounded-sm bg-zinc-300' />
        <div className='h-6 w-72 animate-pulse rounded-sm bg-zinc-300' />
        <div className='h-6 w-72 animate-pulse rounded-sm bg-zinc-300' />
        <div className='h-6 w-72 animate-pulse rounded-sm bg-zinc-300' />
        <div className='h-6 w-72 animate-pulse rounded-sm bg-zinc-300' />
        <div className='h-6 w-72 animate-pulse rounded-sm bg-zinc-300' />
      </div>
    )

  return (
    <div className='m-2 flex flex-col overflow-auto border border-zinc-300 p-4'>
      {filteredElements.map(element => (
        <div key={element.id}>
          {Object.keys(element).indexOf('status') === -1 ? (
            <Location location={element} />
          ) : (
            <Asset asset={element} />
          )}
        </div>
      ))}
    </div>
  )
}
