import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartDB, ActualizacionStock, postTicket } from '../../redux/actions';

export default function SuccessOrCancel () {

    const [message, setMessage] = useState("")
    const { cartDB } = useSelector(state => state);
    const [flag, setFlag] = useState(false)
    const dispatch = useDispatch();
    const user = localStorage.getItem("user");
    const tempUser = JSON.parse(user)

    useEffect(() => {
        if(tempUser){
            dispatch(getCartDB(tempUser.id))
        }
    },[])

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
    
        if (query.get("success")) {
          setMessage("Tu compra se completó con éxtio. Gracias por confiar en nosotros! ");
          dispatch(ActualizacionStock(cartDB))
        }
    
        if (query.get("canceled")) {
          setMessage(
            "Compra cancelada. Por favor revisá tu pedido y volvé a intentar!"
          );
        }
      }, [cartDB]);

      useEffect(() => {
        dispatch(ActualizacionStock(cartDB))
      },[flag])

    return(<div>
            {message? (<h1>{message}</h1>) : (<h1>{message}</h1>)}
    </div>)
}