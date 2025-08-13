export type LocationDataT = {
  id: string
  name: string
  parentId?: string
}

export type StructuredLocationT = LocationDataT & {
  children?: StructuredLocationT[]
  depth: number
}

export type LocationPropsT = {
  location: StructuredLocationT
}
