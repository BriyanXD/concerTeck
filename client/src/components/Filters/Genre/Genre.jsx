import React, { useState } from 'react'
import style from './Genre.module.css';

export default function Genre() {

  const [genre, setGenre] = useState("")

  const handleChange = (e) =>  {
    setGenre(e.target.value);
  }

  return (
    <div>
      <select onChange={handleChange} className={style.selectGenre} name="" id="">
        <option default >Generos</option>
        <option value="rock">Rock</option>
        <option value="reggae">Reggae</option>
        <option value="hip hop">Hip Hop</option>
        <option value="rap">Rap</option>
        <option value="clasica">Clasica</option>
        <option value="metal">Metal</option>
        <option value="reggaeton">Reggaeton</option>
        <option value="pop">Pop</option>
        <option value="eletronica">Electronica</option>
        <option value="jazz">Jazz</option>
        <option value="trap">Trap</option>
        <option value="otros">Otros</option>
      </select>
    </div>
  )
}
