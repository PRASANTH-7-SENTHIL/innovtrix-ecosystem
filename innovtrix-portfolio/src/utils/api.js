export async function apiFetch(endpoint, options = {}) {
  const envUrl = import.meta.env.VITE_API_URL
  const fallbackUrl = 'https://innovtrix-ecosystem-nine.vercel.app'
  const localUrl = localStorage.getItem('backend_url')

  const urlsToTry = []
  if (localUrl && localUrl.trim() !== '') {
    urlsToTry.push(localUrl.replace(/\/$/, ''))
  }
  if (envUrl && envUrl.trim() !== '' && !urlsToTry.includes(envUrl.replace(/\/$/, ''))) {
    urlsToTry.push(envUrl.replace(/\/$/, ''))
  }
  if (!urlsToTry.includes(fallbackUrl)) {
    urlsToTry.push(fallbackUrl)
  }

  let lastError = null
  for (const baseUrl of urlsToTry) {
    try {
      const cleanEndpoint = endpoint.startsWith('/') ? endpoint : '/' + endpoint
      const url = `${baseUrl}${cleanEndpoint}`
      const response = await fetch(url, options)
      if (response.ok) {
        return response
      }
      lastError = new Error(`HTTP Error ${response.status} from ${url}`)
    } catch (err) {
      lastError = err
    }
  }
  throw lastError || new Error('Backend API is unreachable')
}
