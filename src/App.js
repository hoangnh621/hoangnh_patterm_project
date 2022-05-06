import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/common/Header/Header'
import ScreenRepository from './components/ScreenRepository/ScreenRepository'
import ScreenSearchUser from './components/ScreenSearchUser/ScreenSearchUser'
import './styles/reset.scss'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ScreenSearchUser />} />
          <Route path="/repository" element={<ScreenRepository />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
