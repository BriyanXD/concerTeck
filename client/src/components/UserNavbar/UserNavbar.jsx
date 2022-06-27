import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import style from "./UserNavbar.module.css";
import profile from "../../assets/profile-user.png";
import { LogOut } from '../../redux/actions';

export default function UserNavBar() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.User)
    console.log("🚀 ~ file: UserNavbar.jsx ~ line 11 ~ UserNavBar ~ user", user)
    
    const [menuOpen, setMenuOpen] = useState(false);

  //Function toma la accion de click si el id es distinto a menu
  document.addEventListener("click", function (event) {
    if (event.target.id !== "menu") {
      setMenuOpen(false);
    }
  });

  return (
    <div
      className={style.navProfilePhoto}
    >
      <img id="menu"  className={style.image} src={profile} alt="image not found"  onClick={() => setMenuOpen(!menuOpen)} />
      {menuOpen && 
        (<div className={style.userList}>
          {user[1] !== undefined ? <h3 className={style.list}>{user[1].username}</h3>:null}
          <h3 className={style.list}>Configuración</h3>
          {user[1] !== undefined ? <h3 className={style.list}>Tipo de cuenta: {user[0]}</h3>: null}
          {user !== "" ? <h3 className={style.list} onClick={() => dispatch(LogOut())}>Cerrar sesión</h3>: null}
          {user[0] === "Productor" ? <Link to="/events" style={{ textDecoration: 'none', color: 'inherit'  }}><h3 className={style.list}>Anunciar Evento</h3></Link> : null}
        </div>)}
    </div>
  );
}
