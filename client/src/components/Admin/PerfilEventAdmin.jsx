import React from "react"
import {useSelector} from "react-redux"

export default function PerfilEventAdmin(){
    const eventSaved = useSelector((state) => state.eventSaved)

    return(
        <div>
            <div>
                <p>ID: {eventSaved.id}</p>
                <p>Nombre: {eventSaved.name}</p>
                <p>artist: {eventSaved.artist}</p>
                <p>schedule: {eventSaved.schedule}</p>
                <p>description: {eventSaved.description}</p>
                <img src={eventSaved.performerImage} alt={eventSaved.name} />
            </div>
            <div>
                <div>
                    <p>Eventos</p>
                </div>
                <div>
                    <p>Likes</p>
                </div>
            </div>
        </div>
    )
}