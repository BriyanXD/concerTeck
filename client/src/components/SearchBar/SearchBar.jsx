import React from 'react'
import { useDispatch } from "react-redux";
import { searchEvent } from "../../redux/actions";

export default function SearchBar() {

  const dispatch = useDispatch()
  function hadleInputChange(e){
    dispatch(searchEvent(e.target.value))
}

  return (
    <div>
      <input type = 'text' placeholder = 'Buscar evento...' onChange= {(e)=> hadleInputChange(e)}/>
    </div>
  )
}
