import { useState } from "react"
import React from "react"



export default function UserCard({id,username}){
const usuario = useState((state) => state.adminPanel.allUsers)

    return( 
        <div>
            <p>{id}</p>
            <hr />
            <p>{username}</p>
            <hr />
            <button>Cerrar cesion</button>
            <hr />
            <button>Ver Perfil</button>
            <hr />
            <button>Permisos</button>
        </div>
    )
}