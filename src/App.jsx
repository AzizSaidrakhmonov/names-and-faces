import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GamePage from './components/game-component/Game'
import HomePage from './pages/home-page/HomePage'
import Answers from './components/answers-component/Answers'
import Result from './components/result-component/Result'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />}>
              <Route path="/" element={<GamePage/>}/>
              <Route path="/answers" element={<Answers/>}/>
              <Route path='/results' element={<Result/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
