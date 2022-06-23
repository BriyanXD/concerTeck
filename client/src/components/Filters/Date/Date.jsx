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
            <select name="" id="" onChange={e =>{ handleOrderByReleased(e)}}>
                <option>Orden Por Fecha</option>
                <option value="asc">Eventos más Proximos</option>
                <option value='des'>Ultimos Eventos</option>
            </select> 
        </div> 
      
    // <div>Date</div>
  )
}
