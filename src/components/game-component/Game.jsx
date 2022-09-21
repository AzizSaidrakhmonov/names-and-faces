import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import RefreshIcon from '@mui/icons-material/Refresh'
import './Game.css'
import { useGameContext } from '../../context/GameContext'

const Game = () => {
  const { people, currentPerson, setCurrentPerson } = useGameContext()

  // Control Buttons
  const nextPage = () => {
    setCurrentPerson((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > people?.length - 1) {
        nextPage = 1
      }
      return nextPage
    })
  }

  const prevPage = () => {
    setCurrentPerson((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 1) {
        prevPage = 1
      }
      return prevPage
    })
  }

  const firstPage = () => {
    setCurrentPerson(1)
  }

  return (
    <section className="people">
        <div className="people-image">
          <article>
            <img
              src={people[currentPerson-1]?.img}
              alt={people[currentPerson-1]?.firstName}
            />
            <h4>{people[currentPerson-1]?.firstName}</h4>
            <h4>{people[currentPerson-1]?.lastName}</h4>
          </article>
        </div>
        <div className="indicator">
          <span>{currentPerson}</span>/<span>{people.length}</span>
        </div>
        <div className="control-buttons">
          <SkipPreviousIcon
            className="first-button"
            onClick={firstPage}
            sx={{
              fontSize: '3rem',
              backgroundColor: 'green',
              color: 'white',
              borderRadius: '.8rem',
              padding: '.4rem',
              cursor: 'pointer',
            }}
          />
          <RefreshIcon
            className="refresh-button"
            onClick={() => {
              window.location.reload()
            }}
            sx={{
              fontSize: '3rem',
              backgroundColor: 'green',
              color: 'white',
              borderRadius: '.8rem',
              padding: '.4rem',
              cursor: 'pointer',
            }}
          />
          <ArrowBackIcon
            className="prev-button"
            onClick={prevPage}
            sx={{
              fontSize: '3rem',
              backgroundColor: 'green',
              color: 'white',
              borderRadius: '.8rem',
              padding: '.4rem',
              cursor: 'pointer',
            }}
          />
          <ArrowForwardIcon
            className="next-button"
            onClick={nextPage}
            sx={{
              fontSize: '3rem',
              backgroundColor: 'green',
              color: 'white',
              borderRadius: '.8rem',
              padding: '.4rem',
              cursor: 'pointer',
            }}
          />
        </div>
    </section>
  )
}

export default Game
