import React from 'react'
import style from './CardEvent.module.css'

export default function CardEvent({name, genre, schedule, image}) {
  return (
    <div >

        <div className = {style.container}>
          <div>
            <div>{name}</div>
            <img className={style.image} src={image} alt='Event'/>
            <div>{genre}</div>
            <div>{schedule}</div>
          </div>
        </div>
    </div>
  )
}
