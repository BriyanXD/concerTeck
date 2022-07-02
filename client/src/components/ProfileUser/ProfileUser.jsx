import React, { useState } from "react";
import style from "./Profile.module.css";
import NavBarProfile from "./NavBarProfile/NavBarProfile";
import DatosUser from './DatosUser/DatosUser';


export default function ProfileUser() {
  return (
    <div className={style.containerProfileUser}>
      <NavBarProfile />
      <div className={style.containerDataUser}>
        <DatosUser/>
      </div>
    </div>
  );
}
