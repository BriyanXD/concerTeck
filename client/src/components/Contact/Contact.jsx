import React, { useState } from 'react';
import style from './Contact.module.css';

function validate (input){
  const error = {};
  if(!input.name){
    error.name = 'Por favor ingrese un nombre válido'
  }
  if(!input.message){
    error.message ='Por favor ingrese su consulta'
  }
  if(/[$%&|<>#]/.test(input.message)){
    error.message = 'Mensaje no inválido'
  }
  if(!input.email){
    error.email = 'Por favor ingrese un email válido'
  } 
  if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(input.email)){
    error.email= 'Por favor ingrese un email válido'
  }
  if(!input.telephone){
    error.telephone = 'Teléfono obligatorio'
  }
  if(! /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(input.telephone)){
    error.telephone = 'Ingrese característica y número válido'
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
          <input onChange={(e) => handleInputChange(e)} value={input.name} name='name' className={error.name?.length > 0 ? style.errors : style.nameContact} type='text' 
          placeholder={error.name?.length > 0 ? error.name : 'Nombre o razón social...'}/>
        </div>
      <br/>
      <div>
        <input onChange={(e) => handleInputChange(e)} value={input.email} name='email' className={error.email?.length > 0 ? style.errors : style.mailContact} type='email' 
        placeholder={error.email?.length > 0 ? error.email : 'Email'}/>
      </div>
      <br/>
      <div>
      <input onChange={(e) => handleInputChange(e)} value={input.telephone} name='telephone' className={error.telephone?.length > 0 ? style.errors : style.phoneContact} type='text' 
      placeholder={error.telephone?.length > 0 ? error.telephone : 'Teléfono'}/>
      </div>
      <br/>
  
      <div>
        <textarea onChange={(e) => handleInputChange(e)} name='message' className={error.message?.length > 0 ? style.errorMessage : style.reasonContact} value={input.message} type='message'  rows='5' cols='50' 
        placeholder={error.message?.length > 0 ? error.message : 'Motivo de consulta'}></textarea>
      </div>
          {/* {
            error.message && (<p className={style.errores}>{error.message}</p>)
          } */}
          {/* {
            error.telephone && (<p className={style.errores}>{error.telephone}</p>)
          } */}
      {
        // error.name && (<p className={style.errores}>{error.name}</p>)
      }
      {
        // error.email && (<p className={style.errores}>{error.email}</p>)
      }
      <div className={style.containerbtnsend}>
      <button disabled={!(Object.keys(error).length===0) || !input.name || !input.message || !input.email || !input.telephone} type='submit' className={style.btnSend}>Enviar</button>
      </div>
      </form>
    </div>
  )
}
