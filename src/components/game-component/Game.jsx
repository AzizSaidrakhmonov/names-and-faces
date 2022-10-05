import React, { useState, useEffect } from 'react'
import './Game.css'
import { useGameContext } from '../../context/GameContext'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Rewind } from 'react-feather'
import NextPage from '../button-component/NextPage'
import PrevPage from '../button-component/PrevPage'

const Game = () => {
  const {
    people,
    currentPerson,
    setCurrentPerson,
    countDown,
    setCountDown,
    minutesForRecall,
    setMinutesForRecall,
  } = useGameContext()

  const { prevRecallHandlers } = PrevPage()
  const { nextRecallHandlers } = NextPage()

  const [seconds, setSeconds] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      if (countDown < 0) {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1)
        } else if (seconds === 0) {
          if (minutesForRecall === 0) {
            // navigate('/answers')
          } else {
            setMinutesForRecall((minutesForRecall) => minutesForRecall - 1)
            setSeconds(59)
          }
        }
      }
    }, 1000)
  }, [
    countDown,
    seconds,
    minutesForRecall,
    setSeconds,
    setMinutesForRecall,
    navigate,
  ])

  useEffect(() => {
    if (countDown >= 0) {
      setTimeout(() => setCountDown(countDown - 1), 1000)
    }
  })

  const firstPage = () => {
    setCurrentPerson(1)
  }

  return (
    <div className="game">
      <div className="container">
        <div
          className="screen-countdown"
          style={{ display: countDown > 0 ? 'block' : 'none' }}
        >
          <h3>Memorization starts in: </h3>
          <span>{countDown} s</span>
        </div>
        <div
          style={{ display: countDown > 0 ? 'none' : 'flex' }}
          className="game-section"
        >
          <div className="game-section__header">
            {minutesForRecall === 0 && seconds === 0 ? null : (
              <h3 className="game-section__header-time">
                {minutesForRecall}m {seconds < 10 ? `0${seconds}` : seconds}s
              </h3>
            )}
            <p className="game-section__header-title">Recall</p>
            <Link
              to="/answers"
              style={{ textDecoration: 'none' }}
              className="game-section__header-finish"
            >
              Finish
            </Link>
          </div>
          <div className="game-section__items">
            <article className="game-section__item">
              <img
                className="game-section__item-image"
                src={people[currentPerson - 1]?.img}
                alt={people[currentPerson - 1]?.firstName}
              />
              <h4 className="game-section__item-firstName">
                {people[currentPerson - 1]?.firstName}
              </h4>
              <h4 className="game-section__item-lastName">
                {people[currentPerson - 1]?.lastName}
              </h4>
            </article>
          </div>
          <div className="game-section__indicator">
            <span>{currentPerson}</span>/<span>{people.length}</span>
          </div>
          <div className="game-section__control-buttons">
            <button onClick={firstPage} className="first-button">
              <Rewind size={32}/>
            </button>
            <button {...prevRecallHandlers} className="prev-button">
              <ArrowLeft size={32}/>
            </button>
            <button {...nextRecallHandlers} className="next-button">
              <ArrowRight size={32}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Game
