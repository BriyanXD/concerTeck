import React from 'react'
import {EventById,ClearDetail,GetVenues,GetGenres} from '../../redux/actions'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import style from './Detail.module.css'
import { Link, useParams } from 'react-router-dom';


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
  // console.log(Detail)
  const {Venues} = useSelector((state => state))
  
  let prueba =''
  if(Detail && Venues){
    prueba = Venues.find(e => e.id === Detail.venueId)
    console.log(prueba)
  }
  return (
    <div className={style.container}>
      <NavBar/>
        <div className={style.card}>
          <img src = {Detail.performerImage} height='300' width='400'  alt={Detail.name} className={style.img}/>
          <br />
          <img src = {Detail.placeImage} height='300' width='400' alt={Detail.name} className={style.img}/>
          <div className={style.name}>{Detail.name}</div>
          <div className={style.genre}>{Detail.genre}</div>
          <div className={style.schedule}>{Detail.schedule}</div>
          <div className={style.venue}>{Venues.id}</div>
          <div className={style.prueba}>{prueba !== undefined ? prueba.name : null}</div>
          <div className={style.description}>{Detail.description}</div>
          <Link to='/'>
            <button className={style.button}>Go Home</button>
          </Link>
        </div>
      <Footer/>
    </div>
  )
}
