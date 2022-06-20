import React from 'react';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
import Genre from '../Filters/Genre/Genre';
import SearchBar from '../SearchBar/SearchBar';
import logo from '../../assets/concerteck.jpeg'

export default function NavBar() {
  return (
    <div className={style.containerNav}>
      {/* Logitipo que redirecciona a home */}
      <div className={style.Containerlogo}>
      <Link to="/">
        <img className={style.logo} src={logo} alt="Logo not found" />
      </Link>
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
