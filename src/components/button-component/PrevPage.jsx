import { useState, useEffect } from 'react'
import { useGameContext } from '../../context/GameContext'

const PrevPage = () => {
  const {
    people,
    setCurrentPerson,
    setCurrentPerson2,
    setCurrentPerson3,
  } = useGameContext()

  const [longPressRecall, setLongPressRecall] = useState(false)
  const [longPressAnswers, setLongPressAnswers] = useState(false)
  const [longPressResults, setLongPressResults] = useState(false)

  const prevPageRecall = () => {
    setCurrentPerson((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 1) {
        prevPage = people?.length
      }
      return prevPage
    })
  }

  const prevPageAnswers = () => {
    setCurrentPerson2((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 1) {
        prevPage = people?.length
      }
      return prevPage
    })
  }
  const prevPageResults = () => {
    setCurrentPerson3((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 1) {
        prevPage = people?.length
      }
      return prevPage
    })
  }

  useEffect(() => {
    let timerId
    if (longPressRecall) {
      timerId = setTimeout(prevPageRecall, 150)
    } else {
      clearTimeout(timerId)
    }

    return () => {
      clearTimeout(timerId)
    }
  }, [prevPageRecall, longPressRecall])

  useEffect(() => {
    let timerId
    if (longPressAnswers) {
      timerId = setTimeout(prevPageAnswers, 150)
    } else {
      clearTimeout(timerId)
    }

    return () => {
      clearTimeout(timerId)
    }
  }, [prevPageAnswers, longPressAnswers])

  useEffect(() => {
    let timerId
    if (longPressResults) {
      timerId = setTimeout(prevPageResults, 150)
    } else {
      clearTimeout(timerId)
    }

    return () => {
      clearTimeout(timerId)
    }
  }, [prevPageResults, longPressResults])

  return {
    prevRecallHandlers: {
      onClick: prevPageRecall,
      onMouseDown: () => setLongPressRecall(true),
      onMouseUp: () => setLongPressRecall(false),
      onMouseLeave: () => setLongPressRecall(false),
      onTouchStart: () => setLongPressRecall(true),
      onTouchEnd: () => setLongPressRecall(false),
    },

    prevAnswersHandlers: {
      onClick: prevPageAnswers,
      onMouseDown: () => setLongPressAnswers(true),
      onMouseUp: () => setLongPressAnswers(false),
      onMouseLeave: () => setLongPressAnswers(false),
      onTouchStart: () => setLongPressAnswers(true),
      onTouchEnd: () => setLongPressAnswers(false),
    },

    prevResultsHandlers: {
      onClick: prevPageResults,
      onMouseDown: () => setLongPressResults(true),
      onMouseUp: () => setLongPressResults(false),
      onMouseLeave: () => setLongPressResults(false),
      onTouchStart: () => setLongPressResults(true),
      onTouchEnd: () => setLongPressResults(false),
    },
  }
}

export default PrevPage
