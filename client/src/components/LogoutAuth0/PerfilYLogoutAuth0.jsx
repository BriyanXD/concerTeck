import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from './PerfilYLogoutAuth0.module.css';
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { register } from "../../redux/actions";


export default function PerfilYLogoutAuth0(){
  const dispatch = useDispatch()
  const registro = useSelector((state) => {return state.User})
  const { user, isAuthenticated, logout } = useAuth0();
  const userdates = JSON.parse(localStorage.getItem("userdates"))
    useEffect(() => {
      findOrRegister()
    },[dispatch])

    function findOrRegister(){
      console.log(user, "USER")
      console.log(userdates.nickname, "USERSAVE")
      const newUser={
        username: userdates.nickname,
        name: userdates.name,
        email: userdates.email,
      }
      dispatch(register(newUser))
    }
    function clearLocalStorageToken(){
      localStorage.setItem("token"," ");
      localStorage.setItem("user", "nada");
      logout({ returnTo: window.location.origin })
    }
  return (
    <div>
      <div className={style.container}>
      {registro[0]?.isAdmin===true?
       <Link to={'/perfil/panelAdmin'} style={{ textDecoration: "none", color: "inherit" }}>
         <div className={style.box}>
            <img src={userdates?.picture} alt={userdates.name} className={style.img}/>
       <p className={style.p}>{userdates.name}</p>
       </div> 
        </Link> 
      :
      register?isAuthenticated ?
          <Link to={`/perfil/${registro[0]?.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div className={style.box}>
            <img src={userdates?.picture} alt={userdates.name} className={style.img}/>
       <p className={style.p}>{userdates.name}</p>
       </div> 
       </Link> 
      /*  :  registro?.isAdmin===true ?
      //  <Link to={'/perfil/panelAdmin'} style={{ textDecoration: "none", color: "inherit" }}>
      //    <div className={style.box}>
      //       <img src={user?.picture} alt={user.name} className={style.img}/>
      //  <p className={style.p}>{user.name}</p>
      //  </div> 
        </Link> */ : null : null
      }
       <button onClick={() => clearLocalStorageToken()} className={style.button}>
       Log Out
       </button>
      </div>
        
    </div>
  );
};