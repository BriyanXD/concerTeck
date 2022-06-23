import React from 'react';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
import Genre from '../Filters/Genre/Genre';
import SearchBar from '../SearchBar/SearchBar';
import logo from '../../assets/concerteck.jpeg';
import UserNavBar from '../UserNavbar/UserNavbar';
import Date from '../Filters/Date/Date';

export default function NavBar({setCurrenPag,setCurrentPage}) {
  return (
    <div className={style.containerNav}>
      {/* Logitipo que redirecciona a home */}
      <div className={style.Containerlogo}>
      <Link to="/">
        <img className={style.logo} src={logo} alt="Logo not found" />
      </Link>
      </div>
      <div className={style.containerGenreAndSearch}>
       <Genre setCurrenPag={setCurrenPag} setCurrentPage={setCurrentPage}/>
       <SearchBar/>
       <Date setCurrenPag={setCurrenPag} setCurrentPage={setCurrentPage}/>
      </div>
      <div>
        <Link to={"/login"}>
          <button className={style.buttonRegister} type="button">Ingresar</button>
        </Link>
      </div>
      <div className={style.containerUserNavBar}>
          <UserNavBar />
      </div>
    </div>
  )
}
