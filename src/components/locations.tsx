import { getLocations } from '@/actions/location'
import Location from '@/components/location'
import { useCompanyStore } from '@/store'
import type { StructuredLocationT } from '@/types/location'
import { useQuery } from '@tanstack/react-query'

export default function Locations() {
  const { companyId } = useCompanyStore()
  const { data: locations, isPending } = useQuery<StructuredLocationT[]>({
    queryKey: ['get-locations', companyId],
    queryFn: () => getLocations(companyId),
    enabled: companyId !== '',
  })

  if (isPending)
    return (
      <div>
        <span>Loading locations...</span>
      </div>
    )

  return (
    <div className='flex flex-col p-4'>
      {locations.map(location => (
        <Location
          key={location.id}
          location={location}
        />
      ))}
    </div>
  )
}
