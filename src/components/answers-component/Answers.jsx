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
  } = useGameContext()

  const [seconds, setSeconds] = useState(60)
  const navigate = useNavigate()

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000)
    } else {
      navigate('/results')
    }
  })

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
        <h3>{seconds} s</h3>
        <p>Answer</p>
        <Link to="/results" style={{ textDecoration: 'none' }}>
          Finish
        </Link>
      </div>
      <div className="people-image">
        {shuffledPeople?.map((person, index) => {
          if (index === currentPerson2 - 1) {
            return (
              <article key={index}>
                <img
                  src={shuffledPeople[index]?.img}
                  alt={shuffledPeople[index]?.firstName}
                />
                <form action="" className="form">
                  <input
                    type="text"
                    placeholder="FirstName"
                    value={firstNames[index]}
                    onChange={(e) => handleFirstName(e, index)}
                  />
                  <input
                    type="text"
                    placeholder="LastName"
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
