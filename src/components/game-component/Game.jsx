import React, { useState, useEffect } from 'react'
import './Game.css'
import { useGameContext } from '../../context/GameContext'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Rewind } from 'react-feather'

const Game = () => {
  const { people, currentPerson, setCurrentPerson, countDown, setCountDown, minutesForRecall, setMinutesForRecall } = useGameContext()
  const navigate = useNavigate()

  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      if (countDown < 0) {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1)
        } else if (seconds === 0) {
          if (minutesForRecall === 0) {
            navigate('/answers')
          } else {
            setMinutesForRecall((minutesForRecall) => minutesForRecall - 1)
            setSeconds(59)
          }
        }
      }
    }, 1000)
  }, [countDown, seconds, minutesForRecall, setSeconds, setMinutesForRecall, navigate])

  useEffect(() => {
    if (countDown >= 0) {
      setTimeout(() => setCountDown(countDown - 1), 1000)
    }
  })

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
    <div>
      <div
        className="screen-countdown"
        style={{ display: countDown > 0 ? 'block' : 'none' }}
      >
        <h3>Memorization starts in: </h3>
        <span>{countDown} s</span>
      </div>
      <section
        style={{ display: countDown > 0 ? 'none' : 'flex' }}
        className="people"
      >
        <div className="top">
          {minutesForRecall === 0 && seconds === 0 ? null : (
            <h3 className='time'>
              {minutesForRecall}m {seconds < 10 ? `0${seconds}` : seconds}s
            </h3>
          )}
          <p>Recall</p>
          <Link to="/answers" style={{ textDecoration: 'none' }} className='finish-button'>
            Finish
          </Link>
        </div>
        <div className="people-cards">
          <article className='people-card'>
            <img
              className='people-card__image'
              src={people[currentPerson - 1]?.img}
              alt={people[currentPerson - 1]?.firstName}
            />
            <h4 className='people-card__first-name'>{people[currentPerson - 1]?.firstName}</h4>
            <h4 className='people-card__last-name'>{people[currentPerson - 1]?.lastName}</h4>
          </article>
        </div>
        <div className="indicator">
          <span>{currentPerson}</span>/<span>{people.length}</span>
        </div>
        <div className="control-buttons">
          <button onClick={firstPage} className="first-button">
            <Rewind />
          </button>
          <button onClick={prevPage} className="prev-button">
            <ArrowLeft />
          </button>
          <button onClick={nextPage} className="next-button">
            <ArrowRight />
          </button>
        </div>
      </section>
    </div>
  )
}

export default Game
