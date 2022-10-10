import 'normalize.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { FlashCardsContextProvider } from './context/FlashCardsContext'
import { NamesAndFacesContextProvider } from './context/NamesAndFacesContext'
import { WordsContextProvider } from './context/WordsContext'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <NamesAndFacesContextProvider>
    <WordsContextProvider>
      <FlashCardsContextProvider>
      <App />
      </FlashCardsContextProvider>
    </WordsContextProvider>
  </NamesAndFacesContextProvider>,
)
