import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTicketById } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
// import NavBarProfile from '../ProfileUser/NavBarProfile/NavBarProfile'
import style from './TicketVoucher.module.css'



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
        date = ticket.event?.schedule !== undefined? ticket.event.schedule.split('T')[0] : null
        time = ticket.event?.schedule !== undefined ? ticket.event.schedule.split('T')[1].split(':')[0]+':'+  ticket.event?.schedule.split('T')[1].split(':')[1] :null
    }


    return(
        <div className={style.conteiner}>
            <NavBar/>
            {/* <NavBarProfile/> */}
                    <h1 className={style.entrada}>Tu Entrada</h1>
            <div className={style.contenido}>
                <div className={style.datos}>
                    <h2>Nombre del Evento: {ticket?.event?.name}</h2>
                    <h2>Nombre del/la Artista: {ticket?.event?.artist}</h2>
                    <h2>Fecha: {date}</h2>
                    <h2>Hora: {time}</h2>
                    <h2>Tu tipo de Entrada: {ticket.name}</h2>
                    <h2>Valor: ${ticket.price}</h2>
                </div>
                <div>
                    <img className={style.img} src={ticket.event?.performerImage} alt="" />
                </div>
            </div>
                    <h4 className={style.id}>Número de entrada : {ticket.id}</h4>
            <div>
            <Footer />
            </div>
        </div>
    )
}