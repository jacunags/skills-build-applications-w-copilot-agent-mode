import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const pages = [
  { path: '/activities', label: 'Activities', element: <Activities /> },
  { path: '/leaderboard', label: 'Leaderboard', element: <Leaderboard /> },
  { path: '/teams', label: 'Teams', element: <Teams /> },
  { path: '/users', label: 'Users', element: <Users /> },
  { path: '/workouts', label: 'Workouts', element: <Workouts /> },
]

function Home() {
  return (
    <section className="text-center py-5">
      <h1 className="display-5 fw-semibold">Octofit Tracker</h1>
      <p className="lead text-secondary">Track activity, teams, and fitness progress.</p>
      <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
        {pages.map(({ path, label }) => (
          <NavLink className="btn btn-outline-primary" key={path} to={path}>
            Browse {label}
          </NavLink>
        ))}
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <header className="navbar navbar-expand bg-white border-bottom">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">Octofit Tracker</NavLink>
          <nav className="navbar-nav flex-row flex-wrap gap-2" aria-label="Main navigation">
            {pages.map(({ path, label }) => (
              <NavLink
                className={({ isActive }) => `nav-link px-2${isActive ? ' active fw-semibold' : ''}`}
                key={path}
                to={path}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container py-4">
        <Routes>
          <Route element={<Home />} path="/" />
          {pages.map(({ path, element }) => (
            <Route element={element} key={path} path={path} />
          ))}
          <Route element={<Navigate replace to="/" />} path="*" />
        </Routes>
      </main>
    </div>
  )
}

export default App
