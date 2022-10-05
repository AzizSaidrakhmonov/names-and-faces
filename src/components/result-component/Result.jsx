import React, { useState } from 'react'
import '../game-component/Game.css'
import { useGameContext } from '../../context/GameContext'
import { ArrowLeft, ArrowRight, Rewind, Eye } from 'react-feather'
import NextPage from '../button-component/NextPage'
import PrevPage from '../button-component/PrevPage'

const Result = () => {
  const {
    people,
    shuffledPeople,
    currentPerson3,
    setCurrentPerson3,
    results,
  } = useGameContext()

  const { prevResultsHandlers } = PrevPage()
  const { nextResultsHandlers } = NextPage()

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

  const firstPage = () => {
    setCurrentPerson3(1)
  }

  return (
    <div className="results">
      <div className="container">
        <section className="results-section">
          <div className="results-section__header">
            <p className="results-section__header-title">
              Umumiy: {results.length} ta
              <br />
              To'g'ri topilganlar:{' '}
              {correctFirstNames.length + correctLastNames.length}ta <br />
            </p>
          </div>
          <div className="results-section__items">
            {results?.map((_, index) => {
              if (index === currentPerson3 - 1) {
                return (
                  <article className="results-section__item" key={index}>
                    <img
                      className="results-section__item-image"
                      src={results[index]?.img}
                      alt={results[index]?.firstName}
                    />

                    <form className="results-section__item-form">
                      <div
                        style={{
                          position: 'relative',
                        }}
                      >
                        <input
                          readOnly
                          style={{
                            backgroundColor:
                              results[index]?.firstName === ''
                                ? 'rgb(255, 255, 255)'
                                : results[index]?.firstName !==
                                    shuffledPeople[index]?.firstName &&
                                  results[index]?.firstName.length > 0
                                ? 'rgba(255, 0, 0, .5)'
                                : results[index]?.firstName !==
                                    shuffledPeople[index]?.firstName &&
                                  results[index]?.firstName.length > 0
                                ? 'rgba(26,161, 19, .5)'
                                : 'rgba(26, 161, 19, .5)',
                          }}
                          value={
                            visibleFirstNames[index]
                              ? shuffledPeople[index]?.firstName
                              : results[index]?.firstName
                          }
                        />
                        <Eye
                          className="results-section__form-preview"
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
                          style={{
                            backgroundColor:
                              results[index]?.lastName === ''
                                ? 'rgb(255, 255, 255)'
                                : results[index]?.lastName !==
                                    shuffledPeople[index]?.lastName &&
                                  results[index].lastName.length > 0
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
                          className="results-section__form-preview"
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
          <div className="results-section__indicator">
            <span>{currentPerson3}</span>/<span>{people.length}</span>
          </div>
          <div className="results-section__control-buttons">
            <button onClick={firstPage} className="first-button">
              <Rewind size={32}/>
            </button>
            <button {...prevResultsHandlers} className="prev-button">
              <ArrowLeft size={32}/>
            </button>
            <button {...nextResultsHandlers} className="next-button">
              <ArrowRight size={32}/>
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Result
