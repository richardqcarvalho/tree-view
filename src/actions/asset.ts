import type { AssetDataT, StructuredAssetT } from '@/types/asset'

export async function getAssets(companyId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/companies/${companyId}/assets`,
  )
  const data: AssetDataT[] = await response.json()

  function getDepth(assetId: string, depth: number = 0) {
    const asset = data.find(asset => asset.id === assetId)
    if (asset.parentId) return getDepth(asset.parentId, depth + 1)
    else return depth
  }

  const depthData: StructuredAssetT[] = data.map(asset => ({
    ...asset,
    depth: getDepth(asset.id),
  }))
  const dataSortedByDepth = depthData.toSorted(
    (assetA, assetB) => assetB.depth - assetA.depth,
  )

  dataSortedByDepth.forEach(asset => {
    if (asset.parentId) {
      const parentAsset: StructuredAssetT = depthData.find(
        ({ id }) => id === asset.parentId,
      )
      if (parentAsset.children) parentAsset.children.push(asset)
      else parentAsset.children = [asset]

      depthData.splice(depthData.indexOf(parentAsset), 1, parentAsset)
      depthData.splice(depthData.indexOf(asset), 1)
    }
  })

  return depthData
}
