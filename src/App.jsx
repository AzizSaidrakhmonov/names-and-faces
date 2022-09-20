import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Game from './components/game-component/Game'
import HomePage from './pages/home-page/HomePage'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />}>
              <Route path='/' element={<Game/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
