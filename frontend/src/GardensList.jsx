import { useState } from 'react'

const GardensList = ({ gardens, selectedGarden, setSelectedGarden }) => {
  const [sortBy, setSortBy] = useState('name') // 'name', 'price', 'rating', 'availability'
  const [filterStatus, setFilterStatus] = useState('all') // 'all', 'available', 'full'

  // Filtrer les jardins par statut
  const filteredGardens = gardens.filter(garden => {
    if (filterStatus === 'available') {
      return garden.availablePlots > 0
    }
    if (filterStatus === 'full') {
      return garden.availablePlots === 0
    }
    return true
  })

  // Trier les jardins
  const sortedGardens = [...filteredGardens].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.pricePerMonth - b.pricePerMonth
      case 'rating':
        return b.rating - a.rating
      case 'availability':
        return b.availablePlots - a.availablePlots
      case 'name':
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const getStatusBadge = (garden) => {
    if (garden.availablePlots === 0) {
      return <span className="badge badge-warning">Complet</span>
    }
    if (garden.availablePlots <= 3) {
      return <span className="badge badge-info">Presque complet</span>
    }
    return <span className="badge badge-success">Disponible</span>
  }

  const getAvailabilityText = (garden) => {
    if (garden.availablePlots === 0) {
      return "Aucune parcelle disponible"
    }
    return `${garden.availablePlots} parcelle${garden.availablePlots > 1 ? 's' : ''} disponible${garden.availablePlots > 1 ? 's' : ''}`
  }

  return (
    <div className="gardens-list-container">
      <div className="container">
        {/* Filtres et tri */}
        <div className="list-controls">
          <div className="filters">
            <div className="filter-group">
              <label htmlFor="status-filter">Statut :</label>
              <select
                id="status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">Tous les jardins</option>
                <option value="available">Disponibles</option>
                <option value="full">Complets</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="sort-select">Trier par :</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="name">Nom</option>
                <option value="price">Prix</option>
                <option value="rating">Note</option>
                <option value="availability">Disponibilité</option>
              </select>
            </div>
          </div>

          <div className="results-summary">
            {sortedGardens.length} jardin{sortedGardens.length > 1 ? 's' : ''}
          </div>
        </div>

        {/* Liste des jardins */}
        <div className="gardens-grid">
          {sortedGardens.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
              <h3>Aucun jardin trouvé</h3>
              <p>Essayez de modifier vos critères de recherche.</p>
            </div>
          ) : (
            sortedGardens.map((garden) => (
              <div
                key={garden.id}
                className={`garden-card ${selectedGarden?.id === garden.id ? 'selected' : ''}`}
                onClick={() => setSelectedGarden(garden)}
              >
                <div className="garden-image">
                  <img
                    src={garden.image}
                    alt={garden.name}
                    loading="lazy"
                  />
                  <div className="garden-status">
                    {getStatusBadge(garden)}
                  </div>
                </div>

                <div className="garden-content">
                  <div className="garden-header">
                    <h3 className="garden-name">{garden.name}</h3>
                    <div className="garden-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`star ${i < Math.floor(garden.rating) ? 'filled' : ''}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="rating-text">
                        {garden.rating} ({garden.reviews} avis)
                      </span>
                    </div>
                  </div>

                  <div className="garden-info">
                    <div className="info-item">
                      <svg className="info-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{garden.district}</span>
                    </div>

                    <div className="info-item">
                      <svg className="info-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-1.092a4.535 4.535 0 001.676-.662C13.398 12.766 14 11.991 14 11c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 8.092V6.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V4z" clipRule="evenodd" />
                      </svg>
                      <span>{garden.pricePerMonth}€/mois</span>
                    </div>

                    <div className="info-item">
                      <svg className="info-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                      </svg>
                      <span>{garden.surface}</span>
                    </div>

                    <div className="info-item">
                      <svg className="info-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{getAvailabilityText(garden)}</span>
                    </div>
                  </div>

                  <div className="garden-description">
                    <p>{garden.description}</p>
                  </div>

                  <div className="garden-features">
                    {garden.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                    {garden.features.length > 3 && (
                      <span className="feature-tag more">
                        +{garden.features.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="garden-actions">
                    <button className="btn btn-primary btn-sm">
                      Voir les détails
                    </button>
                    <button className="btn btn-secondary btn-sm">
                      Contacter
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Détail du jardin sélectionné */}
        {selectedGarden && (
          <div className="garden-detail-overlay" onClick={() => setSelectedGarden(null)}>
            <div className="garden-detail-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="close-detail"
                onClick={() => setSelectedGarden(null)}
                aria-label="Fermer"
              >
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <div className="detail-content">
                <div className="detail-header">
                  <img
                    src={selectedGarden.image}
                    alt={selectedGarden.name}
                    className="detail-image"
                  />
                  <div className="detail-info">
                    <h2>{selectedGarden.name}</h2>
                    <p className="detail-address">{selectedGarden.address}</p>
                    <div className="detail-rating">
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
                    {getStatusBadge(selectedGarden)}
                  </div>
                </div>

                <div className="detail-body">
                  <div className="detail-section">
                    <h3>Description</h3>
                    <p>{selectedGarden.description}</p>
                  </div>

                  <div className="detail-section">
                    <h3>Informations pratiques</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <strong>Surface :</strong> {selectedGarden.surface}
                      </div>
                      <div className="info-item">
                        <strong>Prix :</strong> {selectedGarden.pricePerMonth}€/mois
                      </div>
                      <div className="info-item">
                        <strong>Parcelles :</strong> {selectedGarden.availablePlots}/{selectedGarden.totalPlots} disponibles
                      </div>
                      <div className="info-item">
                        <strong>Communauté :</strong> {selectedGarden.communitySize} membres
                      </div>
                      <div className="info-item">
                        <strong>Horaires :</strong> {selectedGarden.openHours}
                      </div>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>Équipements</h3>
                    <div className="amenities-list">
                      {selectedGarden.amenities.map((amenity, index) => (
                        <span key={index} className="amenity-item">
                          <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>Spécialités</h3>
                    <div className="features-list">
                      {selectedGarden.features.map((feature, index) => (
                        <span key={index} className="feature-tag large">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>Contact</h3>
                    <div className="contact-info">
                      <div className="contact-item">
                        <strong>Responsable :</strong> {selectedGarden.contact.name}
                      </div>
                      <div className="contact-item">
                        <strong>Téléphone :</strong> {selectedGarden.contact.phone}
                      </div>
                      <div className="contact-item">
                        <strong>Email :</strong> {selectedGarden.contact.email}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="detail-actions">
                  <button className="btn btn-primary">
                    Réserver une parcelle
                  </button>
                  <button className="btn btn-secondary">
                    Contacter le responsable
                  </button>
                  <button className="btn btn-ghost">
                    Visiter le jardin
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GardensList