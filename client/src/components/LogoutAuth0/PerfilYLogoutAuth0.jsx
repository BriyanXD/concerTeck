import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from './PerfilYLogoutAuth0.module.css';
import { Link } from 'react-router-dom';
 

export default function PerfilYLogoutAuth0(){
  const {  user,
    isAuthenticated,
    logout, } = useAuth0();

  return (
    <div>
      <div className={style.container}>
      {isAuthenticated ? 
      <Link to="/perfil"><div className={style.box}>
        <img src={user.picture} alt={user.name} className={style.img}/>
       <p className={style.p}>{user.name}</p>
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

