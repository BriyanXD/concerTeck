import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from './PerfilYLogoutAuth0.module.css';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
 
=======
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux"
import { register } from "../../redux/actions";
>>>>>>> 2dbdb1b06d8c28ac2aa5305c88f3b87a96f56348

export default function PerfilYLogoutAuth0(){
  const dispatch = useDispatch()
  const {  user,
    isAuthenticated,
    logout, } = useAuth0();
    console.log("User:",user)

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
      <Link to="/perfil"><div className={style.box}>
        <img src={user.picture} alt={user.name} className={style.img}/>
       <Link to="/perfil">
       <p className={style.p}>{user.name}</p>
       </Link>
       </div> 
       </Link> 
       : null
      }
       <button onClick={() => logout({ returnTo: window.location.origin })} className={style.button}>
       Log Out
       </button>
      </div>
        
    </div>
  );
};
console.log('hola')
