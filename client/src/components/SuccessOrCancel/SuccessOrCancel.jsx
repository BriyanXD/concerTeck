import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
<<<<<<< HEAD
import { useParams } from 'react-router-dom';
import { getCartDB, ActualizacionStock, ticketVoucher } from '../../redux/actions';
=======
import { getCartDB, ActualizacionStock, postTicket } from '../../redux/actions';
>>>>>>> 3493c0d604a519305ac8a0b22dd9ea1675b9fca0

export default function SuccessOrCancel () {
    const {id} = useParams();
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
<<<<<<< HEAD
          dispatch(ActualizacionStock(cartDB));
          dispatch(ticketVoucher(id));
=======
          // async function prueba () {
          //   await cartDB.map((e) =>  dispatch(postTicket(e)));
          // } 
          const prueba = async() => {
            for(const cart of cartDB)
            await dispatch(postTicket(cart))
          }
          prueba();
          setFlag(!flag)
>>>>>>> 3493c0d604a519305ac8a0b22dd9ea1675b9fca0
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