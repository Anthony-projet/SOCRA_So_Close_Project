import { useState, useEffect } from 'react';
import Header from './Header';
import GardensList from './GardensList';
import GardenMap from './GardenMap';
import ThemeProvider from './ThemeProvider';
import './App.css';

function App() {
  const [gardens, setGardens] = useState([]);
  const [selectedGarden, setSelectedGarden] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGardens = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/gardens');
        const gardensData = await response.json();
        setGardens(gardensData);
      } catch (error) {
        console.error('Erreur lors du chargement des jardins:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadGardens();
  }, []);

  const filteredGardens = gardens.filter(garden =>
    garden.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    garden.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    garden.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider>
      <div className="app">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          viewMode={viewMode}
          setViewMode={setViewMode}
          gardensCount={filteredGardens.length}
        />
        <main className="main-content">
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Chargement des jardins potagers...</p>
              </div>
            </div>
          ) : (
            <>
              {viewMode === 'list' ? (
                <GardensList
                  gardens={filteredGardens}
                  selectedGarden={selectedGarden}
                  setSelectedGarden={setSelectedGarden}
                />
              ) : (
                <GardenMap
                  gardens={filteredGardens}
                  selectedGarden={selectedGarden}
                  setSelectedGarden={setSelectedGarden}
                />
              )}
            </>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;