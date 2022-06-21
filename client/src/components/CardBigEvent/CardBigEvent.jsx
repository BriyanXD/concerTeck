import React from 'react'
import style from './CardBigEvent.module.css'

export default function CardBigEvent({name, genre, schedule, image}) {
  return (
     
    <div className = {style.container}>
      <div>
        <div>{name}</div>
        <img className={style.image} src={image} alt='Event'/>
        <div>{genre}</div>
        <div>{schedule}</div>
      </div>
    </div>   
  )
}
