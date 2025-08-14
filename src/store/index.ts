import type { CompanyStoreT, ElementStoreT } from '@/types/store'
import { create } from 'zustand'

const useCompanyStore = create<CompanyStoreT>(set => ({
  companyId: '',
  setCompanyId: id => set({ companyId: id }),
}))

const useElementStore = create<ElementStoreT>(set => ({
  elements: [],
  setElements: elements => set({ elements }),
}))

export { useCompanyStore, useElementStore }
