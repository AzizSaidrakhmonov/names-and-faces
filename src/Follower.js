import React from 'react'

const Follower = ({ posts }) => {

  return (
    <div className='container'>
      {posts.map((post, index) => {

        const { img, firstName, lastName } = post;
        
        return (
          <article className={`card `} key={index}>
            <img src={img} alt={firstName} />
            <h4>{firstName}</h4>
            <h4>{lastName}</h4>
          </article>
        )
      })}
    </div>
  )
}

export default Follower
