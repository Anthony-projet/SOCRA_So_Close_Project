import { useState, useEffect } from 'react'

const GardenMap = ({ gardens, selectedGarden, setSelectedGarden }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 48.8566, lng: 2.3522 }) // Centre de Paris
  const [zoom, setZoom] = useState(12)

  // Simuler une carte interactive avec une grille de jardins
  const GardenMarker = ({ garden, isSelected, onClick }) => {
    const getStatusColor = () => {
      if (garden.availablePlots === 0) return '#ef4444' // Rouge
      if (garden.availablePlots <= 3) return '#f59e0b' // Orange
      return '#22c55e' // Vert
    }

    return (
      <div
        className={`garden-marker ${isSelected ? 'selected' : ''}`}
        style={{
          left: `${((garden.coordinates.lng - 2.2) / 0.4) * 100}%`,
          top: `${((48.9 - garden.coordinates.lat) / 0.2) * 100}%`,
          backgroundColor: getStatusColor()
        }}
        onClick={() => onClick(garden)}
        title={garden.name}
      >
        <div className="marker-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
        {isSelected && (
          <div className="marker-popup">
            <div className="popup-content">
              <h4>{garden.name}</h4>
              <p>{garden.district}</p>
              <div className="popup-info">
                <span className="price">{garden.pricePerMonth}€/mois</span>
                <span className="availability">
                  {garden.availablePlots} disponible{garden.availablePlots > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const MapControls = () => (
    <div className="map-controls">
      <button
        className="map-control-btn"
        onClick={() => setZoom(Math.min(zoom + 1, 18))}
        title="Zoomer"
      >
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      </button>
      <button
        className="map-control-btn"
        onClick={() => setZoom(Math.max(zoom - 1, 8))}
        title="Dézoomer"
      >
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      </button>
      <button
        className="map-control-btn"
        onClick={() => {
          setMapCenter({ lat: 48.8566, lng: 2.3522 })
          setZoom(12)
        }}
        title="Recentrer sur Paris"
      >
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  )

  const MapLegend = () => (
    <div className="map-legend">
      <h4>Légende</h4>
      <div className="legend-items">
        <div className="legend-item">
          <div className="legend-marker available"></div>
          <span>Disponible (4+ parcelles)</span>
        </div>
        <div className="legend-item">
          <div className="legend-marker limited"></div>
          <span>Peu disponible (1-3 parcelles)</span>
        </div>
        <div className="legend-item">
          <div className="legend-marker full"></div>
          <span>Complet</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="garden-map-container">
      <div className="container">
        <div className="map-header">
          <h2>Carte des jardins partagés</h2>
          <p>{gardens.length} jardin{gardens.length > 1 ? 's' : ''} dans Paris</p>
        </div>

        <div className="map-wrapper">
          {/* Carte simulée */}
          <div className="map-container" style={{ transform: `scale(${zoom / 12})` }}>
            <div className="map-background">
              {/* Grille de fond simulant les rues de Paris */}
              <div className="map-grid">
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={`h${i}`} className="grid-line horizontal" style={{ top: `${i * 10}%` }} />
                ))}
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={`v${i}`} className="grid-line vertical" style={{ left: `${i * 10}%` }} />
                ))}
              </div>

              {/* Zones d'arrondissements simulées */}
              <div className="districts">
                <div className="district district-4" style={{ left: '45%', top: '45%' }}>4e</div>
                <div className="district district-5" style={{ left: '50%', top: '55%' }}>5e</div>
                <div className="district district-11" style={{ left: '60%', top: '50%' }}>11e</div>
                <div className="district district-12" style={{ left: '65%', top: '60%' }}>12e</div>
                <div className="district district-17" style={{ left: '25%', top: '25%' }}>17e</div>
                <div className="district district-18" style={{ left: '35%', top: '15%' }}>18e</div>
                <div className="district district-20" style={{ left: '70%', top: '30%' }}>20e</div>
              </div>

              {/* Marqueurs des jardins */}
              {gardens.map((garden) => (
                <GardenMarker
                  key={garden.id}
                  garden={garden}
                  isSelected={selectedGarden?.id === garden.id}
                  onClick={setSelectedGarden}
                />
              ))}
            </div>
          </div>

          {/* Contrôles de la carte */}
          <MapControls />

          {/* Légende */}
          <MapLegend />

          {/* Détails du jardin sélectionné */}
          {selectedGarden && (
            <div className="map-sidebar">
              <div className="sidebar-header">
                <h3>{selectedGarden.name}</h3>
                <button
                  onClick={() => setSelectedGarden(null)}
                  className="close-sidebar"
                  aria-label="Fermer"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="sidebar-content">
                <img
                  src={selectedGarden.image}
                  alt={selectedGarden.name}
                  className="sidebar-image"
                />

                <div className="sidebar-info">
                  <div className="info-row">
                    <svg className="info-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{selectedGarden.address}</span>
                  </div>

                  <div className="info-row">
                    <svg className="info-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-1.092a4.535 4.535 0 001.676-.662C13.398 12.766 14 11.991 14 11c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 8.092V6.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V4z" clipRule="evenodd" />
                    </svg>
                    <span>{selectedGarden.pricePerMonth}€/mois</span>
                  </div>

                  <div className="info-row">
                    <svg className="info-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                    <span>{selectedGarden.availablePlots}/{selectedGarden.totalPlots} parcelles disponibles</span>
                  </div>

                  <div className="rating-row">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`star ${i < Math.floor(selectedGarden.rating) ? 'filled' : ''}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span>{selectedGarden.rating} ({selectedGarden.reviews} avis)</span>
                  </div>
                </div>

                <div className="sidebar-description">
                  <p>{selectedGarden.description}</p>
                </div>

                <div className="sidebar-features">
                  {selectedGarden.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="sidebar-actions">
                  <button className="btn btn-primary btn-sm">
                    Voir les détails
                  </button>
                  <button className="btn btn-secondary btn-sm">
                    Contacter
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Instructions d'utilisation */}
        <div className="map-instructions">
          <p>
            <strong>💡 Astuce :</strong> Cliquez sur les marqueurs pour voir les détails des jardins.
            Les couleurs indiquent la disponibilité : vert (disponible), orange (peu disponible), rouge (complet).
          </p>
        </div>
      </div>
    </div>
  )
}

export default GardenMap