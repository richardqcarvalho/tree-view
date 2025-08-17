import type { AssetDataT, StructuredAssetT } from '@/types/asset'
import type { LocationDataT, StructuredLocationT } from '@/types/location'
import { getDepth } from '@/utils'

export async function getElements(companyId: string) {
  const aResponse = await fetch(
    `${import.meta.env.VITE_API_URL}/companies/${companyId}/assets`,
  )
  const aData: AssetDataT[] = await aResponse.json()
  const aDepthData: StructuredAssetT[] = aData.map(asset => ({
    ...asset,
    depth: getDepth(aData, asset.id),
  }))
  const aDataSortedByDepth = aDepthData.toSorted(
    (assetA, assetB) => assetB.depth - assetA.depth,
  )

  aDataSortedByDepth.forEach(asset => {
    if (asset.parentId) {
      const parentAsset: StructuredAssetT = aDepthData.find(
        ({ id }) => id === asset.parentId,
      )

      if (parentAsset.children) parentAsset.children.push(asset)
      else parentAsset.children = [asset]

      aDepthData.splice(aDepthData.indexOf(parentAsset), 1, parentAsset)
      aDepthData.splice(aDepthData.indexOf(asset), 1)
    }
  })

  const lResponse = await fetch(
    `${import.meta.env.VITE_API_URL}/companies/${companyId}/locations`,
  )
  const lData: LocationDataT[] = await lResponse.json()
  const lDepthData: (StructuredLocationT | StructuredAssetT)[] = lData.map(
    location => ({
      ...location,
      depth: getDepth(lData, location.id),
    }),
  )
  const lDataSortedByDepth = lDepthData.toSorted(
    (locationA, locationB) => locationB.depth - locationA.depth,
  )

  aDepthData.forEach(asset => {
    if (asset.locationId) {
      const parentLocation: StructuredLocationT = lDepthData.find(
        ({ id }) => id === asset.locationId,
      )

      if (parentLocation.children) parentLocation.children.push(asset)
      else parentLocation.children = [asset]
    } else lDepthData.push(asset)
  })

  lDataSortedByDepth.forEach(location => {
    if (location.parentId) {
      const parentLocation: StructuredLocationT = lDepthData.find(
        ({ id }) => id === location.parentId,
      )

      if (parentLocation.children) parentLocation.children.push(location)
      else parentLocation.children = [location]

      lDepthData.splice(lDepthData.indexOf(parentLocation), 1, parentLocation)
      lDepthData.splice(lDepthData.indexOf(location), 1)
    }
  })

  return lDepthData
}
