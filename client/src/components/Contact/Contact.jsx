import React from 'react';
import style from './Contact.module.css';

export default function Contact() {
  return (
    <div className={style.containerContact}>
      <form action='https://formsubmit.co/concerteck@gmail.com' method='POST'>
      <label className={style.nameContact}>Nombre o Razón Social:  <input name='name' type='text'/></label>
      <br/>
      <label className={style.mailContact}>Mail: <input name='email' type='email' /></label>
      <br/>
      <label className={style.phoneContact}>Teléfono: <input name='telephone' type='number'/></label>
      <br/>
      <label className={style.reasonContact}>Motivo de Contacto <textarea name='message' type='message' className={style.textarea} rows='5' cols='50'></textarea></label>
      <br />
      <button type='submit' className='style.btnSend'>Enviar</button>
      </form>
    </div>
  )
}
