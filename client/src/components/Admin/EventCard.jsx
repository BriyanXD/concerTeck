import React from "react"
import { useSelector, useDispatch } from "react-redux";
import { findEvent, getEvents, deleteEvents } from "../../redux/actions";
import swal from 'sweetalert'

export default function EventCard({id,name}){

    const dispatch = useDispatch()
    /* const userDeleted = useSelector((state) => state.userDeleted) */
    const allevents = useSelector((state) => state?.AllEvents)
    const eventDeleted = useSelector((state) => state.eventDeleted)
    

function filterEvent(){
    dispatch(findEvent(allevents, id))
}

function handlerDeleteEvent(){
         dispatch(deleteEvents(id))
        if(eventDeleted?.message){
            return swal({
                title: 'Evento no eliminado',
                text: 'El evento no se pudo eliminar',
                icon: 'error',
                dangerMode:true
            })
        }else{
            return swal({
                title: 'Evento eliminado',
                text: 'El evento se eliminó',
                icon: 'success',
            }),dispatch(getEvents())
        }
    }

    return(
        <div>
            <p>{id}</p>
            <p>{name}</p>
            <button onClick={handlerDeleteEvent}>Borrar</button>
            <button onClick={filterEvent}>Detalles</button>
            <hr />
        </div>
    )
}