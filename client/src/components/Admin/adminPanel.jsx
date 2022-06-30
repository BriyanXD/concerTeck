import React from "react";
import Login from "../Login/Login";
import Modal from "../Modals/Modal/Modal";
import { useState } from "react";
import UserNavBar from "../UserNavbar/UserNavbar";
import { useDispatch, useSelector } from "react-redux";
import style from './adminPanel.module.css'
import { useLocalStorage } from "../useLocalStorage/useLocalStorage";
import { getAllUsers } from "../../redux/actions";
// import CardConteiner from "./adminCardConteiner";
import { useEffect } from "react";
import UserCard from './UserCard'

export default function PanelAdmin({setUser}){
    const [active, setActive] = useState(false);
    const user = useSelector((state) => state.User);
    const dispatch = useDispatch()
    const usuario = useState((state) => state.adminPanel.allUsers)
    // const token = useSelector((state) => state.token);
    // useLocalStorage()

    const toggle = () => {
        setActive(!active);
    };
    
    // useEffect ((=>{
    //     dispatch()
    // }))

    function handleClickUser() {
        // e.preventDefaut();
        // console.log(token)
        dispatch(getAllUsers())
    }
    
    return(
        <div>
            <div>
                <Modal active={active} toggle={toggle}>
                    <Login toggle={toggle} />
                </Modal>
                <UserNavBar />
                <div>
                    <button onClick={() => handleClickUser()}>Usuario</button>
                    <br />
                    <button>Productores</button>
                    <br />
                    <button>Eventos</button>
                    <br />
                    <button>Solicitudes</button>
                </div>
            </div>
            <div>
            <div>
            {
                usuario?.map((e,k) =>{
                    return(
                        <div>
                            <UserCard key={k} id={e.id} username={e.username}/>
                        </div>
                    )
                })
            }
        </div>
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