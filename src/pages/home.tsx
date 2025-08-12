import Assets from '../components/assets'
import CompanySelect from '../components/company-select'
import Locations from '../components/locations'
import tractianLogo from '../images/logo.svg'

export default function Home() {
  return (
    <div className='flex h-full flex-col'>
      <div className='bg-header flex flex-row items-center justify-between p-4'>
        <img
          src={tractianLogo}
          className='h-4'
        />
        <div className='flex items-center gap-2'>
          <span className='text-white'>Unit:</span>
          <CompanySelect />
        </div>
      </div>
      <div className='flex flex-col overflow-auto'>
        <Locations />
        <Assets />
      </div>
    </div>
  )
}
