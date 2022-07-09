import React from 'react';
import { useSelector } from 'react-redux';

export default function CartCheckout () {
    const url = useSelector(state => state.sesion.url);
    return(<div>
            <h1>Detalles de la compra</h1>
            <a href={`${url}`} target="_blank">
            <button>Siguiente</button>
            </a> 
        </div>)
}
