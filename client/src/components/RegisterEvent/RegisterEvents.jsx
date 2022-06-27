
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import style from './RegisterEvent.module.css';
import { CreateEvent, GetGenres, CreateGenre, GetVenues } from '../../redux/actions';
import { Link } from "react-router-dom";
//import { LocalizationProvider } from '@mui/x-date-pickers';
//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
//import AdapterDateFns from '@mui/lab/AdapterDateFns';
//import { Stack, TextField } from '@mui/material';
//import { DateTimePicker } from '@mui/x-date-pickers';
//import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import DateTimePicker from 'react-datetime-picker';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import style from './RegisterEvents.module.css';



export default function RegisterEvent(){
    const dispatch = useDispatch();
    //const [dateTime, setDateTime] = useState(null);
    const [value, onChange] = useState(new Date());
    const genres = useSelector((state)=> state.Genres);
    const venues = useSelector((state) => state.Venues);
    const [event, setEvent] = useState({
        name: "",
        artist: "",
        genreId: "",
        schedule: "",
        performerImage: "",
        placeImage: "",
        description: "",
        venueId: 0,
        stockId: 0,
    })

    const [errors, setErrors] = useState({
        name: "",
        artist: "",
        genreId: "",
        schedule: "",
        performerImage: "",
        placeImage: "",
        description: "",
        venueId: "",
    })

    useEffect(()=>{
        dispatch(GetGenres());
        dispatch(GetVenues());  
    }, [dispatch]) 

    const handleChange = (e) => {
        if(e.target.name === "venueId"){
            setEvent({
                ...event,
                [e.target.name]: Number(e.target.value) 
            })
            return 
        }
        setEvent({
            ...event,
            schedule: value,
            venueId: parseInt(event.venueId),
            stockId: parseInt(event.venueId),
            [e.target.name]: e.target.value
        })
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if( errors.name !== "" ||
        errors.artist !== "" ||
        errors.genreId !== "" ||
        errors.schedule !== "" ||
        errors.performerImage !== "" ||
        errors.placeImage !== "" ||
        errors.description !== "" ||
        errors.venueId !== "" ){
            alert("Para poder registrar el Evento deben solucionarse los errores");
        }
        if ( event.name === "" ||
        event.artist === "" ||
        event.genreId === "" ||
        event.schedule === "" ||
        event.performerImage === "" ||
        event.placeImage === "" ||
        event.venueId === 0 ){
            setErrors({
                name: event.name === "" ? "Ingrese el nombre del Evento" : "",
                artist: event.artist === "" ? "Ingrese el nombre del artista del Evento" : "",
                genreId: event.genreId === "" ? "Ingrese el genero del Evento" : "",
                schedule: event.schedule === "" ? "Ingrese la fecha y hora del Evento" : "",
                performerImage: event.performerImage === "" ? "Ingrese la imagen del artista" : "",
                placeImage: event.placeImage === "" ? "Ingrese la imagen del lugar del Evento" : "",
                description: "",
                venueId: event.venueId === 0 ? "Ingrese el lugar del evento" : ""
            });
            return
        }
        dispatch(CreateEvent(event));
        alert("Evento creado exitosamente");
        setEvent({
            name: "",
            artist: "",
            genreId: "",
            schedule: "",
            performerImage: "",
            placeImage: "",
            description: "",
            venueId: 0,
            stockId: 0,
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
        if(e.target.name === "genreId"){
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
            genreId: e.target.value //event.genre
        })
    };


    //console.log para chequear lo que se esta guardando
    console.log(event)
    return (<div>
        <NavBar/>
        <div className={style.h2}><h2>Crear Evento</h2></div>
            <form onSubmit={handleSubmit}>
                <div> <input name="name" value={event.name}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Nombre" /> {errors.name && <label className={style.error}>{errors.name}</label>}</div>
                <div> <input name="artist" value={event.artist}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Artista" /> {errors.artist && <label className={style.error}>{errors.artist}</label>}</div>

                <div>
                    <label className={style.label}>Seleccionar genero existente: </label>
                    <select onChange={handleGenreSelect}>
                        <option>Generos</option>
                        {genres.map(g =>(<option key={g.id} value={g.name}>{g.name}</option>))}
                    </select>
                    {errors.genreId && <label>{errors.genreId}</label>}
                </div>


                {/* <div> <input name="schedule" value={event.schedule}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Hora y Fecha" /> {errors.schedule && <label className={style.error}>{errors.schedule}</label>}</div> */}
                {/* <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={4} sx={{ width: '250px'}}/>
                <DateTimePicker
                    //label='Date Time Picker'
                    //name="schedule"
                    formmat="y-MM-dd h:mm:ss"
                    renderInput={(params) => <TextField {...params}/>}
                    value={dateTime}
                    onChange={(e)=>{setDateTime(e)}}
                    /> </LocalizationProvider>
                </div> */}
                <div>
                    <DateTimePicker onChange={onChange} value={value} format="y-MM-dd h:mm:ss a"/>
                </div>
            

                <div> <input id="performerImage" name="file" onChange={(e) => uploadImage(e)} onBlur={handleBlur} type="file" placeholder="Imagen del artista" /> {errors.performerImage && <label className={style.error}>{errors.performerImage}</label>}</div>
                <div> <input id="placeImage" name="file" onChange={(e) => uploadImage(e)} onBlur={handleBlur} type="file" placeholder="Imagen del lugar" /> {errors.placeImage && <label className={style.error}>{errors.placeImage}</label>}</div>

                <div>
                    <label className={style.label}>Seleccionar lugar del evento: </label>
                    <select onChange={handleVenueSelect}>
                        <option>Lugares</option>
                        {venues.map(v =>(<option key={v.id} value={v.id}>{v.name}</option>))}
                    </select>
                    {errors.venueId && <label>{errors.venueId}</label>}
                </div>
                
                <div> <input name="description" value={event.description}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Descripcion" /> {errors.description && <label>{errors.description}</label>}</div>
                
                <button type="submit">Crear</button>
                
                <Link to='/'><button >Volver a inicio</button></Link>
            </form>
        <div className={style.footer}>
            <Footer/>
        </div>

    </div>)
};
