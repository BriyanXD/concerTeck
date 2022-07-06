import React, { useState } from 'react'
import {EventById,ClearDetail,GetVenues,addCartDB} from '../../redux/actions'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import style from './Detail.module.css'
import { Link, useParams } from 'react-router-dom';
//import Map from '../Map/Map';
import { MdDetails, MdOutlineAddShoppingCart } from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';
import { useCart } from "react-use-cart";
import Leaflet from '../Leaflet/Leaflet';
import swal from 'sweetalert';

//resolver problema de necesitar 2 click para agregar el evento en la base de datos

export default function Detail() {
  const {id} = useParams();
  const { addItem } = useCart();
  const user = useSelector(state => state.User);
  
  const dispatch =  useDispatch()
  useEffect(()=>{
     dispatch(EventById(id))
    return ()=>{
      dispatch(ClearDetail())
  }
  },[dispatch, id])
  
  useEffect(()=>{
    dispatch(GetVenues())
  },[dispatch])

  const {Detail} = useSelector((state)=> state)
  console.log("🚀 ~ file: Detail.jsx ~ line 35 ~ Detail ~ Detail", Detail)
  const {Venues} = useSelector((state => state))

  const [add , setAdd] =useState({
    idUser: "",
    idEvent: ""
  })
  
 
  // Detail["price"] = 0;
 
  let date = ''
  let time = ''
  if(Detail){
    date = Detail.schedule !== undefined? Detail.schedule.split('T')[0] : null
    time = Detail.schedule !== undefined ? Detail.schedule.split('T')[1].split(':')[0]+':'+  Detail.schedule.split('T')[1].split(':')[1] :null
  }

  let prueba =''
  if(Detail && Venues){
    prueba = Venues.find(e => e.id === Detail.venueId)
  }

  //tiene que llegar desde DB de esta misma forma con todos los datos

  const handleClick = async (data) => {
    // if(user[0]){
    //   await setAdd({
    //     idUser: user[0].id,
    //     idEvent: data.id,
    //     nombre: data.name,
    //     schedule: data.schedule
    //   })
    //   addItem(data)
    //  dispatch(addCartDB(add))
    // }else{
    //   addItem(data)
    // }

  let temp;
    switch(data){
      case "general":
      temp = {
          idUser:user[0].id,
          idEvent:Detail.id,
          nombre:Detail.name,
          schedule:Detail.schedule,
          variant: "generalPrice",
          price:Detail.stock.generalPrice,
          performerImage: Detail.performerImage
        }
        addItem({...temp,id:`${Detail.id}general`})
        dispatch(addCartDB(temp))
        return;
    case "generallateral":
      temp = {
          idUser:user[0].id,
          idEvent:Detail.id,
          nombre:Detail.name,
          schedule:Detail.schedule,
          variant: "generalLateralPrice",
          price:Detail.stock.generalLateralPrice,
          performerImage: Detail.performerImage
        }
        addItem({...temp,id:`${Detail.id}generallateral`})
        dispatch(addCartDB(temp))
        return;
    case "palco":
      temp = {
          idUser:user[0].id,
          idEvent:Detail.id,
          nombre:Detail.name,
          schedule:Detail.schedule,
          variant: "palcoPrice",
          price:Detail.stock.palcoPrice,
          performerImage: Detail.performerImage
        }
        addItem({...temp,id:`${Detail.id}palco`})
        dispatch(addCartDB(temp))
        return;
    case "streaming":
          temp = {
              idUser:user[0].id,
              idEvent:Detail.id,
              nombre:Detail.name,
              schedule:Detail.schedule,
              variant: "streamingPrice",
              price:Detail.stock.streamingPrice,
              performerImage: Detail.performerImage
            }
            addItem({...temp,id:`${Detail.id}streaming`})
            dispatch(addCartDB(temp))
            return;
    case "vip":
              temp = {
                  idUser:user[0].id,
                  idEvent:Detail.id,
                  nombre:Detail.name,
                  schedule:Detail.schedule,
                  variant: "vipPrice",
                  price:Detail.stock.vipPrice,
                  performerImage: Detail.performerImage
                }
                addItem({...temp,id:`${Detail.id}generallateral`})
                dispatch(addCartDB(temp))
                return;
    default:
      return;
    }
    
  }
  let coord = ''
  

  coord = prueba? prueba.map : '-34.545306 -58.449775'
 

  return (
    <div className={style.container}>
      <NavBar/>
        <div className={style.card}>
          <br />
        
          <img src = {Detail.placeImage} alt={Detail.name} className={style.imgPlace}/>
        <div className={style.midcontainer}>
          <div>

          <img src = {Detail.performerImage}  alt={Detail.name} className={style.img}/>
        <div className={style.carddetail}>
          <div className={style.name}>{Detail.name}</div>
          <div className={style.genre}>{Detail.genre}</div>
          <div className={style.schedule}>{date} {time}h</div>
          <div className={style.venue}>{Venues.id}</div>
          <div className={style.prueba}>{prueba !== undefined ? prueba.name : null}</div>
          <div className={style.description}>{Detail.description}</div>
          </div>
        </div>
        {/**Agregar condicional en el caso de que stock este en 0 */}
        {Detail.stock?<div className={style.containerCarrito}>
            <div className={style.detailTicket}>
            <div className={style.buttonadditem}>
                      
                  <div>General ${Detail.stock.generalPrice}</div> 
                  <div>disponibles {Detail.stock.stockGeneral}</div>
                      </div>
                  <MdOutlineAddShoppingCart onClick={() => {handleClick("general"); swal('Item agregado al carrito')}} className={style.addicon}/>
                  
            </div>
            <div className={style.detailTicket}>
               <div className={style.buttonadditem}>
                      
                  <div>General Lat. ${Detail.stock.generalLateralPrice} </div> 
                  <div>disponibles {Detail.stock.stockGeneralLateral}</div>
                </div>
                  <MdOutlineAddShoppingCart onClick={() => {handleClick("generallateral"); swal('Item agregado al carrito')}} className={style.addicon}/>
            </div>
            <div className={style.detailTicket}>
                <div className={style.buttonadditem}>

                  <div>Palco ${Detail.stock.palcoPrice} </div> 
                 <div>disponibles {Detail.stock.stockPalco}</div>
                </div>
                  <MdOutlineAddShoppingCart onClick={() =>{handleClick("palco"); swal('Item agregado al carrito')}} className={style.addicon}/>
            </div>
            <div className={style.detailTicket}>
                <div className={style.buttonadditem}>
                  <div>Streaming ${Detail.stock.streamingPrice} </div> 
                  <div>disponibles {Detail.stock.stockStreaming}</div>
                </div>
                  <MdOutlineAddShoppingCart onClick={() => {handleClick("streaming"); swal('Item agregado al carrito')}} className={style.addicon}/>
            </div>
            <div className={style.detailTicket}>
              <div className={style.buttonadditem}> 
                <div>Vip ${Detail.stock.vipPrice} </div> 
                <div>disponibles {Detail.stock.stockkVIP}</div>
              </div>
                <MdOutlineAddShoppingCart onClick={() => {handleClick("vip"); swal('Item agregado al carrito')}} className={style.addicon}/>
            </div>
        </div>:null}
        
          <Leaflet  data={coord} />
        
         </div>
         <div className={style.buttonscontainer}>

          <Link to='/'>
          <Tooltip title="Volver a Inicio" arrow>
            <button className={style.button}>Volver</button>
            </Tooltip>
          </Link>
            {/* <Tooltip title="Agregar al carrito" arrow>
              <div className={style.add}>
            
           <MdOutlineAddShoppingCart onClick={() => handleClick(Detail)} className={style.addicon}/>
              </div>
            </Tooltip> */}
         </div>
           
        </div>
      <Footer/>    
    </div>
  )
}
