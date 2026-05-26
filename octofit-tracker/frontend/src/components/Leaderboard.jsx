import ResourcePage from './ResourcePage.jsx'

const CODESPACE_API_URL = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
const LOCAL_API_URL = 'http://localhost:8000/api/leaderboard'
const API_URL = import.meta.env.VITE_CODESPACE_NAME ? CODESPACE_API_URL : LOCAL_API_URL

export default function Leaderboard() {
  return (
    <ResourcePage
      title="Leaderboard"
      resourceKey="leaderboard"
      apiEndpoint={API_URL}
      description="Show teams ranked by score and rewards from the backend leaderboard API."
    />
  )
}
