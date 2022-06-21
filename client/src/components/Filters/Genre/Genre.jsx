import React from 'react'
import style from './Genre.module.css';

export default function Genre() {
  //       "Rock",
  //       "Reggae",
  //       "Hip Hop",
  //       "Rap",
  //       "Clasica",
  //       "Metal",
  //       "Reggaeton",
  //       "Pop",
  //       "Electronica",
  //       "Jazz",
  //       "Trap"
  //      "Otros"
  return (
    <div>
      <select className={style.selectGenre} name="" id="">
        <option value="">Generos</option>
      </select>
    </div>
  )
}
