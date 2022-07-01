import React from 'react';
import style from './NavBarProfile.module.css';
import { Link } from 'react-router-dom';
import logoSombra from '../../../assets/Logo-png.png';
import { useAuth0 } from "@auth0/auth0-react";

export default function NavBarProfile ({change}) {

    const { logout } = useAuth0();

    return(<div className={style.containerNavBarProfile}>
         <Link to="/">
          <img className={style.logo} src={logoSombra} alt="Logo not found" />
        </Link>
        <div className={style.containerDatos}>
            <h3 onClick={() => change("Data")} className={style.btnInfo}>Datos Personales</h3>
            <h3 onClick={() => change("Favorite")} className={style.btnInfo}>Favoritos</h3>
            <h3 onClick={() => change("Carrito")} className={style.btnInfo}>Carrito</h3>
            <h3 onClick={() => change("Configuration")} className={style.btnInfo}>Configuración</h3>
            <h3 onClick={() => logout({ returnTo: window.location.origin })} className={style.btnInfo}>Cerrar sesión</h3>
        </div>
    </div>)
}