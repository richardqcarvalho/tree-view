export async function getAssets(companyId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/companies/${companyId}/assets`,
  )
  const data = await response.json()

  return data
}
