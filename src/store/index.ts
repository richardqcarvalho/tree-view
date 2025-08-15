import type { CompanyStoreT, ElementStoreT } from '@/types/store'
import { create } from 'zustand'

const useCompanyStore = create<CompanyStoreT>(set => ({
  companyId: '',
  setCompanyId: id => set({ companyId: id }),
}))

const useElementStore = create<ElementStoreT>(set => ({
  elements: [],
  filteredElements: [],
  setElements: elements => set({ elements }),
  setFilteredElements: elements => set({ filteredElements: elements }),
}))

export { useCompanyStore, useElementStore }
