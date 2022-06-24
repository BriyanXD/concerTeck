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
  // console.log(Venues)
  const prueba = Venues.filter(e => e.id === Detail.venueId)
  console.log(prueba)
  return (
    <div>
        <div className={style.card}>
      <NavBar/>
          <img src = {Detail.placeImage} height='300' width='300' alt={Detail.name}/>
          <br />
          <img src = {Detail.performerImage} height='300' width='300'  alt={Detail.name}/>
          <div>{Detail.name}</div>
          <div>{Detail.genre}</div>
          <div>{Detail.schedule}</div>
          <div>{Venues.id}</div>
          {/* <div>{prueba[0].name}</div> */}
          {/* <div>{Detail.venueId === Venues.id ? Venues.name : 'no se encontro el recinto'}</div> */}
          <div>{Detail.description}</div>
          <Link to='/'>
            <button>Go Home</button>
          </Link>
      <Footer/>
        </div>
    </div>
  )
}
