import React, { useState, useEffect } from 'react'
import '../game-component/Game.css'
import { useGameContext } from '../../context/GameContext'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Rewind } from 'react-feather'
import NextPage from '../button-component/NextPage'
import PrevPage from '../button-component/PrevPage'

const Answers = () => {
  let {
    shuffledPeople,
    currentPerson2,
    setCurrentPerson2,
    firstNames,
    lastNames,
    setFirstNames,
    setLastNames,
    minutesForAnswer,
    setMinutesForAnswer,
  } = useGameContext()

  const { nextAnswersHandlers } = NextPage()
  const { prevAnswersHandlers } = PrevPage()

  const navigate = useNavigate()
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      if (seconds > 0) {
        setSeconds((seconds) => seconds - 1)
      } else if (seconds === 0) {
        if (minutesForAnswer === 0) {
          navigate('/results')
        } else {
          setMinutesForAnswer((minutesForAnswer) => minutesForAnswer - 1)
          setSeconds(59)
        }
      }
    }, 1000)
  }, [minutesForAnswer, seconds, setMinutesForAnswer, setSeconds, navigate])

  const handleLastName = (e, index) => {
    setLastNames((lastNames) =>
      lastNames.map((oldValue, currentIndex) =>
        currentIndex === index ? e.target.value : oldValue,
      ),
    )
  }

  const handleFirstName = (e, index) => {
    setFirstNames((firstNames) =>
      firstNames.map((oldValue, currentIndex) =>
        currentIndex === index ? e.target.value : oldValue,
      ),
    )
  }

  const firstPage = () => {
    setCurrentPerson2(1)
  }

  return (
    <div className="answers">
      <div className="container">
        <div className="answers-section">
          <div className="answers-section__header">
            {minutesForAnswer === 0 && seconds === 0 ? null : (
              <h3 className="answers-section__header-time">
                {minutesForAnswer}m {seconds < 10 ? `0${seconds}` : seconds}s
              </h3>
            )}
            <p className="answers-section__header-title">Answer</p>
            <Link
              to="/results"
              style={{ textDecoration: 'none' }}
              className="answers-section__header-finish"
            >
              Finish
            </Link>
          </div>
          <div className="answers-section__items">
            {shuffledPeople?.map((_, index) => {
              if (index === currentPerson2 - 1) {
                return (
                  <article className="answers-section__item" key={index}>
                    <img
                      className="answers-section__item-image"
                      src={shuffledPeople[index]?.img}
                      alt={shuffledPeople[index]?.firstName}
                    />
                    <form className="answers-section__item-form">
                      <input
                        type="text"
                        placeholder="Ism"
                        value={firstNames[index]}
                        onChange={(e) => handleFirstName(e, index)}
                      />
                      <input
                        type="text"
                        placeholder="Familiya"
                        value={lastNames[index]}
                        onChange={(e) => handleLastName(e, index)}
                      />
                    </form>
                  </article>
                )
              } else {
                return null
              }
            })}
          </div>
          <div className="answers-section__indicator">
            <span>{currentPerson2}</span>/<span>{shuffledPeople?.length}</span>
          </div>
          <div className="answers-section__control-buttons">
            <button onClick={firstPage} className="first-button">
              <Rewind size={32} />
            </button>
            <button {...prevAnswersHandlers} className="prev-button">
              <ArrowLeft size={32} />
            </button>
            <button {...nextAnswersHandlers} className="next-button">
              <ArrowRight size={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Answers
