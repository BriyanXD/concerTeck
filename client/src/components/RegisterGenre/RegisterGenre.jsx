
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateGenre, GetGenres } from '../../redux/actions';
//import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import style from './RegisterGenre.module.css'

function validate(genre){
    const error = {};
    if(!genre.name){
        error.name = 'Campo obligatorio'
    }
    if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(genre.name)){
        error.name = "No ingrese números por favor"
    }
    return error
}

export default function RegisterGenre(){
    const dispatch = useDispatch();
    //const navigate = useNavigate();
    // const genres = useSelector((state)=> state.Genres);
    const [activeGenre, setActiveGenre] = useState(true)
    const [error, setError] = useState({});
    const [genre, setGenre] = useState({
        name: ""
    })

    // useEffect(()=>{
    //     dispatch(GetGenres()); 
    // }, [dispatch])
    
    const handleGenre = (e) => {
        setGenre({
            [e.target.name]: e.target.value
        })
        setError(validate({
            [e.target.name]: e.target.value 
        }))   
    };

    const handeSubmitGenre = async(e) => {
        e.preventDefault();
        if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(genre.name)){
            return swal({
                title: 'Género no cargado',
                text: "Ingrese un nombre con caracteres válidos",
                icon: 'warning',
                dangerMode:true})
        } else {
            const genreCreated = await dispatch(CreateGenre(genre));
            //console.log(genreCreated)
            if(genreCreated.data[0].name){
                dispatch(GetGenres());
                swal({
                    text: "Género añadido a la lista",
                    icon: 'success',
                    })
                setGenre({
                    name: ""
                })
                setActiveGenre(!activeGenre)
            }
            //navigate("/events")
        }
    };

    return (<div>
            {activeGenre ? <div>
                <div>
                    <input 
                    name="name" 
                    value={genre.name}  
                    onChange={handleGenre} 
                    type="text"
                    className={error.name?.length > 0 ? style.error : style.inputGenre} 
                    placeholder={error.name?.length > 0 ? error.name : "Nombrar nuevo género" }
                    />
                </div>
                <button onClick={handeSubmitGenre} className={style.btnGenre}>Añadir género</button>
            </div>:null }
        </div>)
}
