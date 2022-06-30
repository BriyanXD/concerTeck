import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import style from "./RegisterUser.module.css";
import swal from 'sweetalert'
import {
  register,
  ValidationEmail,
  ValidationUsername,
} from "../../redux/actions";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

export default function RegisterUser() {
  const { usuario } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Estado local que maneja la información del usuario a registrar
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    username: "",
    cuit_cuil: undefined,
    email: "",
    cbu: undefined,
    password: "",
    repeatPassword: "",
    telephone: undefined,
    company: "",
  });
  //Estado local que tiene los errores
  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    username: "",
    cuit_cuil: "",
    email: "",
    cbu: "",
    password: "",
    repeatPassword: "",
    telephone: "",
    company: "",
  });

  //Function que modifica el estado local con los valores de los input
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //Function que hace las validaciones
  const handleBlur = async (e) => {
    //validacion de nombre
    if (e.target.name === "name") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          [e.target.name]: "Por favor ingrese un nombre",
        });
      } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(e.target.value)) {
        setErrors({
          ...errors,
          [e.target.name]:
            "Por favor ingrese un nombre sin numeros o caracteres especiales",
        });
      } else {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      }
    }

    //validacion de apellido
    if (e.target.name === "lastname") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          [e.target.name]: "Por favor ingrese un apellido",
        });
      } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(e.target.value)) {
        setErrors({
          ...errors,
          [e.target.name]:
            "Por favor ingrese un apellido sin numeros o caracteres especiales",
        });
      } else {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      }
    }

    //validacion de nombre de usuario
    if (e.target.name === "username") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          [e.target.name]: "Por favor ingrese un nombre de usuario",
        });
      } else if (e.target.value !== "") {
       let data = await dispatch(ValidationUsername(e.target.value));
        if (data.payload === false) {
          setErrors({
            ...errors,
            [e.target.name]: "El nombre de usuario ingresado ya existe",
          });
        } else {
          setErrors({
            ...errors,
            [e.target.name]: "",
          });
        }
      }
    }

    //validacion de cuit o cuil
    if (e.target.name === "cuit_cuil") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          [e.target.name]: "Por favor ingrese un cuit o cuil",
        });
      } else if (!/^([0-9])*$/.test(e.target.value)) {
        setErrors({
          ...errors,
          [e.target.name]:
            "Por favor los caracteres ingresados deben ser numeros",
        });
      } else {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      }
    }

    //validacion de email + validacion por back
    if (e.target.name === "email") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          [e.target.name]: "Por favor un email",
        });
      } else if (
        !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(e.target.value)
      ) {
        setErrors({
          ...errors,
          [e.target.name]: "Ingrese un email valido",
        });
        //En el caso de que el email sea correcto verificamos si esta disponible
      }else if( /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(e.target.value)){
        let emailV = await dispatch(ValidationEmail(e.target.value));
        if (emailV.payload === false) {
          setErrors({
            ...errors,
            [e.target.name]: "El email ingresado ya existe",
          });
        } else {
          setErrors({
            ...errors,
            [e.target.name]: "",
          });
        }
      }
    }
    //validacion de cbu
    if (e.target.name === "cbu") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          [e.target.name]: "Por favor ingrese un cbu",
        });
      } else if (!/^([0-9])*$/.test(e.target.value)) {
        setErrors({
          ...errors,
          [e.target.name]:
            "Por favor los caracteres ingresados deben ser numeros",
        });
      } else {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      }
    }

    //validacion de contraseña
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

    //validacion de confirmacion de contraseña
    if (e.target.name === "repeatPassword") {
      console.log(user.password, e.target.name, e.target.value);
      if (e.target.value === "") {
        setErrors({
          ...errors,
          [e.target.name]: "Tiene que repetir la contraseña ingresada",
        });
      } else if (e.target.value !== user.password) {
        setErrors({
          ...errors,
          [e.target.name]:
            "La contraseña ingresada no coincide con la anterior",
        });
      } else {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      }
    }

    //validacion de telefono
    if (e.target.name === "telephone") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          [e.target.name]: "Por favor ingrese un numero de telefono",
        });
      } else if (isNaN(Number(e.target.value))) {
        setErrors({
          ...errors,
          [e.target.name]: "Solo se puede ingresar numeros",
        });
      } else {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      }
    }

    //validacion de company (no obligatorio)
    if (e.target.name === "company") {
      if (typeof e.target.value !== "string") {
        setErrors({
          ...errors,
          [e.target.name]: "El nombre de la compania debe ser un nombre",
        });
      } else {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      }
    }
  };

  //Function que envia los datos cargados a la DB y valida que este todo en orden para su creación
  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario === "producer") {
      if (
        errors.name !== "" ||
        errors.lastname !== "" ||
        errors.username !== "" ||
        errors.cuit_cuil !== "" ||
        errors.email !== "" ||
        errors.cbu !== "" ||
        errors.password !== "" ||
        errors.repeatPassword !== "" ||
        errors.telephone !== "" ||
        errors.company !== ""
      ) {
        return swal({
          title: 'No se pudo registrar',
          text: 'Por favor chequee los datos ingresados',
          icon: 'error'})
              }
      if (
        user.name === "" ||
        user.lastname === "" ||
        user.username === "" ||
        user.cuit_cuil === "" ||
        user.email === "" ||
        user.cbu === "" ||
        user.password === "" ||
        user.repeatPassword === "" ||
        user.telephone === "" ||
        user.company === ""
      ) {
        setErrors({
          name: user.name === "" ? "Por favor ingrese un nombre" : "",
          lastname: user.lastname === "" ? "Por favor ingrese un apellido" : "",
          username:
            user.username === ""
              ? "Por favor ingrese un nombre de usuario"
              : "",
          cuit_cuil:
            user.cuit_cuil === undefined ? "Por favor ingrese un cuit o cuil" : "",
          email: user.email === "" ? "Por favor un email" : "",
          cbu: user.cbu === undefined ? "Por favor ingrese un cbu" : "",
          password:
            user.password === "" ? "Por favor ingrese una contraseña" : "",
          repeatPassword:
            user.repeatPassword === ""
              ? "Tiene que repetir la contraseña ingresada"
              : "",
          telephone:
            user.telephone === undefined
              ? "Por favor ingrese un numero de telefono"
              : "",
          company:
          user.company === "" ? 'Por favor ingrese Compañía' : ""
        });
        return;
      }
      dispatch(register(usuario, user));
      swal({
        title: 'Usuario registrado correctamente',
        icon: 'success',
        button: 'Aceptar',
       })
      navigate("/");
      setUser({
        name: "",
        lastname: "",
        username: "",
        cuit_cuil: undefined,
        email: "",
        cbu: undefined,
        password: "",
        repeatPassword: "",
        telephone: undefined,
        company: "",
      });
    } else if (usuario === "user") {
      if (
        errors.username !== "" ||
        errors.email !== "" ||
        errors.password !== "" ||
        errors.repeatPassword !== ""
      ) {
        return swal({
          title: 'No se pudo registrar',
          text: 'Por favor chequee los datos ingresados',
          icon: 'error'})
      }
      if (
        user.username === "" ||
        user.email === "" ||
        user.password === "" ||
        user.repeatPassword === ""
      ) {
        setErrors({
          username:
            user.username === ""
              ? "Por favor ingrese un nombre de usuario"
              : "",
          email: user.email === "" ? "Por favor un email" : "",
          password:
            user.password === "" ? "Por favor ingrese una contraseña" : "",
          repeatPassword:
            user.repeatPassword === ""
              ? "Tiene que repetir la contraseña ingresada"
              : "",
        });
        return;
      }
      dispatch(register(usuario, user));
      swal({
        title: 'Usuario registrado correctamente',
        icon: 'success',
        button: 'Aceptar',
       })
      navigate("/");
      setUser({
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
      });
    }
  };

  return (
    <div className={style.containerRegisterUser}>
      <NavBar />
      <div className={style.conteinerData}>
      <h2 className={style.title}>Crear cuenta</h2>
      {usuario === "producer" ? (
        <form onSubmit={handleSubmit} className={style.containerForm}>
         <div className={style.containerInput}></div> 
          <input
            name="name"
            value={user.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.name?.length > 0 ? style.error :style.inputText}
            type="text"
            placeholder={errors.name?.length > 0 ? errors.name : "Nombre"}
          />
          <div className={style.containerInput}></div>
          <input
            name="lastname"
            value={user.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.lastname?.length > 0 ? style.error :style.inputText}
            type="text"
            placeholder={errors.lastname?.length > 0 ? errors.lastname : "Apellido"}
          />
         <div className={style.containerInput}></div>
          <input
            name="username"
            value={user.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.username?.length > 0 ? style.error :style.inputText}
            type="text"
            placeholder={errors.username?.length > 0 ? errors.username : "Nombre de Usuario"}
          />
          <div className={style.containerInput}></div>
          <input
            name="cuit_cuil"
            value={user.cuit_cuil}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.cuit_cuil?.length > 0 ? style.error :style.inputText}
            type="text"
            placeholder={errors.cuit_cuil?.length > 0 ? errors.cuit_cuil : "Número de CUIT / CUIL"}
          />
          <div className={style.containerInput}></div>
          <input
            name="email"
            value={user.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email?.length > 0 ? style.error :style.inputText}
            type="text"
            placeholder={errors.email?.length > 0 ? errors.email : "Correo electrónico"}
          />
          <div className={style.containerInput}></div>
          <input
            name="cbu"
            value={user.cbu}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.cbu?.length > 0 ? style.error :style.inputText}
            type="number"
            placeholder={errors.cbu?.length > 0 ? errors.cbu : "CBU"}
          />
         <div className={style.containerInput}></div>
          <input
            name="password"
            value={user.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password?.length > 0 ? style.error :style.inputText}
            type="password"
            placeholder={errors.password?.length > 0 ? errors.password : "Contraseña"}
          />
         <div className={style.containerInput}></div>
          <input
            name="repeatPassword"
            value={user.repeatPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.repeatPassword?.length > 0 ? style.error :style.inputText}
            type="password"
            placeholder={errors.repeatPassword?.length > 0 ? errors.repeatPassword : "Confirmar Contraseña"}
          />
          <div className={style.containerInput}></div>
          <input
            name="telephone"
            value={user.telephone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.telephone?.length > 0 ? style.error :style.inputText}
            type="number"
            placeholder={errors.telephone?.length > 0 ? errors.telephone : "Teléfono"}
          />
         <div className={style.containerInput}></div>
          <input
            name="company"
            value={user.company}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.company?.length > 0 ? style.error :style.inputText}
            type="text"
            placeholder={errors.company?.length > 0 ? errors.company : "Compañía"}
          />
          <button type="submit" className={style.btnProducer}>Crear</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className={style.containerForm}>
          <div className={style.containerInput}></div>
          <input
            name="username"
            value={user.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.username?.length > 0 ? style.error :style.inputText}
            type="text"
            placeholder={errors.username?.length > 0 ? errors.username : "Nombre de Usuario"}
          />
          <div className={style.containerInput}></div>
          <input
            name="email"
            value={user.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email?.length > 0 ? style.error :style.inputText}
            type="text"
            placeholder={errors.email?.length > 0 ? errors.email : "Correo electrónico"}
          />
          <div className={style.containerInput}></div>
          <input
            name="password"
            value={user.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password?.length > 0 ? style.error :style.inputText}
            type="password"
            placeholder={errors.password?.length > 0 ? errors.password : "Contraseña"}
          />
            <div className={style.containerInput}></div>
          <input
            name="repeatPassword"
            value={user.repeatPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.repeatPassword?.length > 0 ? style.error :style.inputText}
            type="password"
            placeholder={errors.repeatPassword?.length > 0 ? errors.repeatPassword : "Confirmar Contraseña"}
          />
          <button type="submit" className={style.btnUser}>Crear</button>
        </form>
      )}
      <div className={style.containerSocialRegister}>

      </div>
      <button onClick={() => navigate("/")} className={style.btnBack}>Volver</button>
      </div>
      <Footer />
    </div>
  );
}
