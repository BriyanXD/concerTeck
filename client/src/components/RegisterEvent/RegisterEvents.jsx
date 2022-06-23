
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import style from './RegisterEvent.module.css';
import { CreateEvent, GetGenres, CreateGenre, GetVenues } from '../../redux/actions';
import { Link } from "react-router-dom";
//import { LocalizationProvider } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Stack, TextField } from '@mui/material';
//import { DateTimePicker } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

export default function RegisterEvent(){
    const dispatch = useDispatch();
    const [dateTime, setDateTime] = useState(null)
    const genres = useSelector((state)=> state.Genres);
    const venues = useSelector((state) => state.Venues);
    const [postGenre, setPostGenre] = useState({
        name: ""
    })
    const [event, setEvent] = useState({
        name: "",
        artist: "",
        genre: "",
        schedule: "",
        performerImage: "",
        placeImage: "",
        description: "",
        venueId: 0,
//      stockId: "",
    })

    const [errors, setErrors] = useState({
        name: "",
        artist: "",
        genre: "",
        schedule: "",
        performerImage: "",
        placeImage: "",
        description: "",
        venueId: 0,
//      stockId: "",
    })

    useEffect(()=>{
        dispatch(GetGenres());
        dispatch(GetVenues());  
    }, [dispatch]) 

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        })
    };

    const handleGenreSubmit = (e) => {
        dispatch(CreateGenre(postGenre));
        setPostGenre({
            name:""
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if( errors.name !== "" ||
        errors.artist !== "" ||
        errors.genre !== "" ||
        errors.schedule !== "" ||
        errors.performerImage !== "" ||
        errors.placeImage !== "" ||
        errors.description !== "" ||
        errors.venueId !== 0 ){
            alert("Para poder registrar el Evento deben solucionarse los errores");
        }
        if ( event.name !== "" ||
        event.artist !== "" ||
        event.genre !== "" ||
        event.schedule !== "" ||
        event.performerImage !== "" ||
        event.placeImage !== "" ||
        event.description !== "" ||
        errors.venueId !== 0 ){
            setErrors({
                name: event.name === "" ? "Ingrese el nombre del Evento" : "",
                artist: event.artist === "" ? "Ingrese el nombre del artista del Evento" : "",
                genre: event.genre === "" ? "Ingrese el genero del Evento" : "",
                schedule: event.schedule === "" ? "Ingrese la fecha y hora del Evento" : "",
                performerImage: event.performerImage === "" ? "Ingrese la imagen del artista" : "",
                placeImage: event.placeImage === "" ? "Ingrese la imagen del lugar del Evento" : "",
                description: "",
                venueId: event.venueId === 0 ? "Ingrese el lugar del evento" : 0
            });
            return
        }
        dispatch(CreateEvent(event));
        alert("Evento creado exitosamente");
        setEvent({
            name: "",
            artist: "",
            genre: "",
            schedule: "",
            performerImage: "",
            placeImage: "",
            description: "",
            venueId: 0,
    //      stockId: "",
        });
        //history.push("/home")
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

        //validar genero
        if(e.target.name === "genre"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese el genero del Evento"
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

        //validar Lugar/Venue
        if(e.target.name === "venueId"){
            if(e.target.value === 0){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese el lugar del evento"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }    
        }
    };

    function handleCheck(e){
        if(e.target.checked){           
            setEvent({                  
                ...event,
                genre: event.genre  
            })
        }
    };


    //k484vqmp codigo carpeta clodinari
    const uploadImage = async (e) => {
        //console.log(e.target.id)
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "k484vqmp");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dqrirzlrv/image/upload",
          { method: "POST", body: data }
        );
        const file = await res.json();
        setEvent({...event, [e.target.id]:file.secure_url });
      };


    function handleVenueSelect(e){
        setEvent({
            ...event,
            venueId: e.target.value //event.venueId
        })
    };

    function handleGenreSelect(e){
        setEvent({
            ...event,
            genre: e.target.value //event.genre
        })
    };

    // function handleDelete(e){
    //     setInput({                  
    //         ...input,
    //         tipoDietas: input.tipoDietas.filter(d => d !== e) 
    //     })
    // };

    //console.log para chequear lo que se esta guardando
    console.log(event)

    return (<div>
        <Link to='/'><button >Go home</button></Link>
        <div><h2>Crear Evento</h2></div>
        <form onSubmit={handleSubmit}>
            <div> <input name="name" value={event.name}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Nombre" /> {errors.name && <label>{errors.name}</label>}</div>
            <div> <input name="artist" value={event.artist}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Artista" /> {errors.artist && <label>{errors.artist}</label>}</div>

            <div>
                <label>Seleccionar genero existente: </label>
                <select onChange={handleGenreSelect}>
                    {genres.map(g =>(<option key={g.id} value={g.name}>{g.name}</option>))}
                </select>
                {errors.genre && <label>{errors.genre}</label>}
            </div>
            
            <div> <input name="schedule" value={event.schedule}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Hora y Fecha" /> {errors.schedule && <label>{errors.schedule}</label>}</div>
            <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={4} sx={{ width: '250px'}}/>
            <DateTimePicker
                //label='Date Time Picker'
                renderInput={(params) => <TextField {...params}/>}
                value={dateTime}
                onChange={(e)=>{setDateTime(e)}}
            /> </LocalizationProvider>
            </div>

            <div> <input id="performerImage" name="file" onChange={(e) => uploadImage(e)} onBlur={handleBlur} type="file" placeholder="Imagen del artista" /> {errors.performerImage && <label>{errors.performerImage}</label>}</div>
            <div> <input id="placeImage" name="file" onChange={(e) => uploadImage(e)} onBlur={handleBlur} type="file" placeholder="Imagen del lugar" /> {errors.placeImage && <label>{errors.placeImage}</label>}</div>
            <div> <input name="description" value={event.description}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Descripcion" /> {errors.description && <label>{errors.description}</label>}</div>
            
            <div>
                <label>Seleccionar lugar del evento: </label>
                <select onChange={handleVenueSelect}>
                    {venues.map(v =>(<option key={v.id} value={v.id}>{v.name}</option>))}
                </select>
                {errors.venueId && <label>{errors.venueId}</label>}
            </div>
            
            <button type="submit">Crear</button>
        </form>
    </div>)
};
