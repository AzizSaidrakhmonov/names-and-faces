import React from 'react'

const People = ({people}) => {
    return (
        <div className="container">
          {people?.map((person, index) => {
            const { img, firstName, lastName } = person
    
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

export default People