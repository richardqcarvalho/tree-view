import { getCompanies } from '@/actions/company'
import { useCompanyStore } from '@/store'
import type { CompanyT } from '@/types/company'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export default function CompanySelect() {
  const {
    data: companies,
    isPending,
    isSuccess,
  } = useQuery<CompanyT[]>({
    queryKey: ['get-companies'],
    queryFn: getCompanies,
  })
  const { companyId, setCompanyId } = useCompanyStore()

  useEffect(() => {
    if (isSuccess && companyId === '') setCompanyId(companies[0].id)
  }, [companies])

  if (isPending)
    return (
      <select
        className='bg-select flex animate-pulse items-center justify-center rounded-sm p-1 text-white'
        disabled
      >
        <option>Loading companies...</option>
      </select>
    )

  return (
    <select
      onChange={e => setCompanyId(e.target.value)}
      className='bg-select flex items-center justify-center rounded-sm p-1 text-white'
    >
      {companies.map(company => (
        <option
          key={company.id}
          value={company.id}
        >
          {company.name}
        </option>
      ))}
    </select>
  )
}
