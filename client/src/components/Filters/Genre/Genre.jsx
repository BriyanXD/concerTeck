import React, { useState } from 'react'
import { useDispatch} from 'react-redux';
import { filterByGenres } from '../../../redux/actions';
import style from './Genre.module.css';

export default function Genre() {
  const dispatch = useDispatch()
  const [genre, setGenre] = useState("")
  
  const HandleFilterByGenres = (e) =>  {
    e.preventDefault()
    dispatch(filterByGenres(e.target.value))
    setGenre(`${e.target.value}`);
  }

  return (
    <div>
      <select onChange={e =>{ HandleFilterByGenres(e)}} className={style.selectGenre} name="" id="">
        <option value='all' >Generos</option>
        <option value="1">Trap</option>
        <option value="2">Rock</option>
        <option value="3">Pop</option>
        <option value="4">Jazz</option>
        <option value="5">Electronica</option>
        <option value="6">Reggaeton</option>
        <option value="7">Metal</option>
        <option value="8">Clasica</option>
        <option value="9">Rap</option>
        <option value="10">Hip Hop</option>
        <option value="11">Reggae</option>
        <option value="12">Otros</option>
      </select>
    </div>
  )
}
