import React from 'react';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
import Genre from '../Filters/Genre/Genre';
import SearchBar from '../SearchBar/SearchBar';

export default function NavBar() {
  return (
    <div className={style.containerNav}>
      {/* Logitipo que redirecciona a home */}
      <div className={style.logo}>
      <Link to="/">Logo</Link>
      </div>
      <div className={style.containerGenreAndSearch}>
       <Genre/>
       <SearchBar/>
      </div>
      <div>
      <button className={style.buttonRegister} type="button">Registro</button>
      <span className={style.logoUser}>User</span>
      </div>

    </div>
  )
}
