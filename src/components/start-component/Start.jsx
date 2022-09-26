import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameContext } from '../../context/GameContext'
import './Start.css'

const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

const Start = () => {
  const [imagesLoading, setImagesLoading] = useState(false)

  const {
    people,
    setPeople,
    setShuffledPeople,
    setCountDown,
    setMinutesForRecall,
    setMinutesForAnswer
  } = useGameContext()

  const [imagesFetched, setImagesFetched] = useState(0)

  const navigate = useNavigate()

  const handleNavigate = useCallback(async () => {
    setImagesLoading(true)

    const updatedPeople = await Promise.all(
      people.map(
        ({ img, ...person }) =>
          new Promise(async (resolve, reject) => {
            const res = await fetch(img)

            const blob = await res.blob()

            const url = await blobToBase64(blob)

            resolve({ ...person, img: url })

            setImagesFetched((fetched) => fetched + 1)
          }),
      ),
    )

    setShuffledPeople((shuffledPeople) =>
      shuffledPeople.map((person) => {
        const { img } = updatedPeople.find(
          (updatedPerson) =>
            person.firstName === updatedPerson.firstName &&
            person.lastName === updatedPerson.lastName,
        )

        return { ...person, img }
      }),
    )

    setPeople(updatedPeople)

    navigate('/game')
  }, [navigate, people, setPeople])

  return (
    <div className="settings">
      <form className="time-settings">
        <label htmlFor="">Boshlang'ich vaqtni kiriting</label>
        <input
          type="number"
          onChange={(e) => setCountDown(e.target.value)}
          placeholder="Standart vaqt 5 soniya"
        />

        <label htmlFor=""> Eslab qolish vaqtini kiriting</label>
        <input
          type="number"
          onChange={(e) => setMinutesForRecall(e.target.value)}
          placeholder="Standart vaqt 5 daqiqa"
        />

        <label htmlFor="">Javob berish vaqtini kiriting</label>
        <input
          type="number"
          onChange={(e) => setMinutesForAnswer(e.target.value)}
          placeholder="Standart vaqt 5 daqiqa "
        />
      </form>
      <div className="start-button">
        <button onClick={handleNavigate} disabled={imagesLoading}>
          {imagesLoading
            ? `Loading images (${imagesFetched} / ${people.length})`
            : 'Start'}
        </button>
      </div>
    </div>
  )
}

export default Start
