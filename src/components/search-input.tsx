import { useCheckboxStore, useElementStore } from '@/store'
import { returnMatches } from '@/utils'
import { useEffect, useState } from 'react'

export default function SearchInput() {
  const checkboxStore = useCheckboxStore()
  const { elements, setFilteredElements } = useElementStore()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const filteredElements = returnMatches(
      elements,
      searchTerm,
      checkboxStore['energy-sensor'],
      checkboxStore['critical'],
    )

    setFilteredElements(filteredElements)
  }, [
    elements,
    searchTerm,
    checkboxStore['energy-sensor'],
    checkboxStore['critical'],
  ])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value)
  }

  return (
    <input
      className='flex w-full border border-zinc-300 px-4 py-2 outline-none'
      placeholder='Search for asset or location'
      onChange={handleChange}
      value={searchTerm}
    />
  )
}
