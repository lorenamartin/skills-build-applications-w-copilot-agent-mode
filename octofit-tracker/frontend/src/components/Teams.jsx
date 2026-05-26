import ResourcePage from './ResourcePage.jsx'

const CODESPACE_API_URL = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
const LOCAL_API_URL = 'http://localhost:8000/api/teams'
const API_URL = import.meta.env.VITE_CODESPACE_NAME ? CODESPACE_API_URL : LOCAL_API_URL

export default function Teams() {
  return (
    <ResourcePage
      title="Teams"
      resourceKey="teams"
      apiEndpoint={API_URL}
      description="Load team rosters, scores, and membership details from the API."
    />
  )
}
