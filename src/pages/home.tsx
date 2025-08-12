import Assets from '../components/assets'
import CompanySelect from '../components/company-select'
import Locations from '../components/locations'

export default function Home() {
  return (
    <div className='flex h-full flex-col'>
      <div className='bg-header flex flex-row justify-end p-3'>
        <CompanySelect />
      </div>
      <div className='flex flex-col overflow-auto'>
        <Locations />
        <Assets />
      </div>
    </div>
  )
}
