import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import HomeView from './pages/home/HomeView'
import AuthView from './pages/auth/AuthView'
import './App.css'

const FavoritesPlaceholder = () => (
  <div style={{ textAlign: 'center', padding: '64px 24px', color: 'var(--color-text-muted)' }}>
    <h2 style={{ color: 'var(--color-text-heading)', marginBottom: '8px' }}>Favorites</h2>
    <p>Your saved favorites will appear here.</p>
  </div>
)

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/auth" element={<AuthView />} />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPlaceholder />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  )
}

export default App
