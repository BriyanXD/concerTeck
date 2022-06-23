import React from 'react'
import style from './CardEvent.module.css'

export default function CardEvent({name, genre, schedule, image}) {
  return (
    <div >

        <div className = {style.container}>
          <div>
            <img className={style.image} src={image} alt='Event'/>
            <div className={style.name}>{name}</div>
            <div className={style.info}>{genre}</div>
            <div className={style.info}>{schedule}</div>
          </div>
        </div>
    </div>
  )
}
