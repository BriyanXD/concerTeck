import React, { useEffect } from 'react'

import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import style from './Home.module.css'
import CardEvent from '../CardEvent/CardEvent'
import CardBigEvent from '../CardBigEvent/CardBigEvent'
import Carrousel from '../Carousel/Carousel'
import {useDispatch, useSelector} from 'react-redux'
import { getEvents } from '../../redux/actions'
import {Link} from 'react-router-dom';

export default function Home() {

  const dispatch = useDispatch();
  const {BigEvents, Events} = useSelector(state => state);

  useEffect(()=>{
    dispatch(getEvents())
       },[dispatch]);
       

  return (
    <div className={style.container}>
      <NavBar/>
      <Carrousel/>
      <div className={style.eventcontainer}>
        <div>
          {BigEvents?.map(el => {
          return(
          <div key={el.id}>
            
          <Link to= {`/${el.id}`}>
          <CardBigEvent name={el.name} genre={el.genre} image={el.image} schedule={el.schedule}/>
          </Link>
          </div>
          )})}
        </div>
        <div>
          {Events?.map(el => {
          return(
          <div key={el.id}>
            
          <Link to= {`/${el.id}`}>
          <CardEvent name={el.name} genre={el.genre} image={el.image} schedule={el.schedule}/>
          </Link>
          </div>
          )})}
        </div>
      </div>
      <div>
        Calendario
      </div>
      <Footer/>

    </div>
  )
}

