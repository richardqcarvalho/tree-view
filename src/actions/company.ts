export async function getCompanies() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/companies`)
  const data = await response.json()

  return data
}
