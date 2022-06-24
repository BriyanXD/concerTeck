
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import style from './RegisterUser.module.css';
import { CreateEvent, GetGenres, CreateGenre, GetVenues } from '../../redux/actions';
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import style from './RegisterEvents.module.css'

//       name,
//       artist,
//       genre,
//       schedule,
//       performerImage,
//       placeImage,
//       description,
//       venueId,
//       stockId,

export default function RegisterEvent(){
    const dispatch = useDispatch()
    //const [image, setImage] = useState("")
    const genres = useSelector((state)=> state.Genres);
    const venues = useSelector((state) => state.Venues);
    const [postGenre, setPostGenre] = useState({
        name: ""
    })
    const [event, setEvent] = useState({
        name: "",
        artist: "",
        genre: null,
        schedule: "",
        performerImage: "",
        placeImage: "",
        description: "",
        venueId: null,
//      stockId: "",
    })

    const [errors, setErrors] = useState({
        name: "",
        artist: "",
        genre: null,
        schedule: "",
        performerImage: "",
        placeImage: "",
        description: "",
        venueId: null,
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
        //errors.genre !== [] ||
        errors.schedule !== "" ||
        errors.performerImage !== "" ||
        errors.placeImage !== "" ||
        errors.description !== "" ){
        //errors.venueId !== [] ){
            alert("Para poder registrar el Evento deben solucionarse los errores");
        }
        if ( event.name !== "" ||
        event.artist !== "" ||
        //event.genre !== [] ||
        event.schedule !== "" ||
        event.performerImage !== "" ||
        event.placeImage !== "" ||
        event.description !== ""){
        //errors.venueId !== [] ){
            setErrors({
                name: event.name === "" ? "Ingrese el nombre del Evento" : "",
                artist: event.artist === "" ? "Ingrese el nombre del artista del Evento" : "",
                //genre: event.genre === [] ? "Ingrese el genero del Evento" : event.genre.length > 1 ? "El Evento solo deve pertenecer a un solo genero" : "",
                schedule: event.schedule === "" ? "Ingrese la fecha y hora del Evento" : "",
                performerImage: event.performerImage === "" ? "Ingrese la imagen del artista" : "",
                placeImage: event.placeImage === "" ? "Ingrese la imagen del lugar del Evento" : "",
                description: "",
                //venueId: event.venueId === [] ? "Ingrese el lugar del evento" : event.venueId.length > 1 ? "El Evento no puede pertenecer a mas de un lugar" : ""
            });
            return
        }
        dispatch(CreateEvent(event));
        alert("Evento creado exitosamente");
        setEvent({
            name: "",
            artist: "",
            genre: null,
            schedule: "",
            performerImage: "",
            placeImage: "",
            description: "",
            venueId: null,
    //      stockId: "",
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

        //validar genero
        // if(e.target.name === "genre"){
        //     if(event.genre.length === 0){
        //         setErrors({
        //             ...errors,
        //             [e.target.name]: "Ingrese el genero del Evento"
        //         })
        //     }else if (event.genre.length > 1){
        //         setErrors({
        //             ...errors,
        //             [e.target.name]: "El Evento solo deve pertenecer a un solo genero"
        //         })
        //     } else {
        //         setErrors({
        //             ...errors,
        //             [e.target.name]: ""
        //         })
        //     }    
        // }

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
        // if(e.target.name === "venueId"){
        //     if(event.venueId.length === 0){
        //         setErrors({
        //             ...errors,
        //             [e.target.name]: "Ingrese el lugar del evento"
        //         })
        //     }else if (event.venueId.length > 1){
        //         setErrors({
        //             ...errors,
        //             [e.target.name]: "El Evento no puede pertenecer a mas de un lugar"
        //         })
        //     } else {
        //         setErrors({
        //             ...errors,
        //             [e.target.name]: ""
        //         })
        //     }    
        // }
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
            venueId:event.venueId
        })
    };

    function handleGenreSelect(e){
        setEvent({
            ...event,
            genre:event.genre
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

    return (<div className={style.container}>
        <NavBar/>
        <div className={style.card}>
        <h2 className={style.h2}>Crear Evento</h2>
        <form onSubmit={handleSubmit} className={style.form}>
            <div> <input name="name" value={event.name}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Nombre" /> {errors.name && <label className={style.error}>{errors.name}</label>}</div>
            <div> <input name="artist" value={event.artist}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Artista" /> {errors.artist && <label className={style.error}>{errors.artist}</label>}</div>

            {/* <div>
                <label>Seleccionar genero existente: </label>
                <div>
                    {genres.map((typeGenre, index) => (
                        <> <input
                            key={index}
                            type="checkbox"
                            name="genre"
                            id={typeGenre.name}
                            value={typeGenre.name}
                            onChange={(e)=>handleCheck(e)}
                            onBlur={handleBlur}
                        /> <label htmlFor={typeGenre.name}>{typeGenre.name}</label> <br/> </>
                    ))}
                </div>
                    {errors.genre && <label>{errors.genre}</label>}
                <div>
                    <form onSubmit={handleGenreSubmit}>
                        <div> <input name="name" value={event.genre} onChange={(e)=>handleCheck(e)} onBlur={handleBlur} type="text" placeholder="Nuevo genero"/> {errors.genre && <label>{errors.genre}</label>}</div>
                        <button type="submit">Crear genero</button>
                    </form>
                </div>
            </div> */}

            <div>
                <label className={style.label}>Seleccionar genero existente: </label>
                <select onChange={handleGenreSelect}>
                    {genres.map(g =>(<option key={g.id} value={g.name}>{g.name}</option>))}
                </select>
                {/* {errors.genre && <label>{errors.genre}</label>} */}
            </div>
            
            <div> <input name="schedule" value={event.schedule}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Hora y Fecha" /> {errors.schedule && <label className={style.error}>{errors.schedule}</label>}</div>
            <div> <input id="performerImage" name="file" onChange={(e) => uploadImage(e)} onBlur={handleBlur} type="file" placeholder="Imagen del artista" /> {errors.performerImage && <label className={style.error}>{errors.performerImage}</label>}</div>
            <div> <input id="placeImage" name="file" onChange={(e) => uploadImage(e)} onBlur={handleBlur} type="file" placeholder="Imagen del lugar" /> {errors.placeImage && <label className={style.error}>{errors.placeImage}</label>}</div>
            <div> <input name="description" value={event.description}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Descripcion" /> {errors.description && <label className={style.error}>{errors.description}</label>}</div>
            
            <div>
                <label className={style.label}>Seleccionar lugar del evento: </label>
                <select onChange={handleVenueSelect}>
                    {venues.map(v =>(<option key={v.id} value={v.name}>{v.name}</option>))}
                </select>
                {/* {errors.venueId && <label>{errors.venueId}</label>} */}
            </div>
            
            <button type="submit">Crear</button>
        </form>
        </div>
        <div className={style.footer}>
        <Footer/>
        </div>
    </div>)
};
