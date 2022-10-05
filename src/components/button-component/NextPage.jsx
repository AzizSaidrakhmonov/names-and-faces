import { useState, useEffect } from 'react'
import { useGameContext } from '../../context/GameContext'
const NextPage = () => {
  const {
    people,
    setCurrentPerson,
    setCurrentPerson2,
    setCurrentPerson3,
  } = useGameContext()

  const [longPressRecall, setLongPressRecall] = useState(false)
  const [longPressAnswers, setLongPressAnswers] = useState(false)
  const [longPressResults, setLongPressResults] = useState(false)

  const nextPageRecall = () => {
    setCurrentPerson((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > people?.length - 1) {
        nextPage = 1
      }
      return nextPage
    })
  }

  const nextPageAnswers = () => {
    setCurrentPerson2((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > people?.length - 1) {
        nextPage = 1
      }
      return nextPage
    })
  }

  const nextPageResults = () => {
    setCurrentPerson3((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > people?.length - 1) {
        nextPage = 1
      }
      return nextPage
    })
  }

  useEffect(() => {
    let timerId
    if (longPressRecall) {
      timerId = setTimeout(nextPageRecall, 150)
    } else {
      clearTimeout(timerId)
    }

    return () => {
      clearTimeout(timerId)
    }
  }, [nextPageRecall, longPressRecall])

  useEffect(() => {
    let timerId
    if (longPressAnswers) {
      timerId = setTimeout(nextPageAnswers, 150)
    } else {
      clearTimeout(timerId)
    }

    return () => {
      clearTimeout(timerId)
    }
  }, [nextPageAnswers, longPressAnswers])

  useEffect(() => {
    let timerId
    if (longPressResults) {
      timerId = setTimeout(nextPageResults, 150)
    } else {
      clearTimeout(timerId)
    }

    return () => {
      clearTimeout(timerId)
    }
  }, [nextPageResults, longPressResults])

  return {
    nextRecallHandlers: {
      onClick: nextPageRecall,
      onMouseDown: () => setLongPressRecall(true),
      onMouseUp: () => setLongPressRecall(false),
      onMouseLeave: () => setLongPressRecall(false),
      onTouchStart: () => setLongPressRecall(true),
      onTouchEnd: () => setLongPressRecall(false),
    },

    nextAnswersHandlers: {
      onClick: nextPageAnswers,
      onMouseDown: () => setLongPressAnswers(true),
      onMouseUp: () => setLongPressAnswers(false),
      onMouseLeave: () => setLongPressAnswers(false),
      onTouchStart: () => setLongPressAnswers(true),
      onTouchEnd: () => setLongPressAnswers(false),
    },

    nextResultsHandlers: {
      onClick: nextPageResults,
      onMouseDown: () => setLongPressResults(true),
      onMouseUp: () => setLongPressResults(false),
      onMouseLeave: () => setLongPressResults(false),
      onTouchStart: () => setLongPressResults(true),
      onTouchEnd: () => setLongPressResults(false),
    },
  }
}

export default NextPage
