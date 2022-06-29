import React from 'react';
import { useSelector } from 'react-redux';

export default function DatosUser () {

    const user = useSelector(state => state.User);
    // name: "",
    // lastname: "",
    // username: "",
    // cuit_cuil: undefined,
    // email: "",
    // cbu: undefined,
    // password: "",
    // repeatPassword: "",
    // telephone: undefined,
    // company: "",
    return(<div>
       {user[0] === "Productor" ? <h3> Nombre: {user[1].name}</h3>: null}
       {user[0] === "Productor" ? <h3> Apellido: {user[1].lastname}</h3>:null}
       {user ? <h3> Nombre de usuario: {user[1].username}</h3>: null}
       {user[0] === "Productor" ? <h3> cuit_cuil: {user[1].cuit_cuil}</h3>: null}
       {user ? <h3> Correo electronico: {user[1].email}</h3>: null}
       {user[0] === "Productor" ? <h3> cbu: {user[1].cbu}</h3>: null}
       {user ? <h3> password: {user[1].password}</h3>: null }
       {user[0] === "Productor" ? <h3> Telefono: {user[1].telephone}</h3>: null}
       {user[0] === "Producotr" ? user[0].company? <h3>Compania: {user[1].company}</h3>: null: null}
    </div>)
}