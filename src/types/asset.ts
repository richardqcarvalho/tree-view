export type AssetDataT = {
  id: string
  name: string
  parentId?: string
  sensorId?: string
  sensorType?: string
  status?: string
  gatewayId?: string
  locationId?: string
}

export type StructuredAssetT = AssetDataT & {
  children?: StructuredAssetT[]
  depth: number
}

export type AssetPropsT = {
  asset: StructuredAssetT
}
