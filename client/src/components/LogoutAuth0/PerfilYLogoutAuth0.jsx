import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from './PerfilYLogoutAuth0.module.css';
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux"
import { register } from "../../redux/actions";

export default function PerfilYLogoutAuth0(){
  const dispatch = useDispatch()
  const {  user,
    isAuthenticated,
    logout, } = useAuth0();
    useEffect(() => {
      findOrRegister()
    },[dispatch])


    function findOrRegister(){
      const newUser={
        username:user.nickname,
        name:user.name,
        email:user.email,
      }
      dispatch(register(newUser))
    }
  return (
    <div>
      <div className={style.container}>
      {isAuthenticated ? 
       <div className={style.box}>
        <img src={user.picture} alt={user.name} className={style.img}/>
       <Link to="/perfil">
       <p className={style.p}>{user.name}</p>
       </Link>
       </div> 
       : null
      }
       <button onClick={() => logout({ returnTo: window.location.origin })} className={style.button}>
       Log Out
       </button>
      </div>
        
    </div>
  );
};
