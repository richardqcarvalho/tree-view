import type { StoreT } from '@/types/store'
import { create } from 'zustand'

const useCompanyStore = create<StoreT>(set => ({
  companyId: '',
  setCompanyId: (id: string) => set({ companyId: id }),
}))

export { useCompanyStore }
