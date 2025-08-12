export async function getCompanies() {
  const response = await fetch('https://fake-api.tractian.com/companies')
  const data = await response.json()

  return data
}
