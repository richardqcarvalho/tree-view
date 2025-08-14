import type { StructuredAssetT } from '@/types/asset'
import type { StructuredLocationT } from '@/types/location'

export type CompanyStoreT = {
  companyId: string
  setCompanyId: (id: string) => void
}

export type ElementStoreT = {
  elements: (StructuredAssetT | StructuredLocationT)[]
  setElements: (elements: (StructuredAssetT | StructuredLocationT)[]) => void
}
