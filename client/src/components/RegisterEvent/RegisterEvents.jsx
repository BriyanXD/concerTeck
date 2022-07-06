
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './RegisterEvents.module.css';
import { CreateEvent, GetGenres, GetVenues, CreateStock } from '../../redux/actions';
import { Link, useNavigate } from "react-router-dom";
//import { LocalizationProvider } from '@mui/x-date-pickers';
//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
//import AdapterDateFns from '@mui/lab/AdapterDateFns';
//import { Stack, TextField } from '@mui/material';
//import { DateTimePicker } from '@mui/x-date-pickers';
//import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import DateTimePicker from 'react-datetime-picker';
import Footer from '../Footer/Footer';
import RegisterGenre from '../RegisterGenre/RegisterGenre';
import RegisterVenue from '../RegisterVenue/RegisterVenue';


export default function RegisterEvent(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeGenre, setActiveGenre] = useState(false);
    const [activeVenue, setActiveVenue] = useState(false);
    const [activeStock, setActiveStock] = useState(false);
    const [dateTime, setDateTime] = useState(new Date());
    //const Allevents = useSelector((state) => state.AllEvents);
    const genres = useSelector((state)=> state.Genres);
    const venues = useSelector((state) => state.Venues);
    const [event, setEvent] = useState({
        name: "",
        artist: "",
        genreId: "",
        schedule: "",
        //duration: "",  //nueva propiedad, duracion del evento
        performerImage: "",
        placeImage: "",
        description: "",
        venueId: "",
        stockId: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        artist: "",
        genreId: "",
        schedule: "",
        //duration: "",  //nueva propiedad, duracion del evento
        performerImage: "",
        placeImage: "",
        venueId: "",
        stockId: ""
    });
    const [stock, setStock] = useState({
        id: "",
        stockStreaming: 0,
        stockkVIP: 0,
        stockGeneral: 0,
        stockGeneralLateral: 0,
        stockPalco: 0,
        streamingPrice: 0,
        vipPrice:0,
        generalLateralPrice: 0,
        generalPrice:0,
        palcoPrice: 0,
        venueId: "",
    });
    // const [errorStock, setErrorStock] = useState({
    //     stockStreaming: "",
    //     stockkVIP: "",
    //     stockGeneral: "",
    //     stockGeneralLateral: "",
    //     stockPalco: "",
    //     streamingPrice: "",
    //     vipPrice: "",
    //     generalLateralPrice: "",
    //     generalPrice: "",
    //     palcoPrice: "",
    // });

    useEffect(()=>{
        dispatch(GetGenres());
        dispatch(GetVenues());  
    }, [dispatch])

    const handleChange = async(e) => {
        if(e.target.name === "venueId"){
            await setEvent({
                ...event,
                venueId: e.target.value,
            })
            await setStock({
                ...stock,
                venueId: e.target.value,
            });
            return 
        }
        if(e.target.name === "schedule"){
            //await setDateTime(e.taget.value);
            await setEvent({
                ...event,
                schedule: dateTime
            })
            return 
        }
        if(event.name !== "" && event.artist !== "" && event.schedule !== ""){
            await setStock({
                ...stock,
                id: event.name + event.artist + event.schedule
            });
        }
        // if(stock.id !== ""){
        //     await setEvent({
        //         ...event,
        //         stockId: stock.id
        //     });
        // }
        await setEvent({
            ...event,
            schedule: dateTime,
            [e.target.name]: e.target.value
        })
    };

    const handleStock = async(e) =>{
        // if(event.venueId !== 0){
            // const foundVenue = venues.find(v => v.id === event.venueId);
            // if(foundVenue){
                // await setStock({
                //     ...stock,
                //     venueId: event.id,
                    //[e.target.name]: Number(e.target.value)
                // });
                //return
            //} 
            // else {
            //     return alert("No se a encontrado el lugar seleccionado")
            // }
            // if(event.name !== "" && event.artist !== "" && event.schedule !== ""){
            //     await setStock({
            //         ...stock,
            //         id: event.name + event.artist + event.schedule
            //     });
            // }
            await setStock({
                ...stock,
                [e.target.name]: Number(e.target.value)
            });
            if(stock.id !== ""){
                await setEvent({
                    ...event,
                    stockId: stock.id
                });
            }
        // } else {
        //     return alert("Aun no selecciono un lugar para escribir el stock y precios")
        // }
    };

    const handleAddStock = async(e) => {
        e.preventDefault();
        // if( errorStock.stockStreaming !== "" ||
        // errorStock.stockkVIP !== "" ||
        // errorStock.stockGeneral !== "" ||
        // errorStock.stockGeneralLateral !== "" ||
        // errorStock.stockPalco !== "" ||
        // errorStock.streamingPrice !== "" ||
        // errorStock.vipPrice !== "" ||
        // errorStock.generalLateralPrice !== "" ||
        // errorStock.generalPrice !== "" ||
        // errorStock.palcoPrice !== "" ||
        // errorStock.venueId !== "" ){
        //     alert("Errores detectados en formulario del stock");
        // }
        // if ( stock.stockStreaming === 0 ||
        // stock.stockkVIP === 0 ||
        // stock.stockGeneral === 0 ||
        // stock.stockGeneralLateral === 0 ||
        // stock.stockPalco === 0 ||
        // stock.streamingPrice === 0 ||
        // stock.vipPrice === 0 ||
        // stock.generalLateralPrice === 0 ||
        // stock.generalPrice ===0 ||
        // stock.palcoPrice === 0 ){
        //     setErrorStock({
        //         stockStreaming: stock.stockStreaming === 0 ? "Ingrese stock de streaming" : "",
        //         stockkVIP: stock.stockkVIP === 0 ? "Ingrese stock VIP" : "",
        //         stockGeneral: stock.stockGeneral === 0 ? "Ingrese stock general" : "",
        //         stockGeneralLateral: stock.stockGeneralLateral === 0 ? "Ingrese stock lateral" : "",
        //         stockPalco: stock.stockPalco === 0 ? "Ingrese stock palco" : "",
        //         streamingPrice: stock.streamingPrice === 0 ? "Ingrese precio de streaming" : "",
        //         vipPrice: stock.vipPrice === 0 ? "Ingrese precio VIP" : "",
        //         generalLateralPrice: stock.generalLateralPrice === 0 ? "Ingrese precio lateral" : "",
        //         generalPrice: stock.generalPrice ===0 ? "Ingrese precio general" : "",
        //         palcoPrice: stock.palcoPrice === 0 ? "Ingrese precio palco" : ""
        //     });
        //     return
        // }
        const stockCreated = await dispatch(CreateStock(stock));
        console.log("AQUI EL STOCK CREADO", stockCreated);
        if(stockCreated.data[0]){
            alert("Stock añadido con exito")
            setStock({
                id: "",
                stockStreaming: 0,
                stockkVIP: 0,
                stockGeneral: 0,
                stockGeneralLateral: 0,
                stockPalco: 0,
                streamingPrice: 0,
                vipPrice:0,
                generalLateralPrice: 0,
                generalPrice:0,
                palcoPrice: 0,
                venueId: 0,
            });
            //setActiveStock(!activeStock);
        }
    };

    const handleSubmitEvent = async(e) => {
        e.preventDefault();
        if( errors.name !== "" ||
        errors.artist !== "" ||
        errors.genreId !== "" ||
        errors.schedule !== "" ||
        //errors.duration !== "" ||
        errors.performerImage !== "" ||
        errors.placeImage !== "" ||
        //errors.description !== "" ||
        errors.venueId !== "" ||
        errors.stockId !== "" ){
            alert("Para poder registrar el Evento deben solucionarse los errores");
        }
        if ( event.name === "" ||
        event.artist === "" ||
        event.genreId === "" ||
        event.schedule === "" ||
        //event.duration === "" ||
        event.performerImage === "" ||
        event.placeImage === "" ||
        event.venueId === "" ||
        event.stockId === "" ){
            setErrors({
                name: event.name === "" ? "Ingrese el nombre del Evento" : "",
                artist: event.artist === "" ? "Ingrese el nombre del artista del Evento" : "",
                genreId: event.genreId === "" ? "Ingrese el genero del Evento" : "",
                schedule: event.schedule === "" ? "Ingrese la fecha y hora del Evento" : "",
                //duration: event.duration === "" ? "Ingrese la duracion del Evento" : "",
                performerImage: event.performerImage === "" ? "Ingrese la imagen del artista" : "",
                placeImage: event.placeImage === "" ? "Ingrese la imagen del lugar del Evento" : "",
                venueId: event.venueId === 0 ? "Ingrese el lugar del evento" : "",
                stockId: event.stockId === "" ? "Se debe llenar el formulario de stock" : ""
            });
            return
        }
        await handleAddStock(e);
        await dispatch(CreateEvent(event));
        //console.log("creacion de evento", eventCreated);
            alert("Evento creado exitosamente");
            setEvent({
                name: "",
                artist: "",
                genreId: "",
                schedule: "",
                performerImage: "",
                placeImage: "",
                description: "",
                venueId: "",
                stockId: "",
            });
            navigate("/")
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

        //validar la duracion
        // if(e.target.name === "duration"){
        //     if(e.target.value === ""){
        //         setErrors({
        //             ...errors,
        //             [e.target.name]: "Ingrese la duracion del Evento"
        //         })
        //     } else {
        //         setErrors({
        //             ...errors,
        //             [e.target.name]: ""
        //         })
        //     }
        // }

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


    //console.log para chequear lo que se esta guardando
    console.log("SETEANDO EVENTO", event);
    console.log("SETEANDO STOCK: ", stock);

    return (
        <div className={style.container}>
            {/* <NavBar/> */}
    <div className={style.card}>
        <div className={style.h2}><h2>Crear Evento</h2></div>
        <form onSubmit={handleSubmitEvent}>
            <div> <label>Nombre del evento:* </label> <input name="name" value={event.name}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Nombre del evento" /> {errors.name && <label className={style.error}>{errors.name}</label>}</div>
            <div> <label>Nombre del artista:* </label> <input name="artist" value={event.artist}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Artista" /> {errors.artist && <label className={style.error}>{errors.artist}</label>}</div>

            <div> <label>Fecha y Hora del evento:* </label></div>
            <div> <DateTimePicker name="schedule" value={dateTime} onChange={setDateTime} minDate={new Date()} format="y-MM-dd h:mm:ss a"/> {errors.schedule && <label className={style.error}>{errors.schedule}</label>} </div>
            
            <div>
                <label className={style.label}>Seleccionar genero existente: </label>
                <select name="genreId" onChange={handleChange}>
                    <option>Generos</option>
                    {genres.map(g =>(<option key={g.id} value={g.name}>{g.name}</option>))}
                </select>
                {errors.genreId && <label>{errors.genreId}</label>}
                <button type="button" onClick={()=>setActiveGenre(!activeGenre)}>Añadir nuevo genero +</button>
            </div>
            <div>{activeGenre ? <RegisterGenre/>:null}</div>

            
            {/* <div> <input id="duration" name="file" onChange={(e) => handleChange(e)} onBlur={handleBlur} type="time" placeholder="Duracion del evento" /> {errors.duration && <label className={style.error}>{errors.duration}</label>}</div> */}

            <div> <label>Imagen del Artista:* </label> <input id="performerImage" name="file" onChange={(e) => uploadImage(e)} onBlur={handleBlur} type="file" placeholder="Imagen del artista" /> {errors.performerImage && <label className={style.error}>{errors.performerImage}</label>}</div>
            <div> <label>Imagen del Lugar:* </label> <input id="placeImage" name="file" onChange={(e) => uploadImage(e)} onBlur={handleBlur} type="file" placeholder="Imagen del lugar" />  {errors.placeImage && <label className={style.error}>{errors.placeImage}</label>}</div>

            <div>
                <label className={style.label}>Seleccionar lugar del evento: </label>
                <select name="venueId" onChange={handleChange}>
                    <option>Lugares</option>
                    {venues.map(v =>(<option key={v.id} value={v.id}>{v.name}</option>))}
                </select>
                {errors.venueId && <label>{errors.venueId}</label>}
                <button type="button" onClick={()=>setActiveVenue(!activeVenue)}>Añadir nuevo Establecimiento +</button>
            </div>
            <div>{activeVenue ? <RegisterVenue/>:null}</div>
            
            <div> <label>Descripcion del evento: </label> <textarea name="description" value={event.description}  onChange={handleChange} type="text" placeholder="Descripcion" /> </div>

            <div> <button type="button" onClick={()=>setActiveStock(!activeStock)}>Desplegar seleccion de stock y precios</button> </div>
            <div>{activeStock ? 
                <div>
                    <h4>Entradas y Precios</h4>
                    <div>
                    <label>Stock entradas generales:* </label> <input name="stockGeneral" value={stock.stockGeneral} onChange={handleStock} type="text" placeholder="Precio" /> 
                    <label>Precio:* </label> <input name="generalPrice" value={stock.generalPrice} onChange={handleStock} type="text" placeholder="Precio" />
                    </div>

                    <div>
                    <label>Stock entradas zona Lateral: </label> <input name="stockGeneralLateral" value={stock.stockGeneralLateral} onChange={handleStock} type="text" placeholder="Precio" /> 
                    <label>Precio: </label> <input name="generalLateralPrice" value={stock.generalLateralPrice} onChange={handleStock} type="text" placeholder="Precio" />
                    </div>

                    <div>
                    <label>Stock entradas palco: </label> <input name="stockPalco" value={stock.stockPalco} onChange={handleStock} type="text" placeholder="Precio" /> 
                    <label>Precio: </label> <input name="palcoPrice" value={stock.palcoPrice} onChange={handleStock} type="text" placeholder="Precio" />
                    </div>

                    <div>
                    <label>Stock entradas via streaming: </label> <input name="stockStreaming" value={stock.stockStreaming} onChange={handleStock} type="text" placeholder="Precio" />
                    <label>Precio: </label> <input name="streamingPrice" value={stock.streamingPrice} onChange={handleStock} type="text" placeholder="Precio" />
                    </div>

                    <div>
                    <label>Stock entradas VIP: </label> <input name="stockkVIP" value={stock.stockkVIP} onChange={handleStock} type="text" placeholder="Precio" /> 
                    <label>Precio: </label> <input name="vipPrice" value={stock.vipPrice} onChange={handleStock} type="text" placeholder="Precio" />
                    </div>

                    {/* {errors.stockId && <label>{errors.stockId}</label>} */}
                    {/* <button type="button" onClick={handleAddStock}>Añadir stock</button> */}
                </div> 
            : null }</div>

            <Link to='/'><button >Volver a inicio</button></Link>
            
            <button type="submit">Crear</button>
        </form>

       </div>
        <div className={style.footer}>
        <Footer/>
         </div>
    </div>)
};