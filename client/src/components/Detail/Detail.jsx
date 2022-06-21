import React from 'react'
import {getEventDetail} from '../../redux/actions'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Detail(props) {
  const id = props.match.params.id; 
  const dispatch =  useDispatch()
  useEffect(()=>{
    dispatch(getEventDetail(id))
  },[dispatch, id])

  const event = useSelector((state)=> state.detail)
  return (
    <div>
      <div className={style.card}>
            <img src = {event.image} alt={event.name}/>
            <div>{event.name}</div>
            <div>{event.genre}</div>
            <div>{event.schedule}</div>
            <div>{event.address}</div>
            <div>{event.description}</div>
            <iframe className={style.map} src={map} />
          </div>

    </div>
  )
}
