import type { LocationDataT, StructuredLocationT } from '@/types/location'

export async function getLocations(companyId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/companies/${companyId}/locations`,
  )
  const data: LocationDataT[] = await response.json()

  function getDepth(locationId: string, depth: number = 0) {
    const location = data.find(location => location.id === locationId)
    if (location.parentId) return getDepth(location.parentId, depth + 1)
    else return depth
  }

  const depthData: StructuredLocationT[] = data.map(location => ({
    ...location,
    depth: getDepth(location.id),
  }))
  const dataSortedByDepth = depthData.toSorted(
    (locationA, locationB) => locationB.depth - locationA.depth,
  )

  dataSortedByDepth.forEach(location => {
    if (location.parentId) {
      const parentLocation: StructuredLocationT = depthData.find(
        ({ id }) => id === location.parentId,
      )
      if (parentLocation.children) parentLocation.children.push(location)
      else parentLocation.children = [location]

      depthData.splice(depthData.indexOf(parentLocation), 1, parentLocation)
      depthData.splice(depthData.indexOf(location), 1)
    }
  })

  return depthData
}
