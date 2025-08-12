import { create } from 'zustand'
import type { StoreT } from '../types'

const useStore = create<StoreT>(set => ({
  companyId: '',
  setCompanyId: (id: string) => set({ companyId: id }),
}))

export default useStore
