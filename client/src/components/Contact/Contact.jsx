import React from 'react';
import style from './Contact.module.css';

export default function Contact() {
  return (
    <div className={style.containerContact}>
      <form action='https://formsubmit.co/concerteck@gmail.com' method='POST'>
      <label>Nombre o Razón Social:  <input name='name' type='text'/></label>
      <br/>
      <label>Mail: <input name='email' type='email' /></label>
      <br/>
      <label>Teléfono: <input name='telephone' type='number'/></label>
      <br/>
      <label>Motivo de Contacto <textarea name='message' type='message' className={style.textarea} rows='5' cols='50'></textarea></label>
      <br />
      <button type='submit'>Enviar</button>
      </form>
    </div>
  )
}
