import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { OrderByDate } from '../../../redux/actions'

export default function Date(setCurrenPag,setCurrentPage) {
  const dispatch = useDispatch()
  const [date, setDate] = useState("")

  const handleOrderByReleased = (e) =>  {
    e.preventDefault()
    dispatch(OrderByDate(e.target.value))
    setDate(`${e.target.value}`)
    setCurrenPag(1)
    setCurrentPage(1)
  }
  return (
       <div>
            <label htmlFor="">Ordenado Por Fecha</label><br/>
            <select name="" id="" onChange={e =>{ handleOrderByReleased(e)}}>
                <option value="asc">Orden Ascendente</option>
                <option value='des'>Orden Descendente</option>
            </select> 
        </div> 
      
    // <div>Date</div>
  )
}
