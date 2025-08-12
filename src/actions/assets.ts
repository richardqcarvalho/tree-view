export async function getAssets(companyId: string) {
  const response = await fetch(
    `https://fake-api.tractian.com/companies/${companyId}/assets`,
  )
  const data = await response.json()

  return data
}
