import React from "react"
import {useSelector} from "react-redux"

export default function PerfilUserAdmin(){
    const userSaved = useSelector((state) => state.userSaved)

    return(
        <div>
            <div>
                <p>ID: {userSaved.id}</p>
                <p>Nombre: {userSaved.name}</p>
                <p>Username: {userSaved.username}</p>
                <p>Email: {userSaved.email}</p>
                {userSaved.isAdmin ? <p>Administrador</p> : null }
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