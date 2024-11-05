import './App.css'
import { DataStoreContext } from './context/dataStoreContext'
import ImageQueue from './components/ImageQueue';
import CategoriesList from './components/CategoriesList';
import ImageAnalyzer from './components/ImageAnalyzer';
import { DataStore } from './stores/dataStore';

function App() {
  const dataStore = new DataStore();

  return (
    <DataStoreContext.Provider value={dataStore}>
      <div className="main-content">
          <h1>Image Analyzer</h1>
          <div className="analyzer-container">
              <ImageAnalyzer />
              <div className="sidebar">
                  <div className="search-bar">
                      <input type="text" placeholder="Search options..." />
                  </div>
                  <CategoriesList />
                  <div className="buttons">
                      <button>Discard</button>
                      <button>Complete</button>
                  </div>
              </div>
          </div>
          <ImageQueue />
      </div>
    </DataStoreContext.Provider>
  )
}

export default App
