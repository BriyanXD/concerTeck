import React, { useState } from 'react';
import style from './Contact.module.css';

export default function Contact() {
  const [input, setInput] = useState();

  const handleChange= (e) =>{
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }


  return (
    <div className={style.containerContact}>
      <form action='https://formsubmit.co/concerteck@gmail.com' method='POST' className={style.form}>
      <input name='name' className={style.nameContact} type='text' placeholder='Nombre o razón social...'/>
      <br/>
      <input name='email' className={style.mailContact} type='email' placeholder='Email'/>
      <br/>
      <input name='telephone' className={style.phoneContact} type='text' placeholder='Teléfono'/>
      <br/>
      <br />
      <textarea name='message' onChange={handleChange} className={style.reasonContact} type='message'  rows='5' cols='50' placeholder='Motivo de consulta'></textarea>
      <div className={style.containerbtnsend}>
      <button type='submit' className={style.btnSend}>Enviar</button>
      </div>
      </form>
    </div>
  )
}
