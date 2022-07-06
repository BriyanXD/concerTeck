import React, { useState } from 'react'
import {EventById,ClearDetail,GetVenues,addCartDB, getCartDB} from '../../redux/actions'
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

//resolver problema de necesitar 2 click para agregar el evento en la base de datos

export default function Detail() {
  const {id} = useParams();
  const { addItem } = useCart();
  const user = useSelector(state => state.User);
  const cartDB = useSelector(state =>state.cartDB);
  const [flag, setFlag] = useState(false)
  let temporal = localStorage.getItem("user")
  console.log("🚀 ~ file: Detail.jsx ~ line 24 ~ Detail ~ temporal", temporal)
  let userStorage 
  if(temporal !== "nada"){
    userStorage = JSON.parse(temporal)
  }else{
    userStorage = ""
  }
  
  const dispatch =  useDispatch()
  useEffect(()=>{
     dispatch(EventById(id))
    
    return ()=>{
      dispatch(ClearDetail())
  }
  },[dispatch, id])
  
  useEffect(()=>{
    if(userStorage !== ""){
      dispatch(getCartDB(userStorage.id))
    }
    dispatch(GetVenues())
  },[dispatch])

  useEffect(()=>{
    if(userStorage !== ""){
      dispatch(getCartDB(userStorage.id))
    }
  },[flag])
  const {Detail} = useSelector((state)=> state)
  const {Venues} = useSelector((state => state))

  const [add , setAdd] =useState({
    idUser: "",
    idEvent: ""
  })
  console.log(cartDB)
  
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
  let temp;
  let estado;
    switch(data){
      case "general":
      temp = {
        idEvent:Detail.id,
        nombre:Detail.name,
        schedule:Detail.schedule,
        variant: "generalPrice",
        price:Detail.stock.generalPrice,
        performerImage: Detail.performerImage
      }
      if(!userStorage){
        addItem({...temp,id:`${Detail.id}general`})
      }else{
        estado = cartDB.find(e => e.idEvent === Detail.id && e.variant === temp.variant)
        if(!estado){
          dispatch(addCartDB({...temp, idUser:userStorage.id}))
        }
        setFlag(!flag)
      }
        return;
    case "generallateral":
      temp = {
          idEvent:Detail.id,
          nombre:Detail.name,
          schedule:Detail.schedule,
          variant: "generalLateralPrice",
          price:Detail.stock.generalLateralPrice,
          performerImage: Detail.performerImage
        } 
        if(!userStorage){
          addItem({...temp,id:`${Detail.id}generallateral`})
        }else{
          estado = cartDB.find(e => e.idEvent === Detail.id && e.variant === temp.variant)
          if(!estado){
            dispatch(addCartDB({...temp, idUser:userStorage.id}))
          }
          setFlag(!flag)
        }
        return;
    case "palco":
      temp = {
          idEvent:Detail.id,
          nombre:Detail.name,
          schedule:Detail.schedule,
          variant: "palcoPrice",
          price:Detail.stock.palcoPrice,
          performerImage: Detail.performerImage
        }
        if(!userStorage){
          addItem({...temp,id:`${Detail.id}palco`})
        }else{
          estado = cartDB.find(e => e.idEvent === Detail.id && e.variant === temp.variant)
          if(!estado){
            dispatch(addCartDB({...temp, idUser:userStorage.id}))
          }
          setFlag(!flag)
        }
        return;
    case "streaming":
          temp = {
              idEvent:Detail.id,
              nombre:Detail.name,
              schedule:Detail.schedule,
              variant: "streamingPrice",
              price:Detail.stock.streamingPrice,
              performerImage: Detail.performerImage
            }
            if(!userStorage){
              addItem({...temp,id:`${Detail.id}streaming`})
            }else{
              estado = cartDB.find(e => e.idEvent === Detail.id && e.variant === temp.variant)
              if(!estado){
                dispatch(addCartDB({...temp, idUser:userStorage.id}))
              }
              setFlag(!flag)
            }
            return;
    case "vip":
              temp = {
                  idEvent:Detail.id,
                  nombre:Detail.name,
                  schedule:Detail.schedule,
                  variant: "vipPrice",
                  price:Detail.stock.vipPrice,
                  performerImage: Detail.performerImage
                }
                if(!userStorage){
                  addItem({...temp,id:`${Detail.id}vip`})
                }else{
                  estado = cartDB.find(e => e.idEvent === Detail.id && e.variant === temp.variant)
                  if(!estado){
                    dispatch(addCartDB({...temp, idUser:userStorage.id}))
                  }
                  setFlag(!flag)
                }
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
          {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.3259476513035!2d-58.451963585088734!3d-34.545301761915844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb43ae6018ddf%3A0x3d7f60a75bfa308a!2sEstadio%20Monumental%20Antonio%20Vespucio%20Liberti!5e0!3m2!1ses-419!2sar!4v1656420898046!5m2!1ses-419!2sar" width="300" height="500" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
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
                <div>
                  <h3>Tipo de entrada: General</h3><h3>${Detail.stock.generalPrice}</h3><div><MdOutlineAddShoppingCart onClick={() => handleClick("general")} className={style.addicon}/></div> 
                  <h6>disponibles {Detail.stock.stockGeneral}</h6>
                  </div>
            </div>
            <div className={style.detailTicket}>
                <div>
                  <h3>Tipo de entrada: General Lateral</h3><h3>${Detail.stock.generalLateralPrice}</h3><div> <MdOutlineAddShoppingCart onClick={() => handleClick("generallateral")} className={style.addicon}/></div> 
                  <h6>disponibles {Detail.stock.stockGeneralLateral}</h6>
                  </div>
            </div>
            <div className={style.detailTicket}>
                <div>
                  <h3>Tipo de entrada: Palco</h3><h3>${Detail.stock.palcoPrice}</h3><div> <MdOutlineAddShoppingCart onClick={() => handleClick("palco")} className={style.addicon}/></div> 
                  <h6>disponibles {Detail.stock.stockPalco}</h6>
                  </div>
            </div>
            <div className={style.detailTicket}>
                <div>
                  <h3>Tipo de entrada: Streaming</h3><h3>${Detail.stock.streamingPrice}</h3><div> <MdOutlineAddShoppingCart onClick={() => handleClick("streaming")} className={style.addicon}/></div> 
                  <h6>disponibles {Detail.stock.stockStreaming}</h6>
                  </div>
            </div>
            <div className={style.detailTicket}>
                <div>
                  <h3>Tipo de entrada: Vip</h3><h3>${Detail.stock.vipPrice}</h3><div > <MdOutlineAddShoppingCart onClick={() => handleClick("vip")} className={style.addicon}/></div> 
                  <h6>disponibles {Detail.stock.stockkVIP}</h6>
                  </div>
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
            <Tooltip title="Agregar al carrito" arrow>
              <div className={style.add}>
            
           <MdOutlineAddShoppingCart onClick={() => handleClick(Detail)} className={style.addicon}/>
              </div>
            </Tooltip>
         </div>
           
        </div>
      <Footer/>    
    </div>
  )
}