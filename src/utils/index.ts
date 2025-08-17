import type { AssetDataT, StructuredAssetT } from '@/types/asset'
import type { LocationDataT, StructuredLocationT } from '@/types/location'

export function getDepth(
  data: (AssetDataT | LocationDataT)[],
  elementId: string,
  depth: number = 0,
) {
  const element = data.find(element => element.id === elementId)

  if (element.parentId) return getDepth(data, element.parentId, depth + 1)
  else return depth
}

export function returnMatches(
  data: (StructuredAssetT | StructuredLocationT)[],
  searchTerm: string,
  energySensor: boolean,
  critical: boolean,
) {
  const cleaned: (StructuredAssetT | StructuredLocationT)[] = data.map(
    element => ({
      ...element,
      ...(element.children && {
        children: returnMatches(
          element.children,
          searchTerm,
          energySensor,
          critical,
        ),
      }),
    }),
  )

  return cleaned.filter(element => {
    let matches = false
    const nameMatches = element.name
      .toUpperCase()
      .includes(searchTerm.toUpperCase())
    const hasChildren = element.children && element.children.length > 0

    if (energySensor || critical) {
      matches = nameMatches

      if (energySensor)
        matches =
          matches && (element as StructuredAssetT).sensorType === 'energy'

      if (critical)
        matches = matches && (element as StructuredAssetT).status === 'alert'

      return matches || hasChildren
    }

    return nameMatches || hasChildren
  })
}

export function getComponentById(
  data: (StructuredAssetT | StructuredLocationT)[],
  id: string,
): StructuredAssetT {
  for (const element of data) {
    if (element.id === id) return element
    else if (element.children) {
      const child = getComponentById(element.children, id)

      if (child) return child
    }
  }

  return undefined
}
