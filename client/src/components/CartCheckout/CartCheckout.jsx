import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import style from './CartCheckout.module.css'

export default function CartCheckout () {
    const url = useSelector(state => state.sesion.url);
    const cartDetail = useSelector(state => state.cartDB)
    console.log("CART DB", cartDetail)

    const totalTodos = cartDetail.map(item => item.itemTotal).reduce((prev, curr) => prev + curr, 0);

    return(
        <div className={style.container}>
            <h1 className={style.detalle}>Detalles de la compra</h1>
            <div>{cartDetail.map((cartD)=>{
                return(<div>
                        {/* <img src={cartD.performerImage}/> */}
                        <div>{cartD.nombre}</div>
                        <div> {cartD.schedule.split("T")[0]} {'  '}
                        {cartD.schedule.split("T")[1].split(":")[0] + ":" + cartD.schedule.split("T")[1].split(":")[1]} h</div>
                        <div> <label>tipo de entrada: {cartD.name} </label> <label> precio:${cartD.price}</label> </div>
                        <div></div>
                        <div> <label>cantidad: {cartD.quantity}</label> <label>precio total: ${cartD.itemTotal}</label> </div>
                        <div> </div>
                    </div>)
                })
            }</div>

            <div>Total final: ${totalTodos} ARS.</div>

            <a href={`${url}`}>
            <button className={style.button}>Siguiente</button>
            </a> 
            <div><Link to='/'><button className={style.button}>Volver a inicio</button></Link></div>
        </div>
    )
}
