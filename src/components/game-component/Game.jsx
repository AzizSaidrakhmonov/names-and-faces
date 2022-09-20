import React, { useState, useEffect } from 'react'
import Pagination from './Pagination'
import People from './People'
import './Game.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'

import { GameContextProvider, useGameContext } from '../../context/GameContext'

const Game = () => {
  const {
    people,
    setPeople,
    currentPage,
    setCurrentPage,
    postsPerPage,
  } = useGameContext()
  
  const indexOfLastPerson = currentPage * postsPerPage
  const indexOfFirstPerson = indexOfLastPerson - postsPerPage
  const currentPerson = people?.slice(indexOfFirstPerson, indexOfLastPerson)

  // Control Buttons
  const nextPage = () => {
    setCurrentPage((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > people?.length - 1) {
        nextPage = 1
      }
      return nextPage
    })
  }

  const prevPage = () => {
    setCurrentPage((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 1) {
        prevPage = postsPerPage
      }
      return prevPage
    })
  }

  const firstPage = () => {
    setCurrentPage(1)
  }

  return (
    <main>
      <section className="people">
        <div>
          <People people={currentPerson} />
          <div className="pagination-buttons">
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={people?.length}
              paginate={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
          <div className="control-buttons">
            <SkipPreviousIcon
              className="first-button"
              onClick={firstPage}
              sx={{
                fontSize: '4rem',
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
                fontSize: '4rem',
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
                fontSize: '4rem',
                backgroundColor: 'green',
                color: 'white',
                borderRadius: '.8rem',
                padding: '.4rem',
                cursor: 'pointer',
              }}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Game
