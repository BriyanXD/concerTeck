import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import style from "./UserNavbar.module.css";
import profile from "../../assets/profile-user.png";

export default function UserNavBar() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.User)
    console.log(user[0])
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
      {menuOpen && (
        <div className={style.userList}>
          {user[0] !== undefined ? <h3>{user[0].username}</h3>:null}
          <h3 className={style.list}>Configuración</h3>
          {user[0] !== undefined ? <h3>Cerrar sesión</h3>: null}
        </div>
      )}
    </div>
  );
}
