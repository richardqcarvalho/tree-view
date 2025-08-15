import Checkbox from '@/components/checkbox'
import CompanySelect from '@/components/company-select'
import Elements from '@/components/elements'
import SearchInput from '@/components/search-input'
import TractianLogo from '@/images/logo.svg?react'
import { Outlet } from 'react-router'

export default function Home() {
  return (
    <div className='flex h-full w-full flex-col'>
      <div className='bg-header flex w-full flex-row items-center justify-between p-4'>
        <TractianLogo className='h-4 text-white' />
        <div className='flex items-center gap-2'>
          <span className='text-white'>Unit:</span>
          <CompanySelect />
        </div>
      </div>
      <div className='flex h-full w-full flex-col gap-4 overflow-hidden p-4'>
        <div className='flex gap-4'>
          <SearchInput />
          <div className='flex gap-4 border border-zinc-300 px-4 py-2'>
            <Checkbox
              id='energy-sensor'
              label='Energy sensor'
            />
            <Checkbox
              id='critical'
              label='Critical'
            />
          </div>
        </div>
        <div className='flex h-full gap-4 overflow-hidden'>
          <Elements />
          <Outlet />
        </div>
      </div>
    </div>
  )
}
