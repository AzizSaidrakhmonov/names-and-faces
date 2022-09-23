import React, { useState, useEffect } from 'react'
import './Game.css'
import { useGameContext } from '../../context/GameContext'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Rewind } from 'react-feather'

const Game = () => {
  const { people, currentPerson, setCurrentPerson } = useGameContext()
  const [seconds, setSeconds] = useState(60)
  const navigate = useNavigate()

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000)
    } else {
      navigate('/answers')
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
    <section className="people">
      <div className="top">
        <h3>{seconds} s</h3>
        <p>Let's Recall</p>
        <Link to="/answers" style={{ textDecoration: 'none' }}>
          Finish
        </Link>
      </div>
      <div className="people-image">
        <article>
          <img
            src={people[currentPerson - 1]?.img}
            alt={people[currentPerson - 1]?.firstName}
          />
          <h4>{people[currentPerson - 1]?.firstName}</h4>
          <h4>{people[currentPerson - 1]?.lastName}</h4>
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
  )
}

export default Game
