import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import style from './RegisterUser.module.css';
import { register, ValidationEmail, ValidationUsername } from '../../redux/actions';

export default function RegisterUser () {
    const { usuario } = useParams();
    const navigate = useNavigate()
    console.log(usuario)
    const dispatch = useDispatch()
    let emailV = useSelector(state => state.emailValidation)
    let usernameV = useSelector(state => state.usernameValidation)
    console.log(emailV, "emailV", usernameV, "usernameV")
    //Estado local que maneja la información del usuario a registrar
    const [user, setUser] = useState({
        name:"",
        lastname:"",
        username:"",
        cuit_cuil: undefined,
        email:"",
        cbu: undefined,
        password:"",
        repeatPassword: "",
        telephone: undefined,
        company:"" 
    });
    console.log(user)
    //Estado local que tiene los errores
    const [errors, setErrors] = useState({
        name:"",
        lastname:"",
        username:"",
        cuit_cuil:"",
        email:"",
        cbu:"",
        password:"",
        repeatPassword: "",
        telephone:"",
        company:"" 
    });

    //Function que modifica el estado local con los valores de los input
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };

    //Function que hace las validaciones
    const handleBlur = (e) => {

        //validacion de nombre
        if(e.target.name === "name"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Por favor ingrese un nombre"
                })
            }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(e.target.value)){
                setErrors({
                    ...errors,
                    [e.target.name]: "Por favor ingrese un nombre sin numeros o caracteres especiales"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }
        }

        //validacion de apellido
        if(e.target.name === "lastname"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Por favor ingrese un apellido"
                })
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(e.target.value)){
                setErrors({
                    ...errors,
                    [e.target.name]: "Por favor ingrese un apellido sin numeros o caracteres especiales"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }
        }

        //validacion de nombre de usuario
        if(e.target.name === "username"){
          if(e.target.value === ""){
            setErrors({
              ...errors,
              [e.target.name]: "Por favor ingrese un nombre de usuario"
            })
          } else if(e.target.value !== ""){
              dispatch(ValidationUsername(e.target.value))
              if(usernameV === true){
                setErrors({
                  ...errors,
                  [e.target.name]: "El nombre de usuario ingresado ya existe"
                })
              } else{
              setErrors({
                  ...errors,
                  [e.target.name]: ""
              })
            }
        }

      }

        //validacion de cuit o cuil
        if(e.target.name === "cuit_cuil"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Por favor ingrese un cuit o cuil"
                })
            } else if(!/^([0-9])*$/.test(e.target.value)){
                setErrors({
                    ...errors,
                    [e.target.name]: "Por favor los caracteres ingresados deben ser numeros"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }
        }

        //validacion de email
        if(e.target.name === "email"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Por favor un email"
                })
            } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(e.target.value)){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese un email valido"
                })
            } else {
              dispatch(ValidationEmail(e.target.value))
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }
        }
        if(e.target.name === "email"){
          if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(e.target.value)){ 
            if(emailV === true){
              setErrors({
                ...errors,
                [e.target.name] : "El email ingresado ya existe"
              })
            }else{
              setErrors({
                ...errors,
                [e.target.name]: ""
              })
            }
          }

        }

        //validacion de cbu
        if(e.target.name === "cbu"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Por favor ingrese un cbu"
                })
            } else if(!/^([0-9])*$/.test(e.target.value)){
                setErrors({
                    ...errors,
                    [e.target.name]: "Por favor los caracteres ingresados deben ser numeros"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
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
          if(e.target.name === "repeatPassword"){
            console.log(user.password, e.target.name, e.target.value)
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Tiene que repetir la contraseña ingresada"
                })
            }else if(e.target.value !== user.password){
                setErrors({
                    ...errors,
                    [e.target.name]: "La contraseña ingresada no coincide con la anterior"
                })
            }else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }
          }

          //validacion de telefono
          if(e.target.name === "telephone"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Por favor ingrese un numero de telefono"
                })
            } else if (isNaN(Number(e.target.value))){
                setErrors({
                    ...errors,
                    [e.target.name]: "Solo se puede ingresar numeros"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }
          }

          //validacion de company (no obligatorio)
          if(e.target.name === "company"){
            if( typeof e.target.value !== "string"){
                setErrors({
                    ...errors,
                    [e.target.name]: "El nombre de la compania debe ser un nombre"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
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
          alert("Para poder registrarse debe solucionar los errores");
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
            lastname:
              user.lastname === "" ? "Por favor ingrese un apellido" : "",
            username:
              user.username === ""
                ? "Por favor ingrese un nombre de usuario"
                : "",
            cuit_cuil:
              user.cuit_cuil === "" ? "Por favor ingrese un cuit o cuil" : "",
            email: user.email === "" ? "Por favor un email" : "",
            cbu: user.cbu === "" ? "Por favor ingrese un cbu" : "",
            password:
              user.password === "" ? "Por favor ingrese una contraseña" : "",
            repeatPassword:
              user.repeatPassword === ""
                ? "Tiene que repetir la contraseña ingresada"
                : "",
            telephone:
              user.telephone === ""
                ? "Por favor ingrese un numero de telefono"
                : "",
            company: "",
          });
          return;
        }
        dispatch(register(usuario, user));
        alert("Se registro el usuario correctamente");
        navigate("/")
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
          alert("Para poder registrarse debe solucionar los errores");
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
        alert("Se registro el usuario correctamente");
        navigate("/")
        setUser({
          username: "",
          email: "",
          password: "",
          repeatPassword: "",
        });
      }
    }; 

    return(
        <div className={style.containerRegisterUser}>
                    <h2 className={style.title}>Crear cuenta</h2>
            {usuario === "producer" ? <form onSubmit={handleSubmit} className={style.containerForm} >
                   <div> <input name="name" value={user.name}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Nombre" /> {errors.name && <label>{errors.name}</label>}</div>
                   <div> <input name="lastname" value={user.lastname}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Apellido" /> {errors.lastname && <label>{errors.lastname}</label>}</div>
                   <div> <input name="username" value={user.username}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Nombre de Usuario" /> {errors.username && <label>{errors.username}</label>}</div>
                   <div> <input name="cuit_cuil" value={user.cuit_cuil} onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Cuit_Cuil" /> {errors.cuit_cuil && <label>{errors.cuit_cuil}</label>}</div>
                   <div> <input name="email" value={user.email}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Correo electronico"/> {errors.email && <label>{errors.email}</label>}</div>
                   <div> <input name="cbu" value={user.cbu}  onChange={handleChange} onBlur={handleBlur} type="number" placeholder="cbu" /> {errors.cbu && <label>{errors.cbu}</label>}</div>
                   <div> <input name="password" value={user.password}  onChange={handleChange} onBlur={handleBlur} type="password" placeholder="Contraseña"/> {errors.password && <label>{errors.password}</label>}</div>
                   <div> <input name="repeatPassword" value={user.repeatPassword}  onChange={handleChange} onBlur={handleBlur} type="password" placeholder="Confirmar Contraseña"/> {errors.repeatPassword && <label>{errors.repeatPassword}</label>}</div>
                   <div> <input name="telephone" value={user.telephone}  onChange={handleChange} onBlur={handleBlur} type="number" placeholder="Telefono" /> {errors.telephone && <label>{errors.telephone}</label>}</div>
                   <div> <input name="company" value={user.company}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Compania" /> {errors.company && <label>{errors.company}</label>}</div>
                   <button type="submit">Crear</button>
            </form>:
                <form onSubmit={handleSubmit} className={style.containerForm}>
                <div> <input name="username" value={user.username}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Nombre de Usuario" /> {errors.username && <label>{errors.username}</label>}</div>
                <div> <input name="email" value={user.email}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Correo electronico"/> {errors.email && <label>{errors.email}</label>}</div>
                <div> <input name="password" value={user.password}  onChange={handleChange} onBlur={handleBlur} type="password" placeholder="Contraseña"/> {errors.password && <label>{errors.password}</label>}</div>
                <div> <input name="repeatPassword" value={user.repeatPassword}  onChange={handleChange} onBlur={handleBlur} type="password" placeholder="Confirmar Contraseña"/> {errors.repeatPassword && <label>{errors.repeatPassword}</label>}</div>
                <button type="submit">Crear</button>
            </form>}
            <div className={style.containerSocialRegister}>
                <button>Registrarse con Google</button>
                <button>Registrarse con Facebook</button>
            </div>
            <button onClick={() => navigate('/')}>Volver</button>
        </div>
    )
}