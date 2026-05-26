import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME?.trim()
const isCodespaceEnabled = Boolean(CODESPACE_NAME)
const apiBaseUrl = isCodespaceEnabled
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function Home() {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h1 className="card-title">OctoFit Tracker</h1>
        <p className="card-text">
          This presentation tier consumes the backend logic tier via React Router and Vite environment variables.
        </p>
        <p className="small text-muted mb-2">
          {isCodespaceEnabled ? (
            <>Using Codespaces API host: <code>{apiBaseUrl}</code></>
          ) : (
            <>Using localhost fallback: <code>{apiBaseUrl}</code>. Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code>.</>
          )}
        </p>
        <p className="mb-0">
          Navigate to the resources below to fetch data from the backend via the configured endpoint.
        </p>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <div>
            <h1 className="h3 mb-1">OctoFit Tracker</h1>
            <p className="text-muted mb-0">
              React 19 frontend with Codespaces-aware API routing and a safe localhost fallback.
            </p>
          </div>
        </div>
      </header>

      <nav className="nav nav-pills mb-4 flex-column flex-sm-row gap-2">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : 'text-white-50'}`}>
          Home
        </NavLink>
        <NavLink to="/activities" className={({ isActive }) => `nav-link ${isActive ? 'active' : 'text-white-50'}`}>
          Activities
        </NavLink>
        <NavLink to="/leaderboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : 'text-white-50'}`}>
          Leaderboard
        </NavLink>
        <NavLink to="/teams" className={({ isActive }) => `nav-link ${isActive ? 'active' : 'text-white-50'}`}>
          Teams
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => `nav-link ${isActive ? 'active' : 'text-white-50'}`}>
          Users
        </NavLink>
        <NavLink to="/workouts" className={({ isActive }) => `nav-link ${isActive ? 'active' : 'text-white-50'}`}>
          Workouts
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  )
}

export default App
