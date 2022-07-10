import React from "react";
import style from "./Profile.module.css";
import NavBarProfile from "./NavBarProfile/NavBarProfile";
import Cart from '../Cart/Cart';
import { Link } from "react-router-dom";




export default function ProfileUser() {
  return (
    <div className={style.containerProfileUser}>
      <NavBarProfile />
      <div className={style.containerDataUser}>
      <Cart/>
      </div>
      <div className={style.containerBtn}>
        <Link to='/'>
            <button className={style.buttonBack}>Volver</button>
        </Link>
      </div>
    </div>
  );
}
