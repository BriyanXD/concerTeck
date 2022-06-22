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
      <div><br />
      <iframe src="https://calendar.google.com/calendar/embed?height=200&wkst=2&bgcolor=%23ffffff&ctz=America%2FArgentina%2FBuenos_Aires&showTitle=0&showPrint=0&mode=MONTH&showTabs=1&showCalendars=1&showNav=1&title&src=anJmOG81bGhzYW40MzkzNHF1ZDlzNXA1Mm9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23616161" width="600" height="400"></iframe>
      </div>
      <Footer/>

    </div>
  )
}

