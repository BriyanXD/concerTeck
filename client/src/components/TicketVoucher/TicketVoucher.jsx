import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTicketById } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
// import NavBarProfile from '../ProfileUser/NavBarProfile/NavBarProfile'
// import style from './TicketVoucher.module.css'



export default function TicketVoucher(){
    const { id } = useParams();
    const { ticket } = useSelector((state) => state);
    const { Venues } = useSelector((state) => state);
    const dispatch = useDispatch();
    
    // const lugar = Venues.find(e => e.id === ticket.event.venueId)
    // console.log(lugar)
    
    useEffect(()=>{
        dispatch(getTicketById(id))
    },[dispatch, id])

    let date ='';
    let time = '';

    if(ticket){
        date = ticket.event.schedule !== undefined? ticket.event.schedule.split('T')[0] : null
        time = ticket.event.schedule !== undefined ? ticket.event.schedule.split('T')[1].split(':')[0]+':'+  ticket.event.schedule.split('T')[1].split(':')[1] :null
    }


    return(
        <div>
            <div>
            <NavBar/>
            {/* <NavBarProfile/> */}
            </div>
            <div>
                <h2>Nombre del Evento: {ticket?.event?.name}</h2>
                <h2>Nombre del/la Artista: {ticket?.event?.artist}</h2>
                <h3>Fecha: {date}</h3>
                <h3>Hora: {time}</h3>
                <h3>Tu tipo de Entrada: {ticket.name}</h3>
                <h3>Valor: ${ticket.price}</h3>
                <div>
                    <img src={ticket.event.performerImage} alt="" />
                </div>
            </div>
            <div>
            <Footer />
            </div>
        </div>
    )
}