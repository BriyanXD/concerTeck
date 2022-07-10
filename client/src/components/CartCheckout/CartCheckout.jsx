import React from 'react';
import { useSelector } from 'react-redux';
import style from './CartCheckout.module.css'

export default function CartCheckout () {
    const url = useSelector(state => state.sesion.url);
    return(
        <div className={style.container}>
                <h1 className={style.detalle}>Detalles de la compra</h1>
                <a href={`${url}`} target="_blank">
                <button className={style.button}>Siguiente</button>
                </a> 
        </div>
    )
}
