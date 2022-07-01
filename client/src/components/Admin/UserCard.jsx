import React from "react"



export default function UserCard({id,username}){

    return(
        <div>
            <p>{id}</p>
            <p>{username}</p>
            <button>Cerrar Sesión</button>
            <button>Ver Perfil</button>
            <button>Permisos</button>
            <hr />
        </div>
    )
}