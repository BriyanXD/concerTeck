import React from "react"
import {useSelector, useDispatch} from "react-redux"
import Style from "./PerfilEventAdmin.module.css"
import { activeModalEventsAdminPanel } from "../../redux/actions"
import BarGraph from "../BarGraph/BarGraph"
import PolarGraph from "../PolarGraph/PolarGraph"

export default function PerfilEventAdmin(){
    const eventSaved = useSelector((state) => state.eventSaved)
    const dispatch = useDispatch()
    function andlerCloseButton(){
        dispatch(activeModalEventsAdminPanel(false))
    }

    return(
        <div className={Style.containerGeneral}>
            <div className={Style.containerInfo}>
                <div className={Style.containerClose}>
                    <button onClick={andlerCloseButton} className={Style.btnClose}>X</button>
                </div>
                <p className={Style.name}>{eventSaved.name}</p>
                <BarGraph event={eventSaved}/>
                <div className={Style.info}>
                   <div className={Style.containerdatediv}>
                   <div className={Style.containerdate}><span className={Style.dataone}>ID:</span><span>{eventSaved.id}</span></div>
                    <div className={Style.containerdate}><span className={Style.dataone}>Artist:</span><span>{eventSaved.artist}</span></div>
                    <div className={Style.containerdate}><span className={Style.dataone}>Schedule:</span><span>{eventSaved.schedule}</span></div>
                    <div className={Style.containerdate}><span className={Style.dataone}>Description:</span><span>{eventSaved.description}</span></div>
                   </div>
                   <div>
                   <PolarGraph event={eventSaved}/>
                   </div>
                </div>
            </div>
        </div>
    )
}