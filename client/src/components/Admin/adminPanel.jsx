import React from "react";
import Login from "../Login/Login";
import Modal from "../Modals/Modal/Modal";
import { useState } from "react";
import UserNavBar from "../UserNavbar/UserNavbar";
import { useDispatch, useSelector } from "react-redux";
import style from './adminPanel.module.css'
import { useLocalStorage } from "../useLocalStorage/useLocalStorage";
import { getAllUsers } from "../../redux/actions";

export default function PanelAdmin({setUser}){
    const [active, setActive] = useState(false);
    const user = useSelector((state) => state.User);
    const dispatch = useDispatch()
    // useLocalStorage()

    const toggle = () => {
        setActive(!active);
    };
    
    function handleClickUser(e) {
        // e.preventDefaut();
        dispatch(getAllUsers(e))
    }
    
    
    return(
        <div>
            <div>
                <Modal active={active} toggle={toggle}>
                    <Login toggle={toggle} />
                </Modal>
                <UserNavBar />
                <div>
                    <button onClick={(e) => handleClickUser(e) }>Usuario</button>
                    <br />
                    <button>Productores</button>
                    <br />
                    <button>Eventos</button>
                    <br />
                    <button>Solicitudes</button>
                </div>
            </div>
            <div>
                <div><input type="text" /></div>
                <div>table
                    <div>
                        id
                        name
                        ...
                    </div>
                </div>
            </div>
        </div>
    )
}