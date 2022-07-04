import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from './PerfilYLogoutAuth0.module.css';
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { register } from "../../redux/actions";



export default function PerfilYLogoutAuth0(){
  const dispatch = useDispatch()
  const registro = useSelector((state) => {return state.User})
  console.log(registro,'prueba')
  const { user, isAuthenticated, logout } = useAuth0();
  const navegate = useNavigate()
    
    useEffect(() => {
      findOrRegister()
    },[dispatch])

    function findOrRegister(){
      if(localStorage.getItem("userDate")){
        const userLS = JSON.parse(localStorage.getItem("userDate"))
      // if(!user){
      //   //alert("Hubo un error")
      //   navegate("/")
      } else {
        const newUser={
          username:user.nickname,
          name:user.name,
          email:user.email,
        }
        dispatch(register(newUser))
        localStorage.setItem("userDate",JSON.stringify(registro))  
      }
    }
    function clearLocalStorageToken(){
      localStorage.setItem("token"," ")
      logout({ returnTo: window.location.origin })
    }
  return (
    <div>
      <div className={style.container}>
      {registro[0]?.isAdmin===true?
       <Link to={'/perfil/panelAdmin'} style={{ textDecoration: "none", color: "inherit" }}>
         <div className={style.box}>
            <img src={user?.picture} alt={user.name} className={style.img}/>
       <p className={style.p}>{user.name}</p>
       </div> 
        </Link> 
      :
      register?isAuthenticated ?
          <Link to={`/perfil/${registro[0]?.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div className={style.box}>
            <img src={user?.picture} alt={user.name} className={style.img}/>
       <p className={style.p}>{user.name}</p>
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