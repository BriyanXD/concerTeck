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
        <option value="Rock">Rock</option>
        <option value="Reggae">Reggae</option>
        <option value="Hip Hop">Hip Hop</option>
        <option value="Rap">Rap</option>
        <option value="Clasica">Clasica</option>
        <option value="Metal">Metal</option>
        <option value="Reggaeton">Reggaeton</option>
        <option value="Pop">Pop</option>
        <option value="Electronica">Electronica</option>
        <option value="Jazz">Jazz</option>
        <option value="Trap">Trap</option>
        <option value="Otros">Otros</option>
      </select>
    </div>
  )
}
