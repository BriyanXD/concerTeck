import React from 'react'
import {EventById,ClearDetail} from '../../redux/actions'
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

  const event = useSelector((state)=> state.Detail)
  return (
    <div>
      <NavBar/>
        <div className={style.card}>
          <img src = {event.placeImage} height='300' width='300' alt={event.name}/>
          <br />
          <img src = {event.performerImage} height='300' width='300'  alt={event.name}/>
          <div>{event.name}</div>
          <div>{event.genre}</div>
          <div>{event.schedule}</div>
          <div>{event.address}</div>
          <div>{event.description}</div>
          <Link to='/'>
            <button>Go Home</button>
          </Link>
        </div>
      <Footer/>
    </div>
  )
}
