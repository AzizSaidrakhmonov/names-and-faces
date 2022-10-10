import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FlashCardsRecall from './components/flash-cards-component/cards-component/FlashCardsRecall'
import FlashCardsResult from './components/flash-cards-component/results-component/FlashCardsResult'
import FlashCardsStart from './components/flash-cards-component/start-component/FlashCardsStart'
import Answers from './components/names-and-faces-component/answers-component/Answers'
import Recall from './components/names-and-faces-component/game-component/Recall'
import Results from './components/names-and-faces-component/result-component/Results'
import Start from './components/names-and-faces-component/start-component/Start'
import WordsAnswer from './components/words-component/answers-component/WordsAnswer'
import WordsRecall from './components/words-component/game-component/WordsRecall'
import WordsResult from './components/words-component/result-component/WordsResult'
import WordsStart from './components/words-component/start-component/WordsStart'
import HomePage from './pages/home-page/HomePage'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="/" element={<Start />} />
            <Route path="/names-and-faces/recall" element={<Recall />} />
            <Route path="/names-and-faces/answers" element={<Answers />} />
            <Route path="/names-and-faces/results" element={<Results />} />
            <Route path="/words" element={<WordsStart />} />
            <Route path="/words/recall" element={<WordsRecall />} />
            <Route path="/words/answers" element={<WordsAnswer />} />
            <Route path="/words/results" element={<WordsResult />} />
            <Route path="/flash-cards" element={<FlashCardsStart />} />
            <Route path="/flash-cards/recall" element={<FlashCardsRecall />} />
            <Route path="/flash-cards/results" element={<FlashCardsResult />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
