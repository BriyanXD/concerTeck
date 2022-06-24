import React from 'react';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
import Genre from '../Filters/Genre/Genre';
import SearchBar from '../SearchBar/SearchBar';
<<<<<<< HEAD
import logo from '../../assets/concerteck.jpeg';
import UserNavBar from '../UserNavbar/UserNavbar';
=======
import logoSombra from '../../assets/LogoSombra.png'
>>>>>>> 2a542f76effc87f734f34e8dc77934568d6e916a
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
<<<<<<< HEAD
      <div>
        <Link to={"/login"}>
          <button className={style.buttonRegister} type="button">Ingresar</button>
        </Link>
      </div>
      <div className={style.containerUserNavBar}>
          <UserNavBar />
=======
      <div className={style.registerAndLogin}>
      <button className={style.btnRegister} type="button">Crear Evento</button>
      {/* <button className={style.btnRegister} type="button">Registro</button> */}

      {/* <span className={style.logoUser}>User</span> */}
>>>>>>> 2a542f76effc87f734f34e8dc77934568d6e916a
      </div>
    </div>
  )
}
