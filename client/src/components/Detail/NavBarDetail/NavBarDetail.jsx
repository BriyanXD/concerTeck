import React from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import PerfilYLogoutAuth0 from '../../LogoutAuth0/PerfilYLogoutAuth0';
import style from './navBarD.module.css';
import NavBarProfile from '../../ProfileUser/NavBarProfile/NavBarProfile';
import logoSombra from "../../../assets/LogoSombra.png";

export default function NavBarDetail(){

    const {user, loginWithPopup, logout, isAuthenticated, } = useAuth0();
    
    function handlerLogin(){
        loginWithPopup()
      }
    
    return(
        <div className={style.container}>
            <div className={style.Containerlogo}>
        <Link to="/">
          <img className={style.logo} src={logoSombra} alt="Logo not found" />
        </Link>
            </div>
        {
        !user ? <button onClick={() => handlerLogin()} className={style.button}>Ingresa</button> : 
        <div className={style.perfil}>
            <PerfilYLogoutAuth0/>
        </div>
        },
        
      </div>
      )
}
