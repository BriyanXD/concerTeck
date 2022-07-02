import React from "react"
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, findUser, findUser2, getAllUsers } from "../../redux/actions";
import swal from 'sweetalert'
import Style from "./UserCard.module.css"

export default function UserCard({id,username,aux}){
    let userSaved = []
    const dispatch = useDispatch()
    const UserByUserName = useSelector((state) => state.stateAdminPanel?.UserByUserName)
    const userDeleted = useSelector((state) => state.userDeleted)
    const allUsers = useSelector((state) => state.stateAdminPanel?.allUsers)
    console.log(userDeleted)

function filterUser(){
    if(aux){
        dispatch(findUser(UserByUserName, id))
    }else{
        dispatch(findUser(allUsers, id))
    }
}

function handlerDeleteUser(){
         dispatch(deleteUser(id))
        if(userDeleted?.message){
            return swal({
                title: 'Usuario no eliminado',
                text: 'El usuario no se elimino',
                icon: 'error',
                dangerMode:true
            })
        }else{
            return swal({
                title: 'Usuario eliminado',
                text: 'El usuario se elimino con exito',
                icon: 'success',
            }),dispatch(getAllUsers())
        }
    }

    return(
        <div className={Style.cardEvent}>
            <p>{id}</p>
            <p>{username}</p>
            <button onClick={handlerDeleteUser}>Borrar</button>
            <button onClick={filterUser}>Ver Perfil</button>
            <button>Permisos</button>
            <hr />
        </div>
    )
}