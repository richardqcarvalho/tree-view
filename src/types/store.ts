import type { StructuredAssetT } from '@/types/asset'
import type { StructuredLocationT } from '@/types/location'

export type CompanyStoreT = {
  companyId: string
  setCompanyId: (id: string) => void
}

export type ElementStoreT = {
  elements: (StructuredAssetT | StructuredLocationT)[]
  filteredElements: (StructuredAssetT | StructuredLocationT)[]
  setElements: (elements: (StructuredAssetT | StructuredLocationT)[]) => void
  setFilteredElements: (
    elements: (StructuredAssetT | StructuredLocationT)[],
  ) => void
}

export type CheckboxStoreT = {
  'energy-sensor': boolean
  critical: boolean
  setCheckbox: (checkbox: 'energy-sensor' | 'critical', value: boolean) => void
}
