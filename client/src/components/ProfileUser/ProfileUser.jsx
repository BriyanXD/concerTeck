import React, { useState } from "react";
import style from "./Profile.module.css";
import NavBarProfile from "./NavBarProfile/NavBarProfile";
import RegisterEvent from "../RegisterEvent/RegisterEvents";
import DatosUser from './DatosUser/DatosUser';

export default function ProfileUser() {
  let [active, setActive] = useState({
    data: true,
    favorite: false,
    event: false,
    shop: false,
    configuration: false,
  });

  const change = (name) => {
    switch(name){
      case "Event":
        return setActive({
          data: false,
          favorite: false,
          event: true,
          shop: false,
          configuration: false})
      case "Data":
          return setActive({
            data: true,
            favorite: false,
            event: false,
            shop: false,
            configuration: false})
      case "Favorite":
          return setActive({
            data: false,
            favorite: true,
            event: false,
            shop: false,
            configuration: false})
      case "Carrito":
          return setActive({
            data: false,
            favorite: false,
            event: false,
            shop: true,
            configuration: false})
      case "Configuration":
          return setActive({
            data: false,
            favorite: false,
            event: false,
            shop: false,
            configuration: true})
      default:
        return
    }
  }

  return (
    <div className={style.containerProfileUser}>
      <NavBarProfile change={change} />
      <div className={style.containerDataUser}>
        {active.data? <DatosUser/>: null}
        {active.event? <RegisterEvent/>: null}
        {active.favorite? <h3>Hello Favorite</h3>: null}
        {active.shop? <h3>Hello Shop</h3>: null}
        {active.configuration? <h3>Hello configuratión</h3>: null}
      </div>
    </div>
  );
}
