import React from 'react';
import style from './Contact.module.css';

export default function Contact() {
  return (
    <div className={style.containerContact}>
      <form action='https://formsubmit.co/concerteck@gmail.com' method='POST'>
      <label className={style.labelNameContact}>Nombre o Razón Social:  <input name='name' className={style.nameContact} type='text'/></label>
      <br/>
      <label className={style.labelMailContact}>Mail: <input name='email' className={style.mailContact} type='email' /></label>
      <br/>
      <label className={style.labelPhoneContact}>Teléfono: <input name='telephone' className={style.phoneContact} type='text'/></label>
      <br/>
      <br />
      <label className={style.labelReasonContact}>Motivo de Contacto: <textarea name='message' className={style.reasonContact} type='message'  rows='5' cols='50'></textarea></label>
      <button type='submit' className={style.btnSend}>Enviar</button>
      </form>
    </div>
  )
}
