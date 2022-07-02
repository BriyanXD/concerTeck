import React from "react";
import { useSelector } from "react-redux";
import EventCard from "./EventCard";
import PerfilEventAdmin from "./PerfilEventAdmin";

export default function AdminEventPanel(){
    const allEvents = useSelector((state) => state.AllEvents)
    return(
        <div>
            <div>
                <input type="text" />
            </div>
            <div>
                {allEvents ? allEvents.map(event => {
                    return( <div>
                        <EventCard id={event.id} name={event.name}/>
                    </div> )
        }): <h1>No se encontraron datos de eventos</h1> }
            </div>
            <PerfilEventAdmin/>
        </div>
    )
}