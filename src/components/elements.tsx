import { getElements } from '@/actions/element'
import Asset from '@/components/asset'
import Location from '@/components/location'
import { useCompanyStore, useElementStore } from '@/store'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export default function Elements() {
  const { companyId } = useCompanyStore()
  const { setElements } = useElementStore()
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
      <div>
        <span>Loading elements...</span>
      </div>
    )

  return (
    <div className='flex flex-col p-4'>
      {elements.map(location => (
        <div key={location.id}>
          {Object.keys(location).indexOf('status') === -1 ? (
            <Location location={location} />
          ) : (
            <Asset asset={location} />
          )}
        </div>
      ))}
    </div>
  )
}
