
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetVenues, CreateVenue } from '../../redux/actions';

// function validate(venue){
//     const error = {}
//     if(!venue.name){
//         error.name = "Ingrese el nombre el establecimiento"
//     }
//     if(!/^[a-z0-9-]{3,16}$/.test(venue.name)){
//         error.name = "Ingrese un nombre con caracteres validos"
//     }
//     if(!venue.address){
//         error.address = "Ingrese la direccion del establecimiento"
//     }
//     if(!/^[a-z0-9-]{3,16}$/.test(venue.address)){
//         error.address = "Ingrese una direcion con caracteres validos"
//     }
//     if(!venue.map){
//         error.map = "Ingrese la ubicacion URL del mapa"
//     }
//     if(!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(venue.map)){
//         error.map = "Ingrese una URL valida"
//     }
//     if(!venue.maxStockGeneral){
//         error.maxStockGeneral = "Ingrese la cantidad maxima general de espectadores"
//     }
//     if(!/^^[0-9]$/.test(venue.maxStockGeneral)){
//         error.maxStockGeneral = "Ingrese valores numericos"
//     }
//     return error
// }

export default function RegisterVenue(){
    const dispatch = useDispatch();
    const [activeVenue, setActiveVenue] = useState(true)
    const [venue, setVenue] = useState({
        name: "",
        address: "",
        map: "",
        maxStockGeneral: 0,
        maxStockGeneralLateral: 0,
        maxStockPalco: 0,
        maxStockStreaming: 0,
        maxStockVIP: 0,
        minStock: 0
    })
    const [error, setError] = useState({
        name: "",
        address: "",
        map: "",
        maxStockGeneral: ""
    });

    const handleVenue = (e) =>{
        if(e.target.name === "maxStockGeneral"){
            setVenue({
                ...venue,
                [e.target.name]: Number(e.target.value),
            })
            return 
        }
        else if(e.target.name === "maxStockGeneralLateral"){
            setVenue({
                ...venue,
                [e.target.name]: Number(e.target.value),
            })
            return 
        }
        else if(e.target.name === "maxStockPalco"){
            setVenue({
                ...venue,
                [e.target.name]: Number(e.target.value),
            })
            return 
        }
        else if(e.target.name === "maxStockStreaming"){
            setVenue({
                ...venue,
                [e.target.name]: Number(e.target.value),
            })
            return 
        }
        else if(e.target.name === "maxStockVIP"){
            setVenue({
                ...venue,
                [e.target.name]: Number(e.target.value),
            })
            return 
        }
        setVenue({
            ...venue,
            minStock: Math.floor((venue.maxStockGeneral+(venue.maxStockGeneralLateral || 0)+(venue.maxStockPalco || 0)+(venue.maxStockStreaming || 0)+(venue.maxStockVIP || 0))*0.7),
            [e.target.name]: e.target.value
        })
    };

    const handleAddVenue = async(e) =>{
        e.preventDefault();
        if(error.name !== "" || error.address !== "" || error.map !== "" || error.maxStockGeneral !== ""){
            alert("Debe solucionar los errores en los campos obligatorios del establecimiento")
        }
        if(venue.name === "" || venue.address === "" || venue.map === "" || venue.maxStockGeneral === 0){
            setError({
                name: venue.name === "" ? "Ingrese el nombre el establecimiento" : "",
                address: venue.address === "" ? "Ingrese la direccion del establecimiento" : "",
                map: venue.map === "" ? "Ingrese la ubicacion URL del mapa" : "",
                maxStockGeneral: venue.maxStockGeneral === 0 ? "Ingrese la cantidad maxima general de espectadores" : ""
            });
            return
        }
        const venueCreated = await dispatch(CreateVenue(venue));
        console.log(venueCreated)
        if(venueCreated.data[0]){
            dispatch(GetVenues());
            alert("Establecimiento añadido a la lista de lugares")
            setVenue({
                name: "",
                address: "",
                map: "",
                maxStockGeneral: 0,
                maxStockGeneralLateral: 0,
                maxStockPalco: 0,
                maxStockStreaming: 0,
                maxStockVIP: 0,
                minStock: 0
            });
            setActiveVenue(!activeVenue)
        }
    };

    const handleBlurVenue = (e) => {
        //validar nombre
        if(e.target.name === "name"){
            if(e.target.value === ""){
                setError({
                    ...error,
                    [e.target.name]: "Ingrese el nombre el establecimiento"
                })
            }else if (!/^[a-z0-9-]{3,16}$/.test(e.target.value)){
                setError({
                    ...error,
                    [e.target.name]: "Ingrese un nombre con caracteres validos"
                })
            } else {
                setError({
                    ...error,
                    [e.target.name]: ""
                })
            }    
        }
        //validar direccion
        if(e.target.name === "address"){
            if(e.target.value === ""){
                setError({
                    ...error,
                    [e.target.name]: "Ingrese la direccion del establecimiento"
                })
            }else if (!/^[a-z0-9-]{3,16}$/.test(e.target.value)){
                setError({
                    ...error,
                    [e.target.name]: "Ingrese una direcion con caracteres validos"
                })
            } else {
                setError({
                    ...error,
                    [e.target.name]: ""
                })
            }    
        }
        //validar mapa
        if(e.target.name === "map"){
            if(e.target.value === ""){
                setError({
                    ...error,
                    [e.target.name]: "Ingrese la ubicacion URL del mapa"
                })
            }else if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(e.target.value)){
                setError({
                    ...error,
                    [e.target.name]: "Ingrese una URL valida"
                })
            } else {
                setError({
                    ...error,
                    [e.target.name]: ""
                })
            }    
        }
        //validar stock maximo general
        if(e.target.name === "maxStockGeneral"){
            if(e.target.value === 0){
                setError({
                    ...error,
                    [e.target.name]: "Ingrese la cantidad maxima general de espectadores"
                })
            } else {
                setError({
                    ...error,
                    [e.target.name]: ""
                })
            }    
        }
    };

    return(<div> {activeVenue ? <div>
        <div> <label>Nombre del nuevo establecimiento:* </label> <input name="name" value={venue.name}  onChange={handleVenue} onBlur={handleBlurVenue} type="text" placeholder="Nombre del nuevo establecimiento" />{error.name && (<label>{error.name}</label>)} </div>

        <div> <label>Direccion del nuevo establecimiento:* </label> <input name="address" value={venue.address}  onChange={handleVenue} onBlur={handleBlurVenue} type="text" placeholder="Direccion del nuevo establecimiento" />{error.address && (<label>{error.address}</label>)} </div>

        <div> <label>Ubicacion map del nuevo establecimiento:* </label> <input name="map" value={venue.map}  onChange={handleVenue} onBlur={handleBlurVenue} type="url" placeholder="URL mapa del nuevo establecimiento" />{error.map && (<label>{error.map}</label>)} </div>

        <div> <label>Maxima capacidad general de espectadores:* </label> <input name="maxStockGeneral" value={venue.maxStockGeneral} onChange={handleVenue} onBlur={handleBlurVenue} type="number" placeholder="Cantidad maxima general de expectadores" />{error.maxStockGeneral && (<label>{error.maxStockGeneral}</label>)} </div>

        <div> <label>Maxima capacidad lateral de espectadores: </label> <input name="maxStockGeneralLateral" value={venue.maxStockGeneralLateral}  onChange={handleVenue} type="number" placeholder="Cantidad maxima de expectadores en zonas laterales" />{error.maxStockGeneralLateral && (<label>{error.maxStockGeneralLateral}</label>)} </div>

        <div> <label>Maxima capacidad palco de espectadores: </label> <input name="maxStockPalco" value={venue.maxStockPalco}  onChange={handleVenue} type="number" placeholder="Cantidad maxima de expectadores en zonas palco" />{error.maxStockPalco && (<label>{error.maxStockPalco}</label>)} </div>

        <div> <label>Maxima capacidad de espectadores via streaming: </label> <input name="maxStockStreaming" value={venue.maxStockStreaming}  onChange={handleVenue} type="number" placeholder="Cantidad maxima de expectadores via streaming" />{error.maxStockStreaming && (<label>{error.maxStockStreaming}</label>)} </div>

        <div> <label>Maxima capacidad de espectadores VIP: </label> <input name="maxStockVIP" value={venue.maxStockVIP}  onChange={handleVenue} type="number" placeholder="Cantidad maxima de expectadores VIP" />{error.maxStockVIP && (<label>{error.maxStockVIP}</label>)} </div>

        <div><span>Stock minimo de espectadores registrado: {venue.minStock}</span></div>

        <button onClick={handleAddVenue}>Añadir</button>

    </div>:null} </div>)
}
