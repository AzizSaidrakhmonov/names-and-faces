import React, { useEffect, useState } from 'react'
import '../game-component/Game.css'
import { useGameContext } from '../../context/GameContext'
import { ArrowLeft, ArrowRight, Rewind, Eye } from 'react-feather'

const Result = () => {
  const {
    people,
    shuffledPeople,
    currentPerson3,
    setCurrentPerson3,
    getResults,
  } = useGameContext()
  const [count, setCount] = useState(100)

  useEffect(() => {
    getResults[currentPerson3 - 1].firstName ===
      shuffledPeople[currentPerson3 - 1].firstName && setCount(count - 1)
      console.log(count, 'count')
  }, [])

  const [visibleFirstNames, setVisibleFirstNames] = useState(
    Array(getResults?.length).fill(false),
  )

  const [visibleLastNames, setVisibleLastNames] = useState(
    Array(getResults?.length).fill(false),
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

  // const f = (el, i) => {
  //   setCount(() => {
  //     if (
  //       getResults[currentPerson3 - 1]?.firstName ===
  //         shuffledPeople[currentPerson3 - 1]?.firstName &&
  //       i === currentPerson3 - 1
  //     ) {
  //       count + 1
  //     } else {
  //       count
  //     }

  //     return f
  //   })
  // }

  // console.log(count)

  return (
    <section className="people">
      <div className="top">
        <p>Your Result {}</p>
      </div>
      <div className="people-image">
        {getResults?.map((result, index) => {
          if (index === currentPerson3 - 1) {
            return (
              <article key={index}>
                <img
                  src={getResults[index]?.img}
                  alt={getResults[index]?.firstName}
                />

                <form action="" className="form">
                  <div
                    style={{
                      position: 'relative',
                    }}
                  >
                    <input
                      readOnly
                      style={{
                        color:
                          getResults[index]?.firstName !==
                            shuffledPeople[index]?.firstName && 'red',
                      }}
                      value={
                        visibleFirstNames[index]
                          ? shuffledPeople[index]?.firstName
                          : getResults[index]?.firstName
                      }
                    />
                    <Eye
                      style={{
                        position: 'absolute',
                        top: '.4rem',
                        right: '.5rem',
                        width: '1.5rem',
                      }}
                      onClick={() =>
                        setVisibleFirstNames((firstNames) =>
                          firstNames?.map((firstName, firstNameIndex) =>
                            index === firstNameIndex
                              ? !visibleFirstNames[index]
                              : firstName,
                          ),
                        )
                      }
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
                        color:
                          getResults[index]?.lastName !==
                            shuffledPeople[index]?.lastName && 'red',
                      }}
                      value={
                        visibleLastNames[index]
                          ? shuffledPeople[index]?.lastName
                          : getResults[index]?.lastName
                      }
                    />
                    <Eye
                      style={{
                        position: 'absolute',
                        top: '.4rem',
                        right: '.5rem',
                        width: '1.5rem',
                      }}
                      onClick={() =>
                        setVisibleLastNames((lastNames) =>
                          lastNames?.map((lastName, lastNameIndex) =>
                            index === lastNameIndex
                              ? !visibleLastNames[index]
                              : lastName,
                          ),
                        )
                      }
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
