import { useCheckboxStore, useElementStore } from '@/store'
import type { StructuredAssetT } from '@/types/asset'
import type { StructuredLocationT } from '@/types/location'
import { useEffect, useState } from 'react'

function returnMatches(
  data: (StructuredAssetT | StructuredLocationT)[],
  searchTerm: string,
  energySensor: boolean,
  critical: boolean,
) {
  const cleaned: (StructuredAssetT | StructuredLocationT)[] = data.map(
    element => ({
      ...element,
      ...(element.children && {
        children: returnMatches(
          element.children,
          searchTerm,
          energySensor,
          critical,
        ),
      }),
    }),
  )

  return cleaned.filter(element => {
    let matches = false
    const nameMatches = element.name
      .toUpperCase()
      .includes(searchTerm.toUpperCase())
    const hasChildren = element.children && element.children.length > 0

    if (energySensor || critical) {
      matches = nameMatches

      if (energySensor)
        matches =
          matches && (element as StructuredAssetT).sensorType === 'energy'

      if (critical)
        matches = matches && (element as StructuredAssetT).status === 'alert'

      return matches || hasChildren
    }

    return nameMatches || hasChildren
  })
}

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
