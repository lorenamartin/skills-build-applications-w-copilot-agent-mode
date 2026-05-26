import ResourcePage from './ResourcePage.jsx'

const CODESPACE_API_URL = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
const LOCAL_API_URL = 'http://localhost:8000/api/activities'
const API_URL = import.meta.env.VITE_CODESPACE_NAME ? CODESPACE_API_URL : LOCAL_API_URL

export default function Activities() {
  return (
    <ResourcePage
      title="Activities"
      resourceKey="activities"
      apiEndpoint={API_URL}
      description="Fetch workouts, durations, calories burned, and activity timestamps from the logic tier."
    />
  )
}
