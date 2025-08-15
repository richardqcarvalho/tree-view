import type {
  CheckboxStoreT,
  CompanyStoreT,
  ElementStoreT,
} from '@/types/store'
import { create } from 'zustand'

export const useCompanyStore = create<CompanyStoreT>(set => ({
  companyId: '',
  setCompanyId: id => set({ companyId: id }),
}))

export const useElementStore = create<ElementStoreT>(set => ({
  elements: [],
  filteredElements: [],
  setElements: elements => set({ elements }),
  setFilteredElements: elements => set({ filteredElements: elements }),
}))

export const useCheckboxStore = create<CheckboxStoreT>(set => ({
  'energy-sensor': false,
  critical: false,
  setCheckbox: (checkbox, value) => set({ [checkbox]: value }),
}))
