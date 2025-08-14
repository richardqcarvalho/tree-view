import CompanySelect from '@/components/company-select'
import Elements from '@/components/elements'
import TractianLogo from '@/images/logo.svg?react'
import { Outlet } from 'react-router'

export default function Home() {
  return (
    <div className='flex h-full flex-col'>
      <div className='bg-header flex flex-row items-center justify-between p-4'>
        <TractianLogo className='h-4 text-white' />
        <div className='flex items-center gap-2'>
          <span className='text-white'>Unit:</span>
          <CompanySelect />
        </div>
      </div>
      <div className='flex overflow-auto'>
        <Elements />
        <Outlet />
      </div>
    </div>
  )
}
