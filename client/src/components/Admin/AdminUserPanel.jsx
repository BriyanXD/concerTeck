import React from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import PerfilUserAdmin from "./PerfilUserAdmin";
import AdminUserPermised from "./AdminUserPermised";

export default function AdminUserPanel(){
    const allUsers = useSelector((state) => state.stateAdminPanel?.allUsers)

    return(
        <div>
            <div>
                <input type="text" />
            </div>
            <div>
                {allUsers ? allUsers.map(user => {
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