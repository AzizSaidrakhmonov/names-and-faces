import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import RefreshIcon from '@mui/icons-material/Refresh'
import '../game-component/Game.css'
import { useGameContext } from '../../context/GameContext'

const Result = () => {
  const { people, currentPerson, setCurrentPerson, answers } = useGameContext()

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
        {answers.map((answer, index) => {
          if (index === currentPerson - 1) {
            return (
              <article key={index}>
                <img
                  src={answers[index]?.img}
                  alt={answers[index]?.firstName}
                />

                <form action="" className="form">
                  <input
                    readOnly
                    placeholder={answers[index]?.firstName}
                    style={{
                      color:
                        answers[index]?.firstName !==
                          people[index]?.firstName && 'red',
                    }}
                    value={answers[index]?.firstName}
                  />
                  <input
                    readOnly
                    placeholder={answers[index]?.lastName}
                    style={{
                      color:
                        answers[index]?.lastName !== people[index]?.lastName &&
                        'red',
                    }}
                    value={answers[index]?.lastName}
                  />
                </form>
              </article>
            )
          } else {
            return null
          }
        })}
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

export default Result
