import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import style from './Home.module.css'
import CardEvent from '../CardEvent/CardEvent'
import CardBigEvent from '../CardBigEvent/CardBigEvent'
import Carrousel from '../Carousel/Carousel'
import {useDispatch, useSelector} from 'react-redux'
import { getEvents } from '../../redux/actions'
import {Link} from 'react-router-dom';
import Calendar from '../Calendar/Calendar'
import PaginadoBigEvents from '../Paginado/PaginadoBigEvents'
import PaginadoEvents from '../Paginado/PaginadoEvents'
import ModalCalendar from '../ModalCalendar/ModalCalendar'


export default function Home() {

  const dispatch = useDispatch();
  
  const allEventsPagination = useSelector((state) => {return state.BigEvents})
  const [currentPag, setCurrenPag] = useState(1)
  const [eventsPerPag, setEventsPerPage] = useState(2)
  const indexLastEvent = currentPag * eventsPerPag
  const indexFirstEvent = indexLastEvent - eventsPerPag
  const currentBigEvents = allEventsPagination.slice(indexFirstEvent, indexLastEvent)


  const allSmallEventsPagination = useSelector((state) => {return state.Events})
  const [currentpage, setCurrentPage] = useState(1)
  const [eventPerPage, setEventPerPage] = useState(4)
  const indexLastEventt = currentpage * eventPerPage
  const indexfirstEventt = indexLastEventt - eventPerPage
  const currentEvents = allSmallEventsPagination.slice(indexfirstEventt, indexLastEventt)

  const pagination = (numberPage) =>{
    setCurrenPag(numberPage)
}

const pagination2 = (numberPage2) =>{
  setCurrentPage(numberPage2)
}

  useEffect(()=>{
    dispatch(getEvents())
       },[dispatch]);
  

  return (
    <div className={style.container}>

      <NavBar setCurrenPag={setCurrenPag} setCurrentPage={setCurrentPage}/>
      <Carrousel/>
      <div className={style.eventcontainer}>
        <div className={style.midcontainer}>
        <PaginadoBigEvents 
          eventsPerPag = {eventsPerPag}
          allEventsPagination = {allEventsPagination.length}
          pagination = {pagination}
          />
          <div className={style.bigcontainer}>
          {currentBigEvents?.map(el => {
          return(
          <div key={el.id}>
          <Link style={{textDecoration:'none'}} to= {`/${el.id}`}>
          <CardBigEvent name={el.name} genre={el.genre} image={el.performerImage} schedule={el.schedule}/>
          </Link>
        
          </div>
          )})}

          </div>
        </div>
        <div className={style.midcontainer}>
        <PaginadoEvents
          eventPerPage = {eventPerPage}
          allSmallEventsPagination = {allSmallEventsPagination.length}
          pagination2 = {pagination2}/>
          <div className={style.litlecontainer}>
          {currentEvents?.map(el => {
          return(
          <div key={el.id}>
            
          <Link style={{textDecoration:'none'}} to= {`/${el.id}`}>
          <CardEvent name={el.name} genre={el.genre} image={el.performerImage} schedule={el.schedule}/>
          </Link>
          </div>
          )})}
          </div>

        </div>
      </div><br />
      <div>
        <Calendar/>
      </div><br />
      <Footer/>
      <ModalCalendar/>
    </div>
  )
}
