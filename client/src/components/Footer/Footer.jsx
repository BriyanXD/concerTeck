import React from 'react';
import { Link } from 'react-router-dom';
import Contact from '../Contact/Contact';
import s from '../Footer/Footer.module.css'

export default function Footer() {
  return (
    <div className={s.containerFooter}>
      <div className={s.info}>
        {/* column1 */} 
          <Link  style={{textDecoration:'none'}} to={<Contact/>}>
          <h4 className={s.letra}>Contactate con Nosotros</h4>
          </Link>
        {/* column2 */}
        <div className={s.redes}> 
            <a className={s.letra} href="https://www.facebook.com/profile.php?id=100082560332640">Face</a>
            <br />
            <a className={s.letra} href="https://www.instagram.com/concerteck01/">Insta</a>
            <br />
            <a className={s.letra} href="https://twitter.com/?lang=es">Twitter</a>
            <br />
        </div>
      </div>
    </div>
  )
}
