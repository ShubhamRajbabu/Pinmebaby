
import { ToastContainer } from 'react-toastify'
import './App.css'
import MapView from './components/MapPage'

function App() {

  return (
    <div>
      <MapView />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App
