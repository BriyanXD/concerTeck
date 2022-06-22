
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './RegisterUser.module.css';
import { register } from '../../redux/actions';

export default function RegisterEvent(){
    const dispatch = useDispatch()
    const [event, setEvent] = useState({
        name: "",
        artist: "",
        address: "",
        isBigEvent: false,
        genre: [],
        schedule: "",
        map: "",
        performerImage: "",
        placeImage: "",
        description: "",
    })

    const [errors, setErrors] = useState({
        name: "",
        artist: "",
        address: "",
        genre: [],
        schedule: "",
        map: "",
        performerImage: "",
        placeImage: "",
        description: "",
    })

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if( errors.name !== "" ||
        errors.artist !== "" ||
        errors.address !== "" ||
        errors.genre !== [] ||
        errors.schedule !== "" ||
        errors.map !== "" ||
        errors.performerImage !== "" ||
        errors.placeImage !== "" ||
        errors.description !== ""){
            alert("Para poder registrar el Evento deben solucionarse los errores");
        }
        if ( event.name !== "" ||
        event.artist !== "" ||
        event.address !== "" ||
        event.genre !== [] ||
        event.schedule !== "" ||
        event.map !== "" ||
        event.performerImage !== "" ||
        event.placeImage !== "" ||
        event.description !== "" ){
            setErrors({
                name: event.name === "" ? "Ingrese el nombre del Evento" : "",
                artist: event.artist === "" ? "Ingrese el nombre del artista del Evento" : "",
                address: event.address === "" ? "Ingrese la direccion del Evento": "",
                genre: event.genre === [] ? "Ingrese el genero del Evento" : event.genre.length > 1 ? "El Evento solo deve pertenecer a un solo genero" : "",
                schedule: event.schedule === "" ? "Ingrese la fecha y hora del Evento" : "",
                map: event.map === "" ? "Ingrese la ubicacion del Evento" : "",
                performerImage: event.performerImage === "" ? "Ingrese la imagen del artista" : "",
                placeImage: event.placeImage === "" ? "Ingrese la imagen del lugar del Evento" : "",
                description: "",
            });
            return
        }
        dispatch(CreateEvent(event));
        alert("Evento creado exitosamente");
        setEvent({
            name: "",
            artist: "",
            address: "",
            isBigEvent: false,
            genre: [],
            schedule: "",
            map: "",
            performerImage: "",
            placeImage: "",
            description: "",
        });
    };

    const handleBlur = (e) => {
        
        //validar nombre
        if(e.target.name === "name"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese el nombre del Evento"
                })
            }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(e.target.value)){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese un nombre sin numeros o caracteres especiales"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }    
        }

        //validar artista
        if(e.target.name === "artist"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese el nombre del artista del Evento"
                })
            }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(e.target.value)){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese un nombre sin numeros o caracteres especiales"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }    
        }

        //validar direccion
        if(e.target.name === "address"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese la direccion del Evento"
                })
            // }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(e.target.value)){
            //     setErrors({
            //         ...errors,
            //         [e.target.name]: "Ingrese un nombre sin numeros o caracteres especiales"
            //     })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }    
        }

        //validar genero
        if(e.target.name === "genre"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese el genero del Evento"
                })
            }else if (e.target.value.length > 1){
                setErrors({
                    ...errors,
                    [e.target.name]: "El Evento solo deve pertenecer a un solo genero"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }    
        }

        //validar fecha/calendario
        if(e.target.name === "schedule"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese la fecha y hora del Evento"
                })
            // } else if(!/^([0-9])*$/.test(e.target.value)){
            //     setErrors({
            //         ...errors,
            //         [e.target.name]: "Por favor los caracteres ingresados deben ser numeros"
            //     })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }
        }

        //validar mapa/ubicacion
        if(e.target.name === "map"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese la ubicacion del Evento"
                })
            // }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(e.target.value)){
            //     setErrors({
            //         ...errors,
            //         [e.target.name]: "Ingrese un nombre sin numeros o caracteres especiales"
            //     })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }    
        }

        //validar imagen del artista
        if(e.target.name === "performerImage"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese la imagen del artista"
                })
            // }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(e.target.value)){
            //     setErrors({
            //         ...errors,
            //         [e.target.name]: "Ingrese un nombre sin numeros o caracteres especiales"
            //     })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }    
        }

        //validar imagen del evento
        if(e.target.name === "placeImage"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese la imagen del lugar del Evento"
                })
            // }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(e.target.value)){
            //     setErrors({
            //         ...errors,
            //         [e.target.name]: "Ingrese un nombre sin numeros o caracteres especiales"
            //     })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }    
        }

        //validar descripcion
        if(e.target.name === "description"){
            if( typeof e.target.value !== "string"){
                setErrors({
                    ...errors,
                    [e.target.name]: "El escribir una descripcion valida"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }
          }
    }

    return (<div>
        <h2>Crear Evento</h2>
        <form onSubmit={handleSubmit}>
            <div> <input name="name" value={event.name}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Nombre" /> {errors.name && <label>{errors.name}</label>}</div>
            <div> <input name="artist" value={event.artist}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Artista" /> {errors.artist && <label>{errors.artist}</label>}</div>
            <div> <input name="address" value={event.address}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Direccion" /> {errors.address && <label>{errors.address}</label>}</div>
            
            <div>
                <label> <input type="checkbox"/></label>
            </div>
            
            <div> <input name="schedule" value={event.schedule}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Hora y Fecha" /> {errors.schedule && <label>{errors.schedule}</label>}</div>
            <div> <input name="map" value={event.map}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Ubicacion" /> {errors.map && <label>{errors.map}</label>}</div>
            <div> <input name="performerImage" value={event.performerImage}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Imagen del artista" /> {errors.performerImage && <label>{errors.performerImage}</label>}</div>
            <div> <input name="placeImage" value={event.placeImage}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Imagen del lugar" /> {errors.placeImage && <label>{errors.placeImage}</label>}</div>
            <div> <input name="description" value={event.description}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Descripcion" /> {errors.description && <label>{errors.description}</label>}</div>
            <button type="submit">Crear</button>
        </form>
    </div>)
};
