import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCartDB, ActualizacionStock, ticketVoucher } from '../../redux/actions';

export default function SuccessOrCancel () {
    const {id} = useParams();
    const [message, setMessage] = useState("")
    const { cartDB } = useSelector(state => state);
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
          setMessage("Order placed! You will receive an email confirmation.");
          dispatch(ActualizacionStock(cartDB));
          dispatch(ticketVoucher(id));
        }
    
        if (query.get("canceled")) {
          setMessage(
            "Order canceled -- continue to shop around and checkout when you're ready."
          );
        }
      }, [cartDB]);

    return(<div>
            {message? (<h1>{message}</h1>) : (<h1>{message}</h1>)}
    </div>)
}