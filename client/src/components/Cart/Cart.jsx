import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getEvents } from '../../redux/actions';
import { useLocalStorage } from '../useLocalStorage/useLocalStorage';
import style from "./Cart.module.css";



export default function Cart() {
  const dispatch = useDispatch();
  const [eventsLS, seteventsLS] = useLocalStorage('eventsLS', []);
  const [events, setevents] = useState([])

  //let events = [];
  
  useEffect(() => {
    dispatch(getEvents());
    

    // return () => {
    // if(events.length<=eventsLS.length) events = eventsLS
    // console.log('events', events)
    //  // seteventsLS(events)
    if(events.length>eventsLS.length) seteventsLS(events)
    // }
  }, []);
  const {Basket, AllEvents} = useSelector((state)=> state)
  const [Tickets, setTickets] = useState([])
  //const [Ticket, setTicket] = useState([])
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(true);
    let tickets = []
    let total = 0;

   
  //  Basket.forEach(el => {
   //   AllEvents.forEach((e)=>{if(e.id===el) events.push(e);})

      Basket.forEach(el => {
        AllEvents.forEach((e)=>{if(e.id===el) setevents([...events, e]);})
                               })

//if(events.length>eventsLS.length) seteventsLS(events)
//if(events.length===0) events = eventsLS

if(flag2){
  setevents(eventsLS)
  setFlag2(false)
}
console.log('EventsLS', eventsLS)
console.log('events', events)
  tickets = Tickets.filter((e)=>(e.variant&&e.items))
  
  
  
  

  for(let i=0; i<=tickets.length; i++){
    for(let j=1+i; j<=tickets.length-1; j++){
        if(tickets[i].id===tickets[j].id&&tickets[i].variant===tickets[j].variant){
          tickets[i].items=(parseInt(tickets[i].items)+parseInt(tickets[j].items)).toString()
          tickets[j].items=''
        }
    }
  }

  function handleDelete() {
      tickets=[]
      setTickets(tickets)
   // tickets=tickets.filter((e)=>(ev.id!==e.id))
       
      
    }
    function handleDeleteItem(ev) {
      
      tickets=tickets.filter((e)=>(ev.id!==e.id)||(ev.variant!==e.variant))
      setTickets(tickets)
    
    
      
    }
    const handleDetails = () => {
      setFlag(!flag);
    };

    
  return (
    <div>
      { events?.map((el)=>{
        let ticket={}
        
        console.log('ticket',ticket)

          function handleChange(e){
            ticket = {...ticket, 
              id: el.id,
              name: el.name,
              
              [e.target.name]: e.target.value
            }
            
           
                     }
          
          function handleSubmit(e){
            e.preventDefault()
            setTickets([...Tickets, {
              ...ticket
            }
            ])
            document.getElementById(el.id).value='1'
            document.getElementById(`items+${el.id}`).value=''
            
               }
                       
          const date = el.schedule.split('T')[0]
          const time = el.schedule.split('T')[1].split(':')[0]+':'+el.schedule.split('T')[1].split(':')[1]
        return (
          <div>
              <div>{el.name}</div>
              <div>{date}</div>
              <div>{time}</div>
                <select onChange={handleChange} id={el.id}  name="variant" >
                  <option value="1">Elegir tipo de entrada...</option>
                  <option value="streaming">Streaming: $ {el.stock.streamingPrice}</option>
                  <option value="general" >General: $ {el.stock.generalPrice}</option>
                  <option value="general lateral">General lateral: $ {el.stock.generalLateralPrice}</option>
                  <option value="vip">Vip: $ {el.stock.vipPrice}</option>
                  <option value="palco">Palco: $ {el.stock.palcoPrice}</option>
                </select>
              <input onChange={handleChange} type="number" id={`items+${el.id}`} name="items" min="1" max="10"></input>
              <button id='button' type='button' onClick={handleSubmit}>Agregar</button>            
          </div>

        )  })
        }
    
        
      <div>
          { tickets?.map((e)=>{
            return(
              <div>
                <div>Evento: {e.name}</div>
              <div>Tipo de entrada: {e.variant}</div>
              <div>Cantidad:{e.items}</div>
              <button onClick={()=>handleDeleteItem(e)}>X</button>
              </div>
            )
          })

          }
      </div>
         <button onClick={handleDelete}>Vaciar</button> 
         <button onClick={handleDetails}>Detalles</button>

      {/* Detalle de compra  figuara el nombre cantidad y precio + suma total y opcion de pagar */}
      <div>
        {flag ? (
          <div className={style.containerDetails}>
            {tickets?.map((e) => {
              let price = events.find((p) => p.id === e.id);
              total = total + e.items * price.stock[e.variant];
              return (
                <div className={style.containerData}>
                  <div>Evento: {e.name}</div>
                  <div>
                    Tipo de entrada:{" "}
                    {e.variant === "streamingPrice"
                      ? "Streaming"
                      : e.variant === "generalPrice"
                      ? "General"
                      : e.variant === "generalLateralPrice"
                      ? "General lateral"
                      : e.variant === "vipPrice"
                      ? "Vip"
                      : e.variant === "palcoPrice"
                      ? "Palco"
                      : null}{" "}
                  </div>
                  <div>Cantidad:{e.items}</div>
                  <div>Precio: {price.stock[e.variant]}</div>
                  <div>Total: {e.items * price.stock[e.variant]}</div>
                  {/* <button onClick={() => handleDeleteItem(e)}>X</button> */}
                </div>
              );
            })}{" "}
            Total final: {total}
          </div>
        ) : null}
      </div>
            
    </div>
  )
}

