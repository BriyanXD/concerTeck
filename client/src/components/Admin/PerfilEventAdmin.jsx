import React,{ useState } from "react"
import {useSelector, useDispatch} from "react-redux"
import Style from "./PerfilEventAdmin.module.css"
import { activeModalEventsAdminPanel,putUrlStreamingEvent } from "../../redux/actions"
import BarGraph from "../BarGraph/BarGraph"
import PolarGraph from "../PolarGraph/PolarGraph"
import LikesAdminPanel from "./LikesAdminPanel/LikesAdminPanel"
import swal from 'sweetalert'

export default function PerfilEventAdmin(){

    const [urlStreaming, setUrlStreaming] = useState()
    const eventSaved = useSelector((state) => state.eventSaved)
    const putUrlStreaming = useSelector((state) => state.stateAdminPanel.putUrlStreaming)
    const dispatch = useDispatch()

    function andlerCloseButton(){
        dispatch(activeModalEventsAdminPanel(false))
    }
    function handlerUrlStreamingClic(){
        if(!urlStreaming){
            return swal({
                title: 'Faltan datos',
                text: 'Ingrese una URL',
                icon: 'error',
                dangerMode:true

        })
        }
        dispatch(putUrlStreamingEvent(urlStreaming,eventSaved.id))
        if(putUrlStreaming){
            return swal({
                title: 'URL de streaming',
                text: 'Se agrego con exito',
                icon: 'success',
            })
        }else{
            return swal({
                title: 'URL de streaming',
                text: 'No se agrego con exito',
                icon: 'error',
                dangerMode:true

        })
    }
}
    function handlerUrlStreamingInput(value){
        setUrlStreaming(value)
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
                    <div className={Style.containerdate}><span className={Style.dataone}>Streaming:</span><input type="text" placeholder="URL" value={eventSaved.streaming} onChange={(e)=> {handlerUrlStreamingInput(e.target.value)}}/><button onClick={handlerUrlStreamingClic}>Guargar</button></div>
                   </div>
                   <div>
                   <LikesAdminPanel idEvent={eventSaved}/>
                   <PolarGraph event={eventSaved}/>
                   </div>
                </div>
            </div>
        </div>
    )
}