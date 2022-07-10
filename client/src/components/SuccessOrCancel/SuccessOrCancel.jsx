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
          setMessage("Order placed! You will receive an email confirmation.");
          // async function prueba () {
          //   await cartDB.map((e) =>  dispatch(postTicket(e)));
          // } 
          const prueba = async() => {
            for(const cart of cartDB)
            await dispatch(postTicket(cart))
          }
          prueba();
          setFlag(!flag)
        }
    
        if (query.get("canceled")) {
          setMessage(
            "Order canceled -- continue to shop around and checkout when you're ready."
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