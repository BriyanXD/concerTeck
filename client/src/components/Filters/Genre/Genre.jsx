import React from 'react'
import style from './Genre.module.css';

export default function Genre() {
  return (
    <div>
      <select className={style.selectGenre} name="" id="">
        <option value="">Generos</option>
      </select>
    </div>
  )
}
