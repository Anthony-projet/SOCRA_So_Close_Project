import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

const Header = ({ 
  searchTerm, 
  setSearchTerm, 
  viewMode, 
  setViewMode, 
  gardensCount 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo et titre */}
          <div className="brand">
            <div className="logo">
              <svg viewBox="0 0 24 24" fill="none" className="logo-icon">
                <path 
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="brand-text">
              <h1 className="brand-title">So-Close</h1>
              <p className="brand-subtitle">Jardins partagés parisiens</p>
            </div>
          </div>

          {/* Barre de recherche */}
          <div className="search-section">
            <div className="search-container">
              <svg className="search-icon" viewBox="0 0 20 20" fill="currentColor">
                <path 
                  fillRule="evenodd" 
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                  clipRule="evenodd" 
                />
              </svg>
              <input
                type="text"
                placeholder="Rechercher un jardin, un quartier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="clear-search"
                  aria-label="Effacer la recherche"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path 
                      fillRule="evenodd" 
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </button>
              )}
            </div>
            <div className="results-count">
              {gardensCount} jardin{gardensCount > 1 ? 's' : ''} trouvé{gardensCount > 1 ? 's' : ''}
            </div>
          </div>

          {/* Actions et navigation */}
          <div className="header-actions">
            {/* Sélecteur de vue */}
            <div className="view-selector">
              <button
                onClick={() => setViewMode('list')}
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                aria-label="Vue liste"
                title="Vue liste"
              >
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
                <span className="view-label">Liste</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`view-btn ${viewMode === 'map' ? 'active' : ''}`}
                aria-label="Vue carte"
                title="Vue carte"
              >
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path 
                    fillRule="evenodd" 
                    d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <span className="view-label">Carte</span>
              </button>
            </div>

            {/* Toggle thème */}
            <ThemeToggle />

            {/* Menu burger mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-toggle"
              aria-label="Menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-search">
              <div className="search-container">
                <svg className="search-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path 
                    fillRule="evenodd" 
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
            <div className="mobile-view-selector">
              <button
                onClick={() => {
                  setViewMode('list')
                  setIsMenuOpen(false)
                }}
                className={`mobile-view-btn ${viewMode === 'list' ? 'active' : ''}`}
              >
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
                Vue Liste
              </button>
              <button
                onClick={() => {
                  setViewMode('map')
                  setIsMenuOpen(false)
                }}
                className={`mobile-view-btn ${viewMode === 'map' ? 'active' : ''}`}
              >
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path 
                    fillRule="evenodd" 
                    d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" 
                    clipRule="evenodd" 
                  />
                </svg>
                Vue Carte
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header