import React, { useState } from 'react';
import Contact from '../Contact/Contact';
import Modal from '../Modals/Modal/Modal.jsx';
import s from '../Footer/Footer.module.css'

export default function Footer() {

  const [active, setActive] = useState(false);

  const toggle = () => {
    setActive(!active);
  }

  return (
    <div className={s.containerFooter}>
      <div className={s.info}>
        {/* column1 */}
          <h4 onClick={toggle} className={s.letra}>Contactate con Nosotros</h4>
          <Modal active={active} toggle={toggle}>
              <Contact/>
          </Modal>
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
