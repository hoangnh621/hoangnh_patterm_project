import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/layout/Header/Header'
import PageNotFound from './components/PageNotFound/PageNotFound'
import ScreenRepository from './components/ScreenRepository/ScreenRepository'
import ScreenSearchUser from './components/ScreenSearchUser/ScreenSearchUser'
import './styles/index.scss'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ScreenSearchUser />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/repository" element={<ScreenRepository />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
