import './App.css'
import { DataStoreContext } from './context/dataStoreContext'
import ImageQueue from './components/ImageQueue';
import CategoriesList from './components/CategoriesList';
import ImageAnalyzer from './components/ImageAnalyzer';
import { DataStore } from './stores/dataStore';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { discardAnnotation, postAnnotation } from './api/api';

const ActionButtons = observer(() => {
  const data = useContext(DataStoreContext);

  const onComplete = () => {
    if (data?.annotationPostBody === undefined) return;
    try {
      postAnnotation(data.annotationPostBody)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then(_json => window.alert('Your annotation was marked as complete!'));
    } catch (error) {
      window.alert('Oh no! something went wrong');
      console.log(error);
    }
  }

  const onDiscard = () => {
    if (data?.annotationDiscardBody === undefined) return;
    try {
      discardAnnotation(data.annotationDiscardBody)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then(_json => window.alert('Annotation discarded'));
    } catch (error) {
      window.alert('Oh no! something went wrong');
      console.log(error);
    }
  }

  return (
    <div className="buttons">
        <button onClick={onDiscard} disabled={data?.currentImageId === undefined}>Discard</button>
        <button onClick={onComplete} disabled={!data?.enablePostAnotation}>Complete</button>
    </div>
  )
})

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
                  <ActionButtons />
              </div>
          </div>
          <ImageQueue />
      </div>
    </DataStoreContext.Provider>
  )
}

export default App
