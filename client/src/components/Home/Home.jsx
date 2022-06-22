import React from 'react'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import style from './Home.module.css'
import CardEvent from '../CardEvent/CardEvent'
import CardBigEvent from '../CardBigEvent/CardBigEvent'

export default function Home() {

  return (
    <div className={style.container}>
      <NavBar/>
      <div>
        Carrousel
      </div>
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
      <div><br />
      <iframe src="https://calendar.google.com/calendar/embed?height=200&wkst=2&bgcolor=%23ffffff&ctz=America%2FArgentina%2FBuenos_Aires&showTitle=0&showPrint=0&mode=MONTH&showTabs=1&showCalendars=1&showNav=1&title&src=anJmOG81bGhzYW40MzkzNHF1ZDlzNXA1Mm9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23616161" width="600" height="400"></iframe>
      </div>
      <Footer/>

    </div>
  )
}

