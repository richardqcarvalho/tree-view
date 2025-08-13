import type { StoreT } from '@/types/store'
import { create } from 'zustand'

const useStore = create<StoreT>(set => ({
  companyId: '',
  setCompanyId: (id: string) => set({ companyId: id }),
}))

export default useStore
