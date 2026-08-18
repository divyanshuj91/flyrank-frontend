import { NavLink } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <span className="header-brand">FlyRank</span>

      <nav className="header-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `header-nav-link${isActive ? ' active' : ''}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `header-nav-link${isActive ? ' active' : ''}`
          }
        >
          Favorites
        </NavLink>
      </nav>

      <div className="header-search">
        <input
          id="header-search-input"
          type="text"
          className="header-search-input"
          placeholder="Search movies..."
          aria-label="Search movies"
        />
        <button
          id="header-search-button"
          type="button"
          className="header-search-button"
        >
          Search
        </button>
      </div>
    </header>
  )
}

export default Header
