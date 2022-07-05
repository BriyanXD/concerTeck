
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetVenues, CreateVenue, CreateStock } from '../../redux/actions';


export default function RegisterVenue(){
    const dispatch = useDispatch();
    const [activeVenue, setActiveVenue] = useState(true)
    const [mapCord, setMapCord] = useState({
        alt: "",
        lat: ""
    })
    const [stock, setStock] = useState({
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
    })
    const [venue, setVenue] = useState({
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
    const [errStock, setErrStock] = useState({})

    const handleMap = (e) => {
        if(e.target.name === "alt"){
            if(e.target.value[0] != "-"){
                return alert("La coordenada debe empezar con un signo -")
            } else if (e.target.value[3] != "."){
                return alert("Error en la sintaxis de la coordenada, debe contener un punto")
            } else {
                setMapCord({
                    ...mapCord,
                    alt: e.target.value
                })
            }
        }
        if(e.target.name === "lat"){
            if(e.target.value[0] != "-"){
                return alert("La coordenada debe empezar con un signo -")
            } else if (e.target.value[3] != "."){
                return alert("Error en la sintaxis de la coordenada, debe contener un punto")
            } else {
                setMapCord({
                    ...mapCord,
                    lat: e.target.value
                })
            } 
        }
        if(mapCord.alt !== "" && mapCord.lat !== ""){
            setVenue({
                ...venue,
                map: mapCord.alt + " " + mapCord.lat
            })
        }
    }

    const handleVenue = (e) =>{
        if(e.target.name === "maxStockGeneral"){
            setVenue({
                ...venue,
                [e.target.name]: Number(e.target.value),
            });
            if(venue.maxStockGeneral !== 0){
                setStock({
                    ...stock,
                    stockGeneral: venue.maxStockGeneral
                });
            }
            return 
        }
        else if(e.target.name === "maxStockGeneralLateral"){
            setVenue({
                ...venue,
                [e.target.name]: Number(e.target.value),
            });
            if(venue.maxStockGeneralLateral !== 0){
                setStock({
                    ...stock,
                    stockGeneralLateral: venue.maxStockGeneralLateral
                });
            }
            return 
        }
        else if(e.target.name === "maxStockPalco"){
            setVenue({
                ...venue,
                [e.target.name]: Number(e.target.value),
            });
            if(venue.maxStockPalco !== 0){
                setStock({
                    ...stock,
                    stockPalco: venue.maxStockPalco
                });
            }
            return 
        }
        else if(e.target.name === "maxStockStreaming"){
            setVenue({
                ...venue,
                [e.target.name]: Number(e.target.value),
            });
            if(venue.maxStockStreaming !== 0){
                setStock({
                    ...stock,
                    stockStreaming: venue.maxStockStreaming
                });
            }
            return 
        }
        else if(e.target.name === "maxStockVIP"){
            setVenue({
                ...venue,
                [e.target.name]: Number(e.target.value),
            });
            if(venue.maxStockVIP !== 0){
                setStock({
                    ...stock,
                    stockkVIP: venue.maxStockVIP
                });
            }
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
            //minStock: Math.floor((venue.maxStockGeneral+(venue.maxStockGeneralLateral || 0)+(venue.maxStockPalco || 0)+(venue.maxStockStreaming || 0)+(venue.maxStockVIP || 0))*0.7),
            [e.target.name]: e.target.value
        })
    };

    const handleStock = (e) =>{
        // if(venue.maxStockGeneral !== 0){
        //     setStock({
        //         ...stock,
        //         stockGeneral: venue.maxStockGeneral
        //     });
        // }
        // if(venue.maxStockGeneralLateral !== 0){
        //     setStock({
        //         ...stock,
        //         stockGeneralLateral: venue.maxStockGeneralLateral
        //     });
        // }
        // if(venue.maxStockPalco !== 0){
        //     setStock({
        //         ...stock,
        //         stockPalco: venue.maxStockPalco
        //     });
        // }
        // if(venue.maxStockStreaming !== 0){
        //     setStock({
        //         ...stock,
        //         stockStreaming: venue.maxStockStreaming
        //     });
        // }
        // if(venue.maxStockVIP !== 0){
        //     setStock({
        //         ...stock,
        //         stockkVIP: venue.maxStockVIP
        //     });
        // }
        setStock({
            ...stock,
            [e.target.name]: Number(e.target.value)
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
            setStock({
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
    console.log("SETEANDO STOCK: ", stock);
    
    return(<div> {activeVenue ? <div>
        <div> <label>Nombre del nuevo establecimiento:* </label> <input name="name" value={venue.name}  onChange={handleVenue} onBlur={handleBlurVenue} type="text" placeholder="Nombre del nuevo establecimiento" />{error.name && (<label>{error.name}</label>)} </div>

        <div> <label>Direccion del nuevo establecimiento:* </label> <input name="address" value={venue.address}  onChange={handleVenue} onBlur={handleBlurVenue} type="text" placeholder="Direccion del nuevo establecimiento" />{error.address && (<label>{error.address}</label>)} </div>

        {/* <div> <label>Ubicacion de coordinadas del nuevo establecimiento:* </label> <input name="map" value={venue.map}  onChange={handleVenue} onBlur={handleBlurVenue} type="text" placeholder="Altitud y Latitud del nuevo establecimiento" />{error.map && (<label>{error.map}</label>)} </div> */}
        <div> <label>Coordenada de Altitud:* </label> <input id="alt" name="alt" onChange={handleMap} onBlur={handleBlurVenue} type="text" placeholder="Coordenadas de Altitud" />{error.map && (<label>{error.map}</label>)} </div>
        <div> <label>Coordenada de Latitud:* </label> <input id="lat" name="lat" onChange={handleMap} onBlur={handleBlurVenue} type="text" placeholder="Coordenadas de Latitud" />{error.map && (<label>{error.map}</label>)} </div>

        <div> 
            <label>Stock general:* </label> <input name="maxStockGeneral" value={venue.maxStockGeneral} onChange={handleVenue} onBlur={handleBlurVenue} type="text" placeholder="Cantidad maxima general de expectadores" />{error.maxStockGeneral && (<label>{error.maxStockGeneral}</label>)}
            <label>Precio general:* </label> <input name="generalPrice" value={stock.generalPrice} onChange={handleStock} type="text" placeholder="Precio" />
        </div>

        <div> 
            <label>Stock lateral: </label> <input name="maxStockGeneralLateral" value={venue.maxStockGeneralLateral}  onChange={handleVenue} type="text" placeholder="Cantidad maxima de expectadores en zonas laterales" />{error.maxStockGeneralLateral && (<label>{error.maxStockGeneralLateral}</label>)}
            <label>Precio lateral: </label> <input name="generalLateralPrice" value={stock.generalLateralPrice} onChange={handleStock} type="text" placeholder="Precio" />
        </div>

        <div> 
            <label>Stock palco: </label> <input name="maxStockPalco" value={venue.maxStockPalco}  onChange={handleVenue} type="text" placeholder="Cantidad maxima de expectadores en zonas palco" />{error.maxStockPalco && (<label>{error.maxStockPalco}</label>)} 
            <label>Precio palco: </label> <input name="palcoPrice" value={stock.palcoPrice} onChange={handleStock} type="text" placeholder="Precio" />
        </div>

        <div> 
            <label>Stock streaming: </label> <input name="maxStockStreaming" value={venue.maxStockStreaming}  onChange={handleVenue} type="text" placeholder="Cantidad maxima de expectadores via streaming" />{error.maxStockStreaming && (<label>{error.maxStockStreaming}</label>)} 
            <label>Precio streaming: </label> <input name="streamingPrice" value={stock.streamingPrice} onChange={handleStock} type="text" placeholder="Precio" />
        </div>

        <div> 
            <label>Stock VIP: </label> <input name="maxStockVIP" value={venue.maxStockVIP}  onChange={handleVenue} type="text" placeholder="Cantidad maxima de expectadores VIP" />{error.maxStockVIP && (<label>{error.maxStockVIP}</label>)} 
            <label>Precio VIP: </label> <input name="vipPrice" value={stock.vipPrice} onChange={handleStock} type="text" placeholder="Precio" />
        </div>

        {/* <div><span>Stock minimo de espectadores registrado: {venue.minStock}</span></div> */}

        <button onClick={handleAddVenue}>Añadir</button>

    </div>:null} </div>)
}
