import React from 'react'
import {EventById,ClearDetail,GetVenues,GetGenres, AddToBasket} from '../../redux/actions'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import style from './Detail.module.css'
import { Link, useParams } from 'react-router-dom';
import Map from '../Map/Map';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';


export default function Detail() {
  // const id = props.match.params.id;
  const {id} = useParams();
  // console.log(id);
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

  // useEffect(()=>{
  //   dispatch(GetGenres())
  // },[])

  const {Detail} = useSelector((state)=> state)
  console.log(Detail)
  const {Venues} = useSelector((state => state))
  const {Basket} = useSelector((state)=> state)
  console.log('Basket',Basket)
  
  let date = ''
  let time = ''
  if(Detail){
    date = Detail.schedule !== undefined? Detail.schedule.split('T')[0] : null
    console.log(date)
    time = Detail.schedule !== undefined ? Detail.schedule.split('T')[1].split(':')[0]+':'+  Detail.schedule.split('T')[1].split(':')[1] :null
    console.log(time)
  }
  console.log(Detail.schedule)

  let prueba =''
  if(Detail && Venues){
    prueba = Venues.find(e => e.id === Detail.venueId)
    console.log(prueba)
  }

  
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
          {/* <div className={style.schedule}>{Detail.schedule}</div> */}
          <div className={style.venue}>{Venues.id}</div>
          <div className={style.prueba}>{prueba !== undefined ? prueba.name : null}</div>
          <div className={style.description}>{Detail.description}</div>
          </div>
        </div>
        

          <Map data='-34.545306 -58.449775'/>
        
         </div>
         <div className={style.buttonscontainer}>

          <Link to='/'>
          <Tooltip title="Volver a Inicio" arrow>
            <button className={style.button}>Volver</button>
            </Tooltip>
          </Link>
            <Tooltip title="Agregar al carrito" arrow>
              <div className={style.add}>

           <MdOutlineAddShoppingCart onClick={()=>dispatch(AddToBasket(Detail.id))} className={style.addicon}/>
              </div>
            </Tooltip>
         </div>
           
        </div>
      <Footer/>
        

        
    </div>
  )
}
