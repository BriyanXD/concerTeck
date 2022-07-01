import React from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import PerfilUserAdmin from "./PerfilUserAdmin";
import AdminUserPermised from "./AdminUserPermised";
import {getAllUsers, searchUserByName,searchUserByUserName } from "../../redux/actions"
import { useEffect } from "react";

export default function AdminUserPanel(){
    const allUsers = useSelector((state) => state.stateAdminPanel?.allUsers)
    // const UserByName = useSelector((state) => state.stateAdminPanel?.UserByName)
    const UserByUserName = useSelector((state) => state.stateAdminPanel?.UserByUserName)
    const dispatch = useDispatch()

    function handleInputChange(e){
        e.preventDefault();
        // dispatch(searchUserByName())
        dispatch(searchUserByUserName(e.target.value))
    }

    // useEffect(()=>{
    //     dispatch(getAllUsers())
    // })

    return(
        <div>
            <div>
                <input type="text" placeholder="searchByname" onChange={(e) => handleInputChange(e)} />
            </div>
            <div>
                {
                UserByUserName? UserByUserName.map(user => {
                    return(
                        <div>
                            <UserCard id={user.id} username={user.username}/>
                        </div>
                    )
                }):
                allUsers ? allUsers.map(user => {
                    return( <div>
                        <UserCard id={user.id} username={user.username}/>
                    </div> )
        }): <h1>No se encontraron datos de usuarios </h1> }
            </div>
            <PerfilUserAdmin/>
            <AdminUserPermised/>
        </div>
    )
}