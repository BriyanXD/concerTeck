import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import  style  from './DatosUser.module.css';

export default function DatosUser () {
    const { user, isAuthenticated, isLoading } = useAuth0();
    if (isLoading) {
        return <div>Loading ...</div>;
      }
    return (
        isAuthenticated && (
          <div className={style.containerUser}>
            <img className={style.image} src={user.picture} alt={user.name} />
            <h2 className={style.userData}>Nombre: {user.given_name}</h2>
            <h2 className={style.userData}>Apellido: {user.family_name}</h2>
            <h2 className={style.userData}>Correo: {user.email}</h2>
          </div>
        )
      );
    };