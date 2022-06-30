import React from 'react';
import { useSelector } from 'react-redux';

export default function DatosUser () {

    const user = useSelector(state => state.User);

    return(<div>
       {user ? <h3> Nombre de usuario: {user[1].username}</h3>: null}
       {user ? <h3> Correo electronico: {user[1].email}</h3>: null}
    </div>)
}