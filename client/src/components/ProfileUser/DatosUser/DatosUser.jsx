import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import  style  from './DatosUser.module.css';


export default function DatosUser () {
  const {
    user,
  } = useAuth0();
  
  // console.log("user2", user)
  
  // const user = useSelector(state => state.User);
  const userdates = JSON.parse(localStorage.getItem("userdates"))
  console.log(userdates, "userdate")

    return (

           <div>
            <h4 className={style.userData}>Correo: {user.email}</h4>
            {/* <h5>Nombre: {user.name}</h5> */}
          </div>
          )

    };