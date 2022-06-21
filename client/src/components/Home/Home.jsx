import React from 'react'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import style from './Home.module.css'
import CardEvent from '../CardEvent/CardEvent'
import CardBigEvent from '../CardBigEvent/CardBigEvent'
import Carrousel from '../Carousel/Carousel'

export default function Home() {

  return (
    <div className={style.container}>
      <NavBar/>
      <Carrousel/>
      <div className={style.eventcontainer}>
        <div>
          <CardBigEvent 
          name='Divididos' 
          genre='Rock'
          schedule='21:00hs' 
          image='https://lastfm.freetls.fastly.net/i/u/770x0/c680cb0c72de80e17656d75121b6155d.jpg'
          ></CardBigEvent>
        </div>
        <div>
          <CardEvent
          name='Divididos' 
          genre='Rock'
          schedule='21:00hs' 
          image='https://lastfm.freetls.fastly.net/i/u/770x0/c680cb0c72de80e17656d75121b6155d.jpg'
          ></CardEvent>
        </div>
      </div>
      <div>
        Calendario
      </div>
      <Footer/>

    </div>
  )
}

