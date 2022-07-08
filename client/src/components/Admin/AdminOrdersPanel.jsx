import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CardOrder from "./CardOrder";
import DetailOrdersAdmin from "./DetailOrdersAdmin";
import Style from "./AdminOrdersPanel.module.css"

export default function AdminOrdersPanel(){
    const dispatch = useDispatch()
    const allTickets = useSelector(state => state.stateAdminPanel.allTickets)
    const modalOrder = useSelector(state => state.stateAdminPanel.modalOrder)

    return(
        <div className={Style.containerEvents}>
            <div className={Style.SearchBardiv}>
                <input placeholder="Buscar Tickets" className={Style.SearchBar} type="text" />
            </div>
            <div>
                { allTickets ? allTickets.map(event => {
                    return( <div>
                        <CardOrder id={event.id} name={event.name}/>
                    </div> )
        }): <h1>No se encontraron datos de eventos</h1> }
            </div>
            {modalOrder ? <DetailOrdersAdmin/> : <></>}
        </div>
    )
}