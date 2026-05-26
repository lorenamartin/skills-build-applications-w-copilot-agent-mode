import ResourcePage from './ResourcePage.jsx'

const CODESPACE_API_URL = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
const LOCAL_API_URL = 'http://localhost:8000/api/workouts'
const API_URL = import.meta.env.VITE_CODESPACE_NAME ? CODESPACE_API_URL : LOCAL_API_URL

export default function Workouts() {
  return (
    <ResourcePage
      title="Workouts"
      resourceKey="workouts"
      apiEndpoint={API_URL}
      description="Fetch workout plans, difficulty, duration, and focus area from the API."
    />
  )
}
