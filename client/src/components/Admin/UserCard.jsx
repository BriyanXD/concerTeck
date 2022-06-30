import { useState } from "react"
import React from "react"



export default function UserCard({id,username}){
// const usuario = useState((state) => state.adminPanel.allUsers)

    return( 
        <div>
            <button>Cerrar cesion</button>
            {/* <hr /> */}
            <button>Ver Perfil</button>
            {/* <hr /> */}
            <button>Permisos</button>
            <h4>{id}</h4>
            {/* <hr /> */}
            <h4>{username}</h4>
            {/* <hr /> */}
        </div>
    )
}