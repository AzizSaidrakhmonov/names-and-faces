import React, { useState, useEffect } from 'react'
import '../game-component/Game.css'
import { useGameContext } from '../../context/GameContext'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Rewind } from 'react-feather'

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
    setMinutesForAnswer
  } = useGameContext()

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

  const nextPage = (e) => {
    e.preventDefault()
    setCurrentPerson2((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > shuffledPeople?.length - 1) {
        nextPage = 1
      }
      return nextPage
    })
  }

  const prevPage = (e) => {
    e.preventDefault()
    setCurrentPerson2((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 1) {
        prevPage = 1
      }
      return prevPage
    })
  }

  const firstPage = () => {
    setCurrentPerson2(1)
  }

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

  return (
    <section className="people">
      <div className="top">
        {minutesForAnswer === 0 && seconds === 0 ? null : (
          <h3 className='time'>
            {minutesForAnswer}m {seconds < 10 ? `0${seconds}` : seconds}s
          </h3>
        )}
        <p>Answer</p>
        <Link to="/results" style={{ textDecoration: 'none' }}>
          Finish
        </Link>
      </div>
      <div className="people-cards">
        {shuffledPeople?.map((person, index) => {
          if (index === currentPerson2 - 1) {
            return (
              <article className="people-card" key={index}>
                <img
                  className="people-card__image"
                  src={shuffledPeople[index]?.img}
                  alt={shuffledPeople[index]?.firstName}
                />
                <form className="people-card__form">
                  <input
                    className="people-card__form-input"
                    type="text"
                    placeholder="Ism"
                    value={firstNames[index]}
                    onChange={(e) => handleFirstName(e, index)}
                  />
                  <input
                    className="people-card__form-input"
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
      <div className="indicator">
        <span>{currentPerson2}</span>/<span>{shuffledPeople?.length}</span>
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
  )
}

export default Answers
