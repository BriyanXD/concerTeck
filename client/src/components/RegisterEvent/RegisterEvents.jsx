
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
//Working

export default function RegisterEvent(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeGenre, setActiveGenre] = useState(false);
    const [activeVenue, setActiveVenue] = useState(false);
    //const [activeStock, setActiveStock] = useState(false);
    const [repitedEvent, setRepitedEvent] = useState("");

    const [activeStockGeneral , setActiveStockGeneral] = useState({
        stock: "",
        price:""
    });
    const [activeLateralStock, setActiveLateralStock] = useState({
        stock: "",
        price:""
    });
    const [activePalcoStock, setActivePalcoStock] = useState({
        stock: "",
        price:""
    });
    const [activeVIPStock, setActiveVIPStock] = useState({
        stock: "",
        price:""
    });
    const [activeStreamingStock, setActiveStreamingStock] = useState({
        stock: "",
        price:""
    });
    //const [stockAllOk, setStockAllOk] = useState(false);
    const [foundVenue, setFoundVenue] = useState(null);

    const [dateTime, setDateTime] = useState(new Date());
    const Allevents = useSelector((state) => state.AllEvents);
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
            await setFoundVenue(
                venues.find(v => v.id === e.target.value)
            );
            console.log("Se Encontro El Venue Relacionado", foundVenue)
            return 
        }
         else if(e.target.name === "schedule"){
            //await setDateTime(e.taget.value);
            await setEvent({
                ...event,
                schedule: dateTime
            });
            await setStock({
                ...stock,
                id: event.name + event.artist + event.schedule
            });
            return 
        }
        else if(e.target.name === "name"){
            await setEvent({
                ...event,
                name: e.target.value
            });
            await setStock({
                ...stock,
                id: event.name + event.artist + event.schedule
            });
            return 
        }
        else if(e.target.name === "artist"){
            await setEvent({
                ...event,
                artist: e.target.value
            });
            await setStock({
                ...stock,
                id: event.name + event.artist + event.schedule
            });
            return 
        }
        else if(e.target.name === "description"){
            await setEvent({
                ...event,
                description: e.target.value
            })
            return 
        }
        await setEvent({
            ...event,
            schedule: dateTime,
            [e.target.name]: e.target.value
        });
        await setStock({
            ...stock,
            id: event.name + event.artist + event.schedule
        });
            // if(event.name !== "" && event.artist !== "" && event.schedule !== ""){
            //     await setStock({
            //         ...stock,
            //         id: event.name + event.artist + event.schedule
            //     });
            // }
            // if(stock.id !== ""){
            //     await setEvent({
            //         ...event,
            //         stockId: stock.id
            //     });
            // }
    };

    const handleStock = async(e) =>{
        await setStock({
            ...stock,
            id: event.name + event.artist + event.schedule,
            [e.target.name]: Number(e.target.value)
        });
        if(stock.id !== ""){
            await setEvent({
                ...event,
                stockId: stock.id
            });
        }
    };

    const handleAddStock = async(e) => {
        e.preventDefault();
        if(stock.stockGeneral === 0 || stock.generalPrice === 0){
            setActiveStockGeneral({
                stock: stock.stockGeneral === 0 ? "Ingrese la cantidad de entradas disponibles" : "",
                price: stock.generalPrice === 0 ? "Ingrese el precio de las entradas" : ""
            })
            return 
        }
        if (foundVenue.maxStockGeneralLateral !== 0 && (stock.stockGeneralLateral === 0 || stock.generalLateralPrice === 0)){
            setActiveLateralStock({
                stock: stock.stockGeneralLateral === 0 ? "Ingrese la cantidad de entradas disponibles" : "",
                price: stock.generalLateralPrice === 0 ? "Ingrese el precio de las entradas" : ""
            })
            return 
        }
        if (foundVenue.maxStockPalco !== 0 && (stock.stockPalco === 0 || stock.palcoPrice === 0)){
            setActivePalcoStock({
                stock: stock.stockPalco === 0 ? "Ingrese la cantidad de entradas disponibles" : "",
                price: stock.palcoPrice === 0 ? "Ingrese el precio de las entradas" : ""
            })
            return 
        }
        if (foundVenue.maxStockStreaming !== 0 && (stock.stockStreaming === 0 || stock.streamingPrice === 0)){
            setActiveStreamingStock({
                stock: stock.stockStreaming === 0 ? "Ingrese la cantidad de entradas disponibles" : "",
                price: stock.streamingPrice === 0 ? "Ingrese el precio de las entradas" : ""
            })
            return 
        }
        if (foundVenue.maxStockVIP !== 0 && (stock.stockkVIP === 0 || stock.vipPrice === 0)){
            setActiveVIPStock({
                stock: stock.stockkVIP === 0 ? "Ingrese la cantidad de entradas disponibles" : "",
                price: stock.vipPrice === 0 ? "Ingrese el precio de las entradas" : ""
            })
            return 
        }
        const stockCreated = await dispatch(CreateStock(stock));
        console.log("AQUI EL STOCK CREADO", stockCreated);
        if(stockCreated.data[0]){
            //setStockAllOk(true)
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
                venueId: "",
            });
            //setActiveStock(!activeStock);
        }    
    };

    const ControlDoNotRepeat = async(newEvent) =>{
        const sameVenue = Allevents.find(e => e.venueId === newEvent.venueId);
        const sameTime = Allevents.find(e => e.schedule === newEvent.schedule);
        const sameArtist = Allevents.find(e => e.artist === newEvent.artist);
        if((sameVenue && sameTime) && (sameVenue.schedule === sameTime.schedule) && (sameVenue.venueId === sameTime)){
            //alert("Ya existe otro evento ocupando el mismo lugar a la misma fecha y hora")
            setRepitedEvent("Ya existe otro evento ocupando el mismo lugar a la misma fecha y hora")
            return 
        }
        else if((sameTime && sameArtist) && (sameTime.artist === sameArtist.artist) && (sameTime.schedule === sameArtist.schedule) && (sameTime.venueId !== sameArtist.venueId)){
            //alert("Ya existe otro evento en otro lugar donde el artista deba cantar en la misma fecha y hora")
            setRepitedEvent("Ya existe otro evento en otro lugar donde el artista deba cantar en la misma fecha y hora")
            return 
        }
        else {
            setRepitedEvent("")
            return 
        }
    }

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
            console.log("ERRORES EVENTO", errors)
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
                venueId: event.venueId === "" ? "Ingrese el lugar del evento" : "",
                stockId: event.stockId === "" ? "Se debe llenar el formulario de stock" : ""
            });
            return
        }
        ControlDoNotRepeat(event);
        if(repitedEvent === ""){
            await handleAddStock(e);
            await dispatch(CreateEvent(event));
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
            setFoundVenue(null);
            navigate("/")
        }
        else {
            return alert(`${repitedEvent}`)
        }
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
        //validar Lugar/Venue
        if(e.target.name === "venueId"){
            if(e.target.value === ""){
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

    const handleBlurStock = (e) => {
        //STOCK GENERAL
        if(e.target.name === "stockGeneral"){
            if(e.target.value === 0){
                setActiveStockGeneral({
                    ...activeStockGeneral,
                    stock: "Ingrese la cantidad de entradas disponibles"
                })
            }
            else if (!/^[0-9,$]*$/.test(e.target.value)){
                setActiveStockGeneral({
                    ...activeStockGeneral,
                    stock: "Ingrese un valor numerico"
                })
            }
            else if(e.target.value > foundVenue.maxStockGeneral){
                setActiveStockGeneral({
                    ...activeStockGeneral,
                    stock: `El stock genera NO debe superar las ${foundVenue.maxStockGeneral} entradas`
                })
            }
            else {
                setActiveStockGeneral({
                    ...activeStockGeneral,
                    stock: ""
                })
            }
        }
        //PRECIO GENERAL
        if(e.target.name === "generalPrice"){
            if(e.target.value === 0){
                setActiveStockGeneral({
                    ...activeStockGeneral,
                    price: "Ingrese el precio de las entradas"
                })
            }
            else if (!/^[0-9,$]*$/.test(e.target.value)){
                setActiveStockGeneral({
                    ...activeStockGeneral,
                    price: "Ingrese un valor numerico"
                })
            }
            else {
                setActiveStockGeneral({
                    ...activeStockGeneral,
                    price: ""
                })
            }
        }
        //STOCK LATERAL
        if(foundVenue.maxStockGeneralLateral !== 0 && e.target.name === "stockGeneralLateral"){
            if(e.target.value === 0){
                setActiveLateralStock({
                    ...activeLateralStock,
                    stock: "Ingrese la cantidad de entradas disponibles"
                })
            }
            else if (!/^[0-9,$]*$/.test(e.target.value)){
                setActiveLateralStock({
                    ...activeLateralStock,
                    stock: "Ingrese un valor numerico"
                })
            }
            else if(e.target.value > foundVenue.maxStockGeneralLateral){
                setActiveLateralStock({
                    ...activeLateralStock,
                    stock: `El stock genera NO debe superar las ${foundVenue.maxStockGeneralLateral} entradas`
                })
            }
            else {
                setActiveLateralStock({
                    ...activeLateralStock,
                    stock: ""
                })
            }
        }
        //PRECIO LATERAL
        if(foundVenue.maxStockGeneralLateral !== 0 && e.target.name === "generalLateralPrice"){
            if(e.target.value === 0){
                setActiveLateralStock({
                    ...activeLateralStock,
                    price: "Ingrese el precio de las entradas"
                })
            }
            else if (!/^[0-9,$]*$/.test(e.target.value)){
                setActiveLateralStock({
                    ...activeLateralStock,
                    price: "Ingrese un valor numerico"
                })
            }
            else {
                setActiveLateralStock({
                    ...activeLateralStock,
                    price: ""
                })
            }
        }
        //STOCK PALCO
        if(foundVenue.maxStockPalco !== 0 && e.target.name === "stockPalco"){
            if(e.target.value === 0){
                setActivePalcoStock({
                    ...activePalcoStock,
                    stock: "Ingrese la cantidad de entradas disponibles"
                })
            }
            else if (!/^[0-9,$]*$/.test(e.target.value)){
                setActivePalcoStock({
                    ...activePalcoStock,
                    stock: "Ingrese un valor numerico"
                })
            }
            else if(e.target.value > foundVenue.maxStockPalco){
                setActivePalcoStock({
                    ...activePalcoStock,
                    stock: `El stock genera NO debe superar las ${foundVenue.maxStockPalco} entradas`
                })
            }
            else {
                setActivePalcoStock({
                    ...activePalcoStock,
                    stock: ""
                })
            }
        }
        //PRECIO PALCO
        if(foundVenue.maxStockPalco !== 0 && e.target.name === "palcoPrice"){
            if(e.target.value === 0){
                setActivePalcoStock({
                    ...activePalcoStock,
                    price: "Ingrese el precio de las entradas"
                })
            }
            else if (!/^[0-9,$]*$/.test(e.target.value)){
                setActivePalcoStock({
                    ...activePalcoStock,
                    price: "Ingrese un valor numerico"
                })
            }
            else {
                setActivePalcoStock({
                    ...activePalcoStock,
                    price: ""
                })
            }
        }
        //STOCK STREAMING
        if(foundVenue.maxStockStreaming !== 0 && e.target.name === "stockStreaming"){
            if(e.target.value === 0){
                setActiveStreamingStock({
                    ...activeStreamingStock,
                    stock: "Ingrese la cantidad de entradas disponibles"
                })
            }
            else if (!/^[0-9,$]*$/.test(e.target.value)){
                setActiveStreamingStock({
                    ...activeStreamingStock,
                    stock: "Ingrese un valor numerico"
                })
            }
            else if(e.target.value > foundVenue.maxStockStreaming){
                setActiveStreamingStock({
                    ...activeStreamingStock,
                    stock: `El stock genera NO debe superar las ${foundVenue.maxStockStreaming} entradas`
                })
            }
            else {
                setActiveStreamingStock({
                    ...activeStreamingStock,
                    stock: ""
                })
            }
        }
        //PRECIO STREAMING
        if(foundVenue.maxStockStreaming !== 0 && e.target.name === "streamingPrice"){
            if(e.target.value === 0){
                setActiveStreamingStock({
                    ...activeStreamingStock,
                    price: "Ingrese el precio de las entradas"
                })
            }
            else if (!/^[0-9,$]*$/.test(e.target.value)){
                setActiveStreamingStock({
                    ...activeStreamingStock,
                    price: "Ingrese un valor numerico"
                })
            }
            else {
                setActiveStreamingStock({
                    ...activeStreamingStock,
                    price: ""
                })
            }
        }
        //STOCK VIP
        if(foundVenue.maxStockVIP !== 0 && e.target.name === "stockkVIP"){
            if(e.target.value === 0){
                setActiveVIPStock({
                    ...activeVIPStock,
                    stock: "Ingrese la cantidad de entradas disponibles"
                })
            }
            else if (!/^[0-9,$]*$/.test(e.target.value)){
                setActiveVIPStock({
                    ...activeVIPStock,
                    stock: "Ingrese un valor numerico"
                })
            }
            else if(e.target.value > foundVenue.maxStockVIP){
                setActiveVIPStock({
                    ...activeVIPStock,
                    stock: `El stock genera NO debe superar las ${foundVenue.maxStockVIP} entradas`
                })
            }
            else {
                setActiveVIPStock({
                    ...activeVIPStock,
                    stock: ""
                })
            }
        }
        //PRECIO VIP
        if(foundVenue.maxStockVIP !== 0 && e.target.name === "vipPrice"){
            if(e.target.value === 0){
                setActiveVIPStock({
                    ...activeVIPStock,
                    price: "Ingrese el precio de las entradas"
                })
            }
            else if (!/^[0-9,$]*$/.test(e.target.value)){
                setActiveVIPStock({
                    ...activeVIPStock,
                    price: "Ingrese un valor numerico"
                })
            }
            else {
                setActiveVIPStock({
                    ...activeVIPStock,
                    price: ""
                })
            }
        }

    }

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

            <div> <label>Descripcion del evento: </label> <textarea name="description" value={event.description}  onChange={handleChange} type="text" placeholder="Descripcion" /> </div>
            
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
            
            {/* <div> <button type="button" onClick={()=>setActiveStock(!activeStock)}>Desplegar seleccion de stock y precios</button> </div> */}
            <div>{event.venueId !== "" && foundVenue !== null ? 
                <div>
                    <h4>Entradas y Precios</h4>
                    <div>
                        <label>Maximo de {foundVenue.maxStockGeneral} </label>
                        <label>Stock entradas generales:* </label> <input name="stockGeneral" value={stock.stockGeneral} onChange={handleStock} onBlur={handleBlurStock} type="text" placeholder="Precio" /> {activeStockGeneral.stock && <label className={style.error}>{activeStockGeneral.stock}</label>} 
                        <label>Precio:* </label> <input name="generalPrice" value={stock.generalPrice} onChange={handleStock} onBlur={handleBlurStock} type="text" placeholder="Precio" /> {activeStockGeneral.price && <label className={style.error}>{activeStockGeneral.price}</label>}
                    </div>

                    <div>{foundVenue.maxStockGeneralLateral !== 0 ? 
                        <div>
                            <label>Maximo de {foundVenue.maxStockGeneralLateral} </label>
                            <label>Stock entradas zona Lateral: </label> <input name="stockGeneralLateral" value={stock.stockGeneralLateral} onChange={handleStock} onBlur={handleBlurStock} type="text" placeholder="Precio" /> {activeLateralStock.stock && <label className={style.error}>{activeLateralStock.stock}</label>}
                            <label>Precio: </label> <input name="generalLateralPrice" value={stock.generalLateralPrice} onChange={handleStock} onBlur={handleBlurStock} type="text" placeholder="Precio" /> {activeLateralStock.price && <label className={style.error}>{activeLateralStock.price}</label>}
                        </div> : null }
                    </div>

                    <div>{foundVenue.maxStockPalco !== 0 ? 
                        <div>
                            <label>Maximo de {foundVenue.maxStockPalco} </label>
                            <label>Stock entradas palco: </label> <input name="stockPalco" value={stock.stockPalco} onChange={handleStock} onBlur={handleBlurStock} type="text" placeholder="Precio" /> {activePalcoStock.stock && <label className={style.error}>{activePalcoStock.stock}</label>}
                            <label>Precio: </label> <input name="palcoPrice" value={stock.palcoPrice} onChange={handleStock} onBlur={handleBlurStock} type="text" placeholder="Precio" /> {activePalcoStock.price && <label className={style.error}>{activePalcoStock.price}</label>}
                        </div> : null}
                    </div>

                    <div>{foundVenue.maxStockStreaming !== 0 ? 
                        <div>
                            <label>Maximo de {foundVenue.maxStockStreaming} </label>
                            <label>Stock entradas via streaming: </label> <input name="stockStreaming" value={stock.stockStreaming} onChange={handleStock} onBlur={handleBlurStock} type="text" placeholder="Precio" /> {activeStreamingStock.stock && <label className={style.error}>{activeStreamingStock.stock}</label>}
                            <label>Precio: </label> <input name="streamingPrice" value={stock.streamingPrice} onChange={handleStock} onBlur={handleBlurStock} type="text" placeholder="Precio" /> {activeStreamingStock.price && <label className={style.error}>{activeStreamingStock.price}</label>}
                        </div> : null}
                    </div>

                    <div>{foundVenue.maxStockVIP !== 0 ? 
                        <div>
                            <label>Maximo de {foundVenue.maxStockVIP} </label>
                            <label>Stock entradas VIP: </label> <input name="stockkVIP" value={stock.stockkVIP} onChange={handleStock} onBlur={handleBlurStock} type="text" placeholder="Precio" /> {activeVIPStock.stock && <label className={style.error}>{activeVIPStock.stock}</label>}
                            <label>Precio: </label> <input name="vipPrice" value={stock.vipPrice} onChange={handleStock} onBlur={handleBlurStock} type="text" placeholder="Precio" /> {activeVIPStock.price && <label className={style.error}>{activeVIPStock.price}</label>}
                        </div> : null}
                    </div>

                    {/* {errors.stockId && <label>{errors.stockId}</label>} */}
                    {/* <button type="button" onClick={handleAddStock}>Añadir stock</button> */}
                </div> 
            : null }</div>

            <Link to='/'><button >Volver a inicio</button></Link>
            
            <button type="submit">Crear Evento</button>
        </form>

       </div>
        <div className={style.footer}>
        <Footer/>
         </div>
    </div>)
};