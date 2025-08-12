export async function getLocations(companyId: string) {
  const response = await fetch(
    `https://fake-api.tractian.com/companies/${companyId}/locations`,
  )
  const data = await response.json()

  return data
}
