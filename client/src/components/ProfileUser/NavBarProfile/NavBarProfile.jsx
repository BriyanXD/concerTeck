import React from 'react';
import style from './NavBarProfile.module.css';
import { Link } from 'react-router-dom';
import logoSombra from '../../../assets/Logo-png.png';
import PerfilYLogoutAuth0 from '../../LogoutAuth0/PerfilYLogoutAuth0';

export default function NavBarProfile () {

    return(<div className={style.containerNavBarProfile}>
         <Link to="/">
          <img className={style.logo} src={logoSombra} alt="Logo not found" />
        </Link>
            <PerfilYLogoutAuth0/>
    </div>)
}