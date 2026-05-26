import ResourcePage from './ResourcePage.jsx'

const CODESPACE_API_URL = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`
const LOCAL_API_URL = 'http://localhost:8000/api/users'
const API_URL = import.meta.env.VITE_CODESPACE_NAME ? CODESPACE_API_URL : LOCAL_API_URL

export default function Users() {
  return (
    <ResourcePage
      title="Users"
      resourceKey="users"
      apiEndpoint={API_URL}
      description="Fetch user profiles, roles, and team setup from the backend users API."
    />
  )
}
