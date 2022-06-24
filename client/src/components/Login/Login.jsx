import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, ValidationUser } from "../../redux/actions";
import style from "./Login.module.css";
import { Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userValidation = useSelector((state) => state.userValidation);
  
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  console.log(user);

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    validation: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    if (e.target.name === "username") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          [e.target.name]: "Por favor ingrese un nombre de usuario",
        });
      } else {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      }
    }

    if (e.target.name === "password") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          [e.target.name]: "Por favor ingrese una contraseña",
        });
      } else if (
        !/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/.test(
          e.target.value
        )
      ) {
        setErrors({
          ...errors,
          [e.target.name]:
            "La contraseña ingresada debe tener almenos 1 mayuscula, 1 minuscula, 1 numero, 1 caracter especial y un minimo de 10 caracteres",
        });
      } else {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      }
    }
  };

  const handleSubmit =(e) => {
    e.preventDefault();
    dispatch(ValidationUser(user))

      if (errors.username !== "" || errors.password !== "") {
        alert("Para poder registrarse debe solucionar los errores");
      }
  
      if (user.username === "" || user.password === "") {
        setErrors({
          username:
            user.username === "" ? "Por favor ingrese un nombre de usuario" : "",
          password:
            user.password === "" ? "Por favor ingrese una contraseña" : "",
        });
        return;
      }
        if (userValidation){
            dispatch(LoginUser(user));
            alert("Se registro correctamente");
            setUser({
              username: "",
              password: "",
              validation: ""
            });
            navigate("/");
          }else{
            setErrors({
              ...errors,
              validation: "Revise los datos ingresados e intente nuevamente"
            }) 
            return
          }
  };

  return (
    <div className={style.containerLogin}>
      <h1 className={style.title}>Iniciar Sesión</h1>
      <div className={style.containerPassword}>
        <form onSubmit={handleSubmit} className={style.contenedorForm}>
          <input
            type="text"
            name="username"
            onBlur={handleBlur}
            value={user.username}
            onChange={handleChange}
            placeholder="Nombre de usuario"
          />
          {errors.username && <label>{errors.username}</label>}
          <input
            type="password"
            name="password"
            value={user.password}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Contraseña"
          />
          {errors.password && <label>{errors.password}</label>}
          {errors.validation && <label>{errors.validation}</label>}
          <button className={style.btn}>Iniciar sesión</button>
        </form>
        <a className={style.etiquetaA} href="#">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <div className={style.contenedorGoogleFacebook}>
        <button className={style.btn}>Iniciar sesion con Google</button>
        <button className={style.btn}>Iniciar sesion con Facebook</button>
      </div>

      <div className={style.contenedorCrearCuenta}>
        <Link to={`/registrar/user`}>
          <button className={style.btn}>Crear cuenta</button>
        </Link>
        <span>
          <Link to={`/registrar/producer`}>Crear cuenta</Link> para productores
        </span>
      </div>
      <button onClick={() => navigate('/')}>Volver</button>
    </div>
  );
}
