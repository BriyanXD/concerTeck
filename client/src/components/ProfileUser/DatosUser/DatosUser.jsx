import React from 'react';
import { useSelector } from 'react-redux';
import  style  from './DatosUser.module.css';

export default function DatosUser () {
    const user = useSelector(state => state.User);
    console.log("🚀 ~ file: DatosUser.jsx ~ line 7 ~ DatosUser ~ user", user)
    return (
          <div className={style.containerUser}>
            {/* <img className={style.image} src={user.picture} alt={user.name} /> */}
            {/* <h2 className={style.userData}>Nombre: {user.given_name}</h2>
            <h2 className={style.userData}>Apellido: {user.family_name}</h2> */}
            <h2 className={style.userData}>Correo: {user.email}</h2>
          </div>);
    };