import React from 'react';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
import Genre from '../Filters/Genre/Genre';
import SearchBar from '../SearchBar/SearchBar';
import logoSombra from '../../assets/LogoSombra.png'
import Date from '../Filters/Date/Date';

export default function NavBar({setCurrenPag,setCurrentPage}) {
  return (
    <div className={style.containerNav}>
      {/* Logitipo que redirecciona a home */}
      <div className={style.Containerlogo}>
      <Link to="/">
        <img className={style.logo} src={logoSombra} alt="Logo not found" />
      </Link>
      </div>
      <div className={style.containerGenreAndSearch}>
       <Genre setCurrenPag={setCurrenPag} setCurrentPage={setCurrentPage}/>
       <SearchBar setCurrenPag={setCurrenPag} setCurrentPage={setCurrentPage}/>
       <Date setCurrenPag={setCurrenPag} setCurrentPage={setCurrentPage}/>
      </div>
      <div className={style.registerAndLogin}>
      <Link to="/events"><button className={style.btnRegister} type="button">Crear Evento</button></Link> 
      {/* <button className={style.btnRegister} type="button">Registro</button> */}
      {/* <span className={style.logoUser}>User</span> */}
      </div>
    </div>
  )
}
