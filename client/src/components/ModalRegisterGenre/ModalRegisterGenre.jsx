
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateGenre } from '../../redux/actions';
//import { Link, useNavigate } from "react-router-dom";

function validate(genre){
    const error = {};
    if(!genre.name){
        error.name = 'Campo obligatorio'
    }
    if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(genre.name)){
        error.name = "Ingrese un nombre con caracteres validos"
    }
    return error
}

export default function ModalRegisterGenre(){
    const dispatch = useDispatch();
    //const navigate = useNavigate();
    // const genres = useSelector((state)=> state.Genres);
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

    const handeSubmitGenre = (e) => {
        e.preventDefault();
        if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(genre.name)){
            return alert("Ingrese un nombre con caracteres validos")
        } else {
            dispatch(CreateGenre(genre));
            alert("Genero añadido a la lista");
            setGenre({
                name: ""
            })
            //navigate("/events")
        }
    };

    return (<div>
            <form onSubmit={handeSubmitGenre}>
                    <div> <input name="name" value={genre.name}  onChange={handleGenre} type="text" placeholder="Nombrar nuevo genero" />{error.name && (<label>{error.name}</label>)} </div>
                    <button type="submit">Añadir</button>
            </form>
        </div>)
}