import React from 'react';
import style from './Contact.module.css';

export default function Contact() {
  return (
    <div className={style.containerContact}>
      <label>Nombre o Razón Social:  <input type="text"/></label>
      <br/>
      <label>Mail: <input type="email" /></label>
      <br/>
      <label>Teléfono: <input type="number"/></label>
      <br/>
      <label>Motivo de Contacto <textarea className={style.textarea} rows="5" cols="50"></textarea></label>
    </div>
  )
}
