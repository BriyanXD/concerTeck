import React, { useState } from 'react';
import style from './Contact.module.css';

function validate (input){
  const error = {};
  if(!input.name){
    error.name = 'Campo obligatorio'
  }
  if(!input.message){
    error.message ='Campo obligatorio'
  }
  if(/[$%&|<>#]/.test(input.message)){
    error.message = 'Mensaje no invalido'
  }
  if(!input.email){
    error.email = 'Campo obligatorio'
  } 
  if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(input.email)){
    error.email= 'Ingrese un email valido'
  }
  if(!input.telephone){
    error.telephone = 'Campo obligatorio'
  }
  if(! /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(input.telephone)){
    error.telephone = 'Ingrese caracteristica y numero valido'
  }
  return error;
}


export default function Contact() {
  const[input,setInput] = useState({name:'',email:'',telephone:'',message:''})
  const[error,setError] = useState({})
  // const[button,setButton] = false
  
  function handleInputChange(e){
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setError(validate({
      ...input,
      [e.target.name]: e.target.value,
    }))
  }


  return (
    <div className={style.containerContact}>
      <form action='https://formsubmit.co/concerteck@gmail.com' method='POST' className={style.form}>
        <div>
          <input onChange={(e) => handleInputChange(e)} value={input.name} name='name' className={style.nameContact} type='text' placeholder='Nombre o razón social...'/>
          {
            error.name && (<p className={style.errores}>{error.name}</p>)
          }
        </div>
      <br/>
      <div>
        <input onChange={(e) => handleInputChange(e)} value={input.email} name='email' className={style.mailContact} type='email' placeholder='Email'/>
          {
            error.email && (<p className={style.errores}>{error.email}</p>)
          }
      </div>
      <br/>
      <div>
      <input onChange={(e) => handleInputChange(e)} value={input.telephone} name='telephone' className={style.phoneContact} type='text' placeholder='Teléfono'/>
          {
            error.telephone && (<p className={style.errores}>{error.telephone}</p>)
          }
      </div>
      <br/>
      <br />
      <div>
        <textarea onChange={(e) => handleInputChange(e)} name='message' className={style.reasonContact} value={input.message} type='message'  rows='5' cols='50' placeholder='Motivo de consulta'></textarea>
          {
            error.message && (<p className={style.errores}>{error.message}</p>)
          }
      </div>
      <div className={style.containerbtnsend}>
      <button disabled={!(Object.keys(error).length===0) || !input.name || !input.message || !input.email || !input.telephone} type='submit' className={style.btnSend}>Enviar</button>
      </div>
      </form>
    </div>
  )
}
