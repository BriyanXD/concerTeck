
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetVenues, CreateVenue } from '../../redux/actions';


export default function RegisterVenue(){
    const dispatch = useDispatch();
    const [activeVenue, setActiveVenue] = useState(true)
    const [mapCord, setMapCord] = useState({
        alt: "",
        lat: ""
    })
    const [venue, setVenue] = useState({
        id: "",
        name: "",
        address: "",
        map: "",
        maxStockGeneral: 0,
        maxStockGeneralLateral: 0,
        maxStockPalco: 0,
        maxStockStreaming: 0,
        maxStockVIP: 0,
        //minStock: 0
    })
    const [error, setError] = useState({
        name: "",
        address: "",
        map: "",
        maxStockGeneral: ""
    });

    const handleMap = async(e) => {
        if(e.target.name === "alt"){
            // if(e.target.value[0] !== "-"){
            //     return alert("La coordenada debe empezar con un signo -")
            // } else if (e.target.value[3] !== "."){
            //     return alert("Error en la sintaxis de la coordenada, debe contener un punto")
            // } else {
                await setMapCord({
                    ...mapCord,
                    alt: e.target.value
                })
            //}
        }
        if(e.target.name === "lat"){
            // if(e.target.value[0] !== "-"){
            //     return alert("La coordenada debe empezar con un signo -")
            // } else if (e.target.value[3] !== "."){
            //     return alert("Error en la sintaxis de la coordenada, debe contener un punto")
            // } else {
                await setMapCord({
                    ...mapCord,
                    lat: e.target.value
                })
            //} 
        }
        if(mapCord.alt !== "" && mapCord.lat !== ""){
            await setVenue({
                ...venue,
                map: mapCord.alt + " " + mapCord.lat
            })
        }
    }

    const handleVenue = async(e) =>{
        if(e.target.name === "maxStockGeneral"){
            await setVenue({
                ...venue,
                [e.target.name]: Number(e.target.value),
            });
            return 
        }
        else if(e.target.name === "maxStockGeneralLateral"){
            await setVenue({
                ...venue,
                [e.target.name]: Number(e.target.value),
            });
            return 
        }
        else if(e.target.name === "maxStockPalco"){
            setVenue({
                ...venue,
                [e.target.name]: Number(e.target.value),
            });
            return 
        }
        else if(e.target.name === "maxStockStreaming"){
            setVenue({
                ...venue,
                [e.target.name]: Number(e.target.value),
            });
            return 
        }
        else if(e.target.name === "maxStockVIP"){
            setVenue({
                ...venue,
                [e.target.name]: Number(e.target.value),
            });
            return 
        }
        else if(e.target.name === "name"){
            let nameIdVenue = e.target.value
            nameIdVenue.join('')
            nameIdVenue.toLowerCase()
            console.log("Nombre ID del Venue", nameIdVenue)
            setVenue({
                ...venue,
                id: nameIdVenue, //e.target.value,
                [e.target.name]: e.target.value,
            });
            return 
        }
        // else if(e.target.id === "alt"){
        //     setVenue({
        //         ...venue,
        //         map: e.target.value
        //     })
        // }
        // else if(e.target.id === "lat"){
        //     setVenue({
        //         ...venue,
        //         map: `${venue.map} ${e.target.value}`
        //     })
        // }
        setVenue({
            ...venue,
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
                map: venue.map === "" ? "Ingrese las coordenadas de altitud y latitud del establecimiento" : "",
                maxStockGeneral: venue.maxStockGeneral === 0 ? "Ingrese la cantidad maxima general de espectadores" : ""
            });
            return
        }
        const venueCreated = await dispatch(CreateVenue(venue));
        console.log("AQUI EL VENUE CREADO: ", venueCreated)
        if(venueCreated.data[0]){
            dispatch(GetVenues());
            alert("Establecimiento añadido a la lista de lugares")
            setVenue({
                id: "",
                name: "",
                address: "",
                map: "",
                maxStockGeneral: 0,
                maxStockGeneralLateral: 0,
                maxStockPalco: 0,
                maxStockStreaming: 0,
                maxStockVIP: 0,
                //minStock: 0
            });
            setMapCord({
                alt: "",
                lat: ""
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
            // }else if (!/^[a-z0-9-]{3,16}$/.test(e.target.value)){
            //     setError({
            //         ...error,
            //         [e.target.name]: "Ingrese un nombre con caracteres validos"
            //     })
            } 
            else {
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
            // }else if (!/^[a-z0-9-]{3,16}$/.test(e.target.value)){
            //     setError({
            //         ...error,
            //         [e.target.name]: "Ingrese una direcion con caracteres validos"
            //     })
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
                    [e.target.name]: "Ingrese la direccion del establecimiento"
                })
            // }else if (!/^[0-9]?$/.test(e.target.value)){
            //     setError({
            //         ...error,
            //         [e.target.name]: "Ingrese coordenadas validas"
            //     })
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

    console.log("SETEANDO VENUE: ", venue);
    console.log("SETEANDO MAPA: ", mapCord);
    //console.log("SETEANDO STOCK: ", stock);
    
    return(<div> {activeVenue ? <div>
        <div> <label>Nombre del nuevo establecimiento:* </label> <input name="name" value={venue.name}  onChange={handleVenue} onBlur={handleBlurVenue} type="text" placeholder="Nombre del nuevo establecimiento" />{error.name && (<label>{error.name}</label>)} </div>

        <div> <label>Direccion del nuevo establecimiento:* </label> <input name="address" value={venue.address}  onChange={handleVenue} onBlur={handleBlurVenue} type="text" placeholder="Direccion del nuevo establecimiento" />{error.address && (<label>{error.address}</label>)} </div>

        {/* <div> <label>Ubicacion de coordinadas del nuevo establecimiento:* </label> <input name="map" value={venue.map}  onChange={handleVenue} onBlur={handleBlurVenue} type="text" placeholder="Altitud y Latitud del nuevo establecimiento" />{error.map && (<label>{error.map}</label>)} </div> */}
        <div> <label>Coordenada de Altitud:* </label> <input id="alt" name="alt" onChange={handleMap} onBlur={handleBlurVenue} type="text" placeholder="Coordenadas de Altitud" />{error.map && (<label>{error.map}</label>)} </div>
        <div> <label>Coordenada de Latitud:* </label> <input id="lat" name="lat" onChange={handleMap} onBlur={handleBlurVenue} type="text" placeholder="Coordenadas de Latitud" />{error.map && (<label>{error.map}</label>)} </div>

        <div> 
            <label>Maxima capacidad general de espectadores:*</label> <input name="maxStockGeneral" value={venue.maxStockGeneral} onChange={handleVenue} onBlur={handleBlurVenue} type="text" placeholder="Cantidad maxima general de expectadores" />{error.maxStockGeneral && (<label>{error.maxStockGeneral}</label>)}
        </div>

        <div> 
            <label>Maxima capacidad lateral de espectadores:</label> <input name="maxStockGeneralLateral" value={venue.maxStockGeneralLateral}  onChange={handleVenue} type="text" placeholder="Cantidad maxima de expectadores en zonas laterales" />{error.maxStockGeneralLateral && (<label>{error.maxStockGeneralLateral}</label>)}
        </div>

        <div> 
            <label>Maxima capacidad palco de espectadores:</label> <input name="maxStockPalco" value={venue.maxStockPalco}  onChange={handleVenue} type="text" placeholder="Cantidad maxima de expectadores en zonas palco" />{error.maxStockPalco && (<label>{error.maxStockPalco}</label>)} 
        </div>

        <div> 
            <label>Maxima capacidad de espectadores via streaming:</label> <input name="maxStockStreaming" value={venue.maxStockStreaming}  onChange={handleVenue} type="text" placeholder="Cantidad maxima de expectadores via streaming" />{error.maxStockStreaming && (<label>{error.maxStockStreaming}</label>)} 
        </div>

        <div> 
            <label>Maxima capacidad de espectadores VIP:</label> <input name="maxStockVIP" value={venue.maxStockVIP}  onChange={handleVenue} type="text" placeholder="Cantidad maxima de expectadores VIP" />{error.maxStockVIP && (<label>{error.maxStockVIP}</label>)} 
        </div>


        <button onClick={handleAddVenue}>Añadir</button>

    </div>:null} </div>)
}
