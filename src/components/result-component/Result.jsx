import React, { useState, useEffect } from 'react'
import '../game-component/Game.css'
import { useGameContext } from '../../context/GameContext'
import { ArrowLeft, ArrowRight, Rewind, Eye } from 'react-feather'

const Result = () => {
  const {
    people,
    shuffledPeople,
    currentPerson3,
    setCurrentPerson3,
    results,
  } = useGameContext()

  const [previewFirstName, setPreviewFirstName] = useState(false)
  const [previewLastName, setPreviewLastName] = useState(false)

  const handlePreviewFirstName = () => {
    setPreviewFirstName((current) => !current)
  }

  const handlePreviewLastName = () => {
    setPreviewLastName((current) => !current)
  }

  const [visibleFirstNames, setVisibleFirstNames] = useState(
    Array(results?.length).fill(false),
  )

  const [visibleLastNames, setVisibleLastNames] = useState(
    Array(results?.length).fill(false),
  )

  const correctFirstNames = results.filter(
    (el, index) => el?.firstName === shuffledPeople[index]?.firstName,
  )
  const correctLastNames = results.filter(
    (el, index) => el?.lastName === shuffledPeople[index]?.lastName,
  )

  const nextPage = () => {
    setCurrentPerson3((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > people?.length - 1) {
        nextPage = 1
      }
      return nextPage
    })
  }

  const prevPage = () => {
    setCurrentPerson3((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 1) {
        prevPage = 1
      }
      return prevPage
    })
  }

  const firstPage = () => {
    setCurrentPerson3(1)
  }

  return (
    <section className="people">
      <div className="top">
        <p>
          Umumiy: {results.length} ta
          <br />
          To'g'ri topilganlar:{' '}
          {correctFirstNames.length + correctLastNames.length}ta <br />
        </p>
      </div>
      <div className="people-cards">
        {results?.map((result, index) => {
          if (index === currentPerson3 - 1) {
            return (
              <article className="people-card" key={index}>
                <img
                  className="people-card__image"
                  src={results[index]?.img}
                  alt={results[index]?.firstName}
                />

                <form className="people-card__form">
                  <div
                    style={{
                      position: 'relative',
                    }}
                  >
                    <input
                      readOnly
                      className="people-card__form-input"
                      style={{
                        backgroundColor:
                          results[index]?.firstName !==
                          shuffledPeople[index]?.firstName
                            ? 'rgb(255, 0, 0, .5)'
                            : 'rgba(26, 161, 19, .5)',
                      }}
                      value={
                        visibleFirstNames[index]
                          ? shuffledPeople[index]?.firstName
                          : results[index]?.firstName
                      }
                    />
                    <Eye
                      className="people-card__form-preview"
                      style={{
                        backgroundColor: previewFirstName && 'black',
                        color: previewFirstName && 'white',
                        padding: previewFirstName && '.1rem',
                      }}
                      onClick={() => {
                        setVisibleFirstNames((firstNames) =>
                          firstNames?.map((firstName, firstNameIndex) =>
                            index === firstNameIndex
                              ? !visibleFirstNames[index]
                              : firstName,
                          ),
                        )

                        handlePreviewFirstName()
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: 'relative',
                    }}
                  >
                    <input
                      readOnly
                      className="people-card__form-input"
                      style={{
                        backgroundColor:
                          results[index]?.lastName !==
                          shuffledPeople[index]?.lastName
                            ? 'rgb(255, 0, 0, .5)'
                            : 'rgba(26, 161, 19, .5)',
                      }}
                      value={
                        visibleLastNames[index]
                          ? shuffledPeople[index]?.lastName
                          : results[index]?.lastName
                      }
                    />
                    <Eye
                      className="people-card__form-preview"
                      style={{
                        backgroundColor: previewLastName && 'black',
                        color: previewLastName && 'white',
                        padding: previewLastName && '.1rem',
                      }}
                      onClick={() => {
                        setVisibleLastNames((lastNames) =>
                          lastNames?.map((lastName, lastNameIndex) =>
                            index === lastNameIndex
                              ? !visibleLastNames[index]
                              : lastName,
                          ),
                        )

                        handlePreviewLastName()
                      }}
                    />
                  </div>
                </form>
              </article>
            )
          } else {
            return null
          }
        })}
      </div>
      <div className="indicator">
        <span>{currentPerson3}</span>/<span>{people.length}</span>
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

export default Result
