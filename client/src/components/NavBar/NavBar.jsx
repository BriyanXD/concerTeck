import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import Genre from "../Filters/Genre/Genre";
import SearchBar from "../SearchBar/SearchBar";
import logoSombra from "../../assets/LogoSombra.png";
import Date from "../Filters/Date/Date";
import UserNavBar from "../UserNavbar/UserNavbar";
import Modal2 from "../Modals/Modal/Modal2";
// import Login from "../Login/Login";
import LoginAuth0  from '../LoginAuth0/LoginAuth0';
// import PerfilYLogoutAuth0 from '../LogoutAuth0/PerfilYLogoutAuth0';
import { useLocation } from "react-router-dom";
import {MdOutlineShoppingCart } from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';
import Cart from '../Cart/Cart';
import { useCart } from "react-use-cart";

export default function NavBar({ setCurrenPag, setCurrentPage }) {
  const user = useSelector((state) => state.User);
  let location = useLocation();
  let path = location.pathname.split("/");

  const [active, setActive] = useState(false);
  const { totalUniqueItems } = useCart();

  const toggle = () => {
    setActive(!active);
  };

  return (
    <div className={style.containerNav}>
      {/* Logitipo que redirecciona a home */}
      <div className={style.Containerlogo}>
        <Link to="/">
          <img className={style.logo} src={logoSombra} alt="Logo not found" />
        </Link>
      </div>
      {path[1] !== "registrar" ? (
        <>
          <div className={style.containerGenreAndSearch}>
            <Genre
              setCurrenPag={setCurrenPag}
              setCurrentPage={setCurrentPage}
            />
            <SearchBar
              setCurrenPag={setCurrenPag}
              setCurrentPage={setCurrentPage}
            />
            <Date setCurrenPag={setCurrenPag} setCurrentPage={setCurrentPage} />
          </div>
          {totalUniqueItems>0? <div className={style.Items}>{totalUniqueItems}</div> : <div></div> }
          <Tooltip title="Ver carrito" arrow>
          <div onClick={toggle} className={style.cart}>
          <MdOutlineShoppingCart className={style.cartlogo}/>
          </div>
          </Tooltip>  

          <Modal2 active={active} toggle={toggle}>
            <Cart/>
          </Modal2>
         
          <div className={style.registerAndLogin}>
            {/* <Link to="/events"><button className={style.btnRegister} type="button">Crear Evento</button></Link>  */}
            {/* {user === "" ? (
              <button
                onClick={toggle}
                className={style.btnRegister}
                type="button"
              >
                Ingresar
              </button>
            ) : null} */}
               <LoginAuth0/>
               {/* <PerfilYLogoutAuth0/> */}
            {/* <Modal active={active} toggle={toggle}>
              <Login toggle={toggle} />
            </Modal> */}
            {/* <UserNavBar /> */}
          </div>
        </>
      ) : null}
      {/* <span className={style.logoUser}>User</span> */}
    </div>
  );
}
