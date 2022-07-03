import React from "react";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "./EventCard";
import PerfilEventAdmin from "./PerfilEventAdmin";
import Style from "./AdminEventPanel.module.css"

export default function AdminEventPanel(){
    const allEvents = useSelector((state) => state.AllEvents)
    const modalEvent = useSelector((state) => state.stateAdminPanel.modalEvent)


    return(
        <div className={Style.containerEvents}>
            <div className={Style.SearchBardiv}>
                <input placeholder="Buscar Eventos" className={Style.SearchBar} type="text" />
            </div>
            <div>
                {allEvents ? allEvents.map(event => {
                    return( <div>
                        <EventCard id={event.id} name={event.name}/>
                    </div> )
        }): <h1>No se encontraron datos de eventos</h1> }
            </div>
            {modalEvent ? <PerfilEventAdmin/> : <></>}
        </div>
    )
}