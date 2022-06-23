import React from 'react'
import style from './CardBigEvent.module.css'
import top from '../../img/cartel.png'

export default function CardBigEvent({name, genre, schedule, image}) {
  return (
     
    <div className = {style.container}>
      <div>
        <img className={style.top} src={top} alt=''/>
        <div className={style.topname}>¡Destacado!</div>
        <img className={style.image} src={image} alt='Evento'/>
        <div className={style.name}>{name}</div>
        <div className={style.info}>{genre}</div>
        <div className={style.info}>{schedule}</div>
      </div>
    </div>   
  )
}
