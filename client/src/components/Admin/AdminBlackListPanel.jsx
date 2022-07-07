import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BlackListCard from "./BlackListCard";
import PerfilEventAdmin from "./PerfilEventAdmin";
import Style from "./AdminEventPanel.module.css";
import { searchBlackList } from '../../redux/actions';

export default function AdminBlackListPanel(){
    const allBlackList = useSelector((state) => state.stateAdminPanel?.allBlackList)
    const modalEvent = useSelector((state) => state.stateAdminPanel.modalEvent)
    const tdosEvents = useSelector((state) => state.stateAdminPanel.tdosEvents)
    const dispatch = useDispatch()
    console.log('LISTA >>',allBlackList)

    function handleInputChange(e){
        dispatch(searchBlackList(e.target.value))
    }

    function handleClick(){
        document.getElementById('search').value = ''
        dispatch(searchBlackList(''))
    }

    return(
        <div className={Style.containerEvents}>
            <div className={Style.SearchBardiv}>
                <input id='search' placeholder='Buscar Usuarios Baneados' className={Style.SearchBar} type='text' onChange= {(e)=> handleInputChange(e)}/>
                <button onClick={handleClick}>x</button>
            </div>
            <div>
                {allBlackList ? allBlackList.map(user => {
                    return( <div>
                        <BlackListCard id={user.id} email={user.email}/>
                    </div> )}): <h1>No se encontraron datos</h1> }</div>
            {modalEvent ? <PerfilEventAdmin/> : <></>}
        </div>
    )
}