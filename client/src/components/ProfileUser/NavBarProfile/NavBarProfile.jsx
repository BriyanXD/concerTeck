import React from 'react';
import style from './NavBarProfile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from '../../../redux/actions';
import logoSombra from '../../../assets/Logo-png.png';

export default function NavBarProfile ({change}) {

    const user = useSelector(state => state.User);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return(<div className={style.containerNavBarProfile}>
         <Link to="/">
          <img className={style.logo} src={logoSombra} alt="Logo not found" />
        </Link>
            <h3 className={style.btnInfo}>Tipo de cuenta: {user[0]}</h3>
        <div className={style.containerDatos}>
            <h3  onClick={() => change("Data")} className={style.btnInfo}>Datos Personales</h3>
            <h3 onClick={() => change("Favorite")} className={style.btnInfo}>Favoritos</h3>
           {user[0] === "Productor" ?<h3 onClick={() => change("Event")} className={style.btnInfo}>Anunciar evento</h3>: null}
            <h3 onClick={()=> change("Carrito")} className={style.btnInfo}>Carrito</h3>
            <h3 onClick={()=> change("Configuration")} className={style.btnInfo}>Configuración</h3>
            {user !== "" ? (<h3 className={style.btnInfo} onClick={() => dispatch(LogOut()) && navigate("/")}>Cerrar sesión</h3>) : null}
        </div>
    </div>)
}