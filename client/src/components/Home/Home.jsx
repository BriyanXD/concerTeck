import React from 'react'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import style from './Home.module.css'

export default function Home() {
  return (
    <div className={style.container}>
      <NavBar/>
      <div>
        Carrousel
      </div>
      <div className={style.eventcontainer}>
        <div>
          BigEvent
        </div>
        <div>
          Event
        </div>
      </div>
      <div>
        Calendario
      </div>
      <Footer/>

    </div>
  )
}

