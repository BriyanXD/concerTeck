import React from 'react'

export default function CardEvent(name, genre, schedule, image) {
  return (
    <div >

        <div className = {style.container}>
          <div>
            <div>{name}</div>
            <img src={image} alt='Stadium'/>
            <div>{genre}</div>
            <div>{schedule}</div>
          </div>
        </div>
    </div>
  )
}
