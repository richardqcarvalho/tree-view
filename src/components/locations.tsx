import { useQuery } from '@tanstack/react-query'
import { getLocations } from '../actions/location'
import useStore from '../store'
import type { LocationT } from '../types/location'

export default function Locations() {
  const { companyId } = useStore()
  const { data: locations, isPending } = useQuery<LocationT[]>({
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
    <div className='flex flex-col'>
      {locations.map(location => (
        <span key={location.id}>{location.name}</span>
      ))}
    </div>
  )
}
