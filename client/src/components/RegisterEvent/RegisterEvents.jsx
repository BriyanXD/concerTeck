
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import style from './RegisterUser.module.css';
import { CreateEvent, GetGenres } from '../../redux/actions';


export default function RegisterEvent(){
    const dispatch = useDispatch()
    //const [image, setImage] = useState("")
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

    useEffect(()=>{
        dispatch(GetGenres())  
    }, [dispatch]) 

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
            if(event.genre.length === 0){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese el genero del Evento"
                })
            }else if (event.genre.length > 1){
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
    };

    function handleCheck(e){
        if(e.target.checked){           
            setEvent({                  
                ...event,
                genre: event.genre  
            })
        }
    };

    function handleBigEvent(e){
        if(e.target.checked){
            setEvent({
                ...event,
                isBigEvent: true
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

    //console.log(event)

    return (<div>
        <h2>Crear Evento</h2>
        <form onSubmit={handleSubmit}>
            <div> <input name="name" value={event.name}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Nombre" /> {errors.name && <label>{errors.name}</label>}</div>
            <div> <input name="artist" value={event.artist}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Artista" /> {errors.artist && <label>{errors.artist}</label>}</div>
            <div> <input name="address" value={event.address}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Direccion" /> {errors.address && <label>{errors.address}</label>}</div>
            
            <div>
                <label> <input type="checkbox" name="isBigEvent" value="isBigEvent" onChange={(e)=>handleBigEvent(e)}/>Gran Evento ?:</label>
            </div>

            <div>
                <label> <input type="checkbox" name="Rock" value="Rock" onChange={(e)=>handleCheck(e)} onBlur={handleBlur}/>Rock</label>
                <label> <input type="checkbox" name="Reggae" value="Reggae" onChange={(e)=>handleCheck(e)} onBlur={handleBlur}/>Reggae</label>
                <label> <input type="checkbox" name="Hip Hop" value="Hip Hop" onChange={(e)=>handleCheck(e)}/>Hip Hop</label>
                <label> <input type="checkbox" name="Rap" value="Rap" onChange={(e)=>handleCheck(e)}/>Rap</label>
                <label> <input type="checkbox" name="Clasica" value="Clasica" onChange={(e)=>handleCheck(e)}/>Clasica</label>
                <label> <input type="checkbox" name="Metal" value="Metal" onChange={(e)=>handleCheck(e)}/>Metal</label>
                <label> <input type="checkbox" name="Reggaeton" value="Reggaeton" onChange={(e)=>handleCheck(e)}/>Reggaeton</label>
                <label> <input type="checkbox" name="Pop" value="Pop" onChange={(e)=>handleCheck(e)}/>Pop</label>
                <label> <input type="checkbox" name="Electronica" value="Electronica" onChange={(e)=>handleCheck(e)}/>Electronica</label>
                <label> <input type="checkbox" name="Jazz" value="Jazz" onChange={(e)=>handleCheck(e)}/>Jazz</label>
                <label> <input type="checkbox" name="Trap" value="Trap" onChange={(e)=>handleCheck(e)}/>Trap</label>
                <label> <input type="checkbox" name= "Otros" value= "Otros" onChange={(e)=>handleCheck(e)}/>Otros</label>
                {errors.genre && <label>{errors.genre}</label>}
            </div>

            {/* <label>Tipo de dieta: </label>
          <div className={style.diets}>
          {tipos.map((tipo, i) => (
            <>
              <input
                key={i}
                className={style.diet}
                type="checkbox"
                name="diet"
                id={tipo.name}
                value={tipo.name}
                onChange={handleDiet}
                onBlur={handleBlur}
              />
              <label className={style.check} htmlFor={tipo.name}>{tipo.name}</label>
              <br />
            </>
          ))}
          {errors.diet && <p className={style.error}>{errors.diet}</p>}
          </div> */}
            
            <div> <input name="schedule" value={event.schedule}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Hora y Fecha" /> {errors.schedule && <label>{errors.schedule}</label>}</div>
            <div> <input name="map" value={event.map}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Ubicacion" /> {errors.map && <label>{errors.map}</label>}</div>
            <div> <input id="performerImage" name="file" onChange={(e) => uploadImage(e)} onBlur={handleBlur} type="file" placeholder="Imagen del artista" /> {errors.performerImage && <label>{errors.performerImage}</label>}</div>
            <div> <input id="placeImage" name="file" onChange={(e) => uploadImage(e)} onBlur={handleBlur} type="file" placeholder="Imagen del lugar" /> {errors.placeImage && <label>{errors.placeImage}</label>}</div>
            <div> <input name="description" value={event.description}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Descripcion" /> {errors.description && <label>{errors.description}</label>}</div>
            <button type="submit">Crear</button>
        </form>
    </div>)
};
