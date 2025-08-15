import { useElementStore } from '@/store'
import type { StructuredAssetT } from '@/types/asset'
import type { StructuredLocationT } from '@/types/location'
import { useEffect, useState } from 'react'

function returnMatches(
  data: (StructuredAssetT | StructuredLocationT)[],
  searchTerm: string,
) {
  const cleaned: (StructuredAssetT | StructuredLocationT)[] = data.map(
    element => ({
      ...element,
      ...(element.children && {
        children: returnMatches(element.children, searchTerm),
      }),
    }),
  )

  return cleaned.filter(
    element =>
      element.name.toUpperCase().includes(searchTerm.toUpperCase()) ||
      (element.children && element.children.length > 0),
  )
}

export default function SearchInput() {
  const { elements, setFilteredElements } = useElementStore()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const filteredElements = returnMatches(elements, searchTerm)

    setFilteredElements(filteredElements)
  }, [elements, searchTerm])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value)
  }

  return (
    <input
      className='mt-2 mr-2 ml-2 flex border border-zinc-300 px-4 py-2 outline-none'
      placeholder='Search for asset or location'
      onChange={handleChange}
      value={searchTerm}
    />
  )
}
