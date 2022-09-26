import React, { useState, useEffect, useContext } from 'react'
import { peopleImages } from '../data/faces/faces'
import { firstName, lastName } from '../data/names/names'

const GameContext = React.createContext(false)

export const GameContextProvider = ({ children }) => {
  const [people, setPeople] = useState([])
  const [shuffledPeople, setShuffledPeople] = useState([])
  const [currentPerson, setCurrentPerson] = useState(1)
  const [currentPerson2, setCurrentPerson2] = useState(1)
  const [currentPerson3, setCurrentPerson3] = useState(1)
  const [countDown, setCountDown] = useState(5)
  const [minutesForRecall, setMinutesForRecall] = useState(5)
  const [minutesForAnswer, setMinutesForAnswer] = useState(5)

  const [firstNames, setFirstNames] = useState(() => Array(50).fill(''))
  const [lastNames, setLastNames] = useState(() => Array(50).fill(''))

  const maleImages = []
  const femaleImages = []
  const randomMaleImages = []
  const randomFemaleImages = []

  for (let i = 0; i < peopleImages.length / 2; i++) {
    maleImages.push(peopleImages[i])
  }

  for (let i = peopleImages.length / 2; i < peopleImages.length; i++) {
    femaleImages.push(peopleImages[i])
  }

  for (let i = 0; i < maleImages.length; i++) {
    randomMaleImages.push(
      maleImages[Math.floor(Math.random() * maleImages.length)],
    )
  }

  for (let i = 0; i < femaleImages.length; i++) {
    randomFemaleImages.push(
      femaleImages[Math.floor(Math.random() * femaleImages.length)],
    )
  }

  let uniqueMaleImages = randomMaleImages.filter((el, index) => {
    return randomMaleImages.indexOf(el) === index
  })

  let uniqueFemaleImages = randomFemaleImages.filter((el, index) => {
    return randomFemaleImages.indexOf(el) === index
  })

  let uniqueLength = maleImages.length - uniqueMaleImages.length
  let allUniqueImages = []

  let filteredMaleImages = uniqueMaleImages.filter(
    (x) => !uniqueFemaleImages.includes(x),
  )
  let filteredFemaleImages = uniqueFemaleImages.filter(
    (x) => !uniqueMaleImages.includes(x),
  )

  if (uniqueMaleImages.length === randomMaleImages.length) {
    allUniqueImages = [...uniqueMaleImages]
  } else {
    allUniqueImages = [
      ...filteredMaleImages.concat(
        filteredFemaleImages?.slice(0, uniqueLength),
      ),
    ]
  }

  const result = []
  let firstNameMale = []
  let firstNameFemale = []
  let lastNameMale = []
  let lastNameFemale = []

  for (let i = 0; i < allUniqueImages.length; i++) {
    if (allUniqueImages[i].gender === 'male') {
      firstNameMale = firstName.filter((i) => i.gender === 'male')
      lastNameMale = lastName.filter((i) => i.gender === 'male')
    } else {
      firstNameFemale = firstName.filter((i) => i.gender === 'female')
      lastNameFemale = lastName.filter((i) => i.gender === 'female')
    }

    const randomIndexOfFirstNames = Math.floor(
      Math.random() * (firstNameMale.length || firstNameFemale.length),
    )

    const randomIndexOfLastNames = Math.floor(
      Math.random() * (lastNameMale.length || lastNameFemale.length),
    )

    if (allUniqueImages[i].gender === 'male') {
      result.push({
        img: allUniqueImages[i].img,
        firstName: firstNameMale[randomIndexOfFirstNames].firstName,
        lastName: lastNameMale[randomIndexOfLastNames].lastName,
      })
    } else {
      result.push({
        img: allUniqueImages[i].img,
        firstName: firstNameFemale[randomIndexOfFirstNames].firstName,
        lastName: lastNameFemale[randomIndexOfLastNames].lastName,
      })
    }
  }

  let shuffled1 = result
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  let shuffled2 = result
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  const getResults = []

  for (let i = 0; i < shuffledPeople.length; i++) {
    getResults.push({
      img: shuffledPeople[i]?.img,
      firstName: firstNames[i].trim(),
      lastName: lastNames[i].trim(),
    })
  }

  useEffect(() => {
    setPeople(shuffled1)
    setShuffledPeople(shuffled2)
  }, [])

  const value = {
    people,
    setPeople,
    setShuffledPeople,
    currentPerson,
    setCurrentPerson,
    currentPerson2,
    setCurrentPerson2,
    currentPerson3,
    setCurrentPerson3,
    firstNames,
    setFirstNames,
    lastNames,
    setLastNames,
    shuffledPeople,
    getResults,
    countDown,
    setCountDown,
    minutesForRecall,
    setMinutesForRecall,
    minutesForAnswer,
    setMinutesForAnswer,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export const useGameContext = () => useContext(GameContext)
