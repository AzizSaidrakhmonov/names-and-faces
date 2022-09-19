import React, { useState, useEffect } from 'react'
import Pagination from './Pagination'
import './index.css'
import Follower from './Follower'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import { peopleImages } from './components/faces/faces'
import { firstName, lastName } from './components/names/names'

const App = () => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(1)

  // console.log(peopleImages)
  // console.log(firstName)
  // console.log(lastName)

  // Each data's length is equal to 100

  const limitFor = lastName.length / 2 // this is equal to 50
  const result = []
  let firstNameMale = []
  let lastNameMale = []
  let firstNameFemale = []
  let lastNameFemale = []

  for (let i = 0; i < limitFor; i++) {
    const lengthOfFaces = peopleImages.length // this is equal to 100

    const randomIndexOfFaces = Math.floor(Math.random() * lengthOfFaces) // getting random 50 indexes of faces with duplicates

    // console.log(randomIndexOfFaces)

    if (peopleImages[randomIndexOfFaces].gender === 'male') {
      firstNameMale = firstName.filter((i) => i.gender === 'male')
      lastNameMale = lastName.filter((i) => i.gender === 'male')

      // console.log(firstNameMale, lastNameMale)
    } else {
      firstNameFemale = firstName.filter((i) => i.gender === 'female')
      lastNameFemale = lastName.filter((i) => i.gender === 'female')

      // console.log(firstNameFemale, lastNameFemale)
    }

    const randomIndexOfFirstNames = Math.floor(
      Math.random() * (firstNameMale.length || firstNameFemale.length),
    )
    // this code runs through the conditional above, the way to get random indexes of firstNames

    const randomIndexOfLastNames = Math.floor(
      Math.random() * (lastNameMale.length || lastNameFemale.length),
    )
    // this code runs through the conditional above, the way to get random indexes of lastNames

    if (peopleImages[randomIndexOfFaces].gender === 'male') {
      result.push({
        img: peopleImages[randomIndexOfFaces].img,
        firstName: firstNameMale[randomIndexOfFirstNames].firstName,
        lastName: lastNameMale[randomIndexOfLastNames].lastName,
      })
    } else {
      result.push({
        img: peopleImages[randomIndexOfFaces].img,
        firstName: firstNameFemale[randomIndexOfFirstNames].firstName,
        lastName: lastNameFemale[randomIndexOfLastNames].lastName,
      })
    }
  }

  console.log(result)

  useEffect(() => {
    setPosts(result)
  }, [])

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost)

  const nextPage = () => {
    setCurrentPage((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > posts.length) {
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
      <section className="followers">
        <div>
          <Follower posts={currentPost} />
          <div className="btn-container">
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
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
              }}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
