import React, { useState,useEffect } from 'react'
import { useDispatch} from 'react-redux';
import { filterByGenres,GetGenres } from '../../../redux/actions';
import style from './Genre.module.css';
import { useSelector } from 'react-redux';

export default function Genre({setCurrenPag,setCurrentPage}) {
  const dispatch = useDispatch()
  const [genre, setGenre] = useState("")
  const {Genres} = useSelector(state => state);
  const {AllEvents} = useSelector(state => state);
  
  const HandleFilterByGenres = (e) =>  {
    e.preventDefault()
    dispatch(filterByGenres(e.target.value))
    setGenre(`${e.target.value}`)
    setCurrenPag(1)
    setCurrentPage(1)
  }

    useEffect(()=>{
    dispatch(GetGenres())
  },[])

  return (
    <div>
      <select onChange={e =>{ HandleFilterByGenres(e)}} className={style.selectGenre} name="" id="">
        <option value='all' >Géneros</option>
        {
          Genres.map(e => {return(
            <option value={e.id}>{e.name}</option>
          )})
        }
        {/* <option value="1">Trap</option>
        <option value="2">Rock</option>
        <option value="3">Pop</option>
        <option value="4">Jazz</option>
        <option value="5">Electrónica</option>
        <option value="6">Reggaeton</option>
        <option value="7">Metal</option>
        <option value="8">Clásica</option>
        <option value="9">Rap</option>
        <option value="10">Hip Hop</option>
        <option value="11">Reggae</option>
        <option value="12">Otros</option> */}
      </select>
    </div>
  )
}
