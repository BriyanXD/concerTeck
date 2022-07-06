import React, { useEffect } from "react";
import { useCart } from "react-use-cart";
import { useSelector, useDispatch } from "react-redux";
import { getEvents, getCartDB, deleteCart, putCartDB } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Style from "./Cart.module.css";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //*Auth0 datos de usuario logeado y popUp de logeo
  const { user, loginWithPopup } = useAuth0();

  //*datos de carrito
  const {
    isEmpty,
    totalUniqueItems,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    updateItem,
  } = useCart();
  
  let temporal = localStorage.getItem("user");

  let userStorage 
  if(temporal !== "nada"){
    userStorage = JSON.parse(temporal)
  }else{
    userStorage = ""
  }
  const {cartDB} = useSelector(state =>state);

  //*Llama a todos los eventos
  useEffect(() => {
    dispatch(getEvents());
    if(userStorage !== ""){
      dispatch(getCartDB(userStorage.id))
    }
  }, []);
  let ambos= [];
  if(userStorage !== ""){
    ambos = [...cartDB]
   }else{
     ambos= [...items]
   }

  if (userStorage !== "" && cartDB.lenght === 0){
    return <p className={Style.carritoVacio}>Sin eventos en el carrito DB</p>;
  }else if(isEmpty){
    return <p className={Style.carritoVacio}>Sin eventos en el carrito LocalStorage</p>;
  }
 const handleDelete = (id) => {
  if(userStorage !== ""){
    dispatch(deleteCart(id))
  }else{
    removeItem(id)
  }
 }
 const handleUpdate = (item, operador) => {
  if(userStorage !== ""){
    if(operador === "-"){
      console.log(item.quantity--, "desde if -")
      dispatch(putCartDB({id:item.id, quantity: --item.quantity}))
    }else{
      console.log(item.quantity++, "desde if +")
      dispatch(putCartDB({id:item.id, quantity: ++item.quantity}))
    }
  }else{
    if(operador === "-"){
      updateItemQuantity(item.id, item.quantity - 1)
    }else{
      updateItemQuantity(item.id, item.quantity + 1)
    }
  }
}
  return (
    <div className={Style.containerGeneral}>
      <h3>Carrito ({totalUniqueItems})</h3>
      <ul>
        {ambos.map((item) => (
          
          <li key={item.id}>
            {item.quantity} x {item.nombre} &mdash;
            <img src={item.performerImage} alt={item.nombre} />
            <p>
              {" "}
              <div>
                Tipo de entrada:{" "}
                {item.variant === "streamingPrice"
                  ? "Streaming"
                  : item.variant === "generalPrice"
                  ? "General"
                  : item.variant === "generalLateralPrice"
                  ? "General lateral"
                  : item.variant === "vipPrice"
                  ? "Vip"
                  : item.variant === "palcoPrice"
                  ? "Palco"
                  : null}
              </div>
            </p>
            <p> {item.schedule.split("T")[0]}</p>
            <p>{item.schedule.split("T")[1].split(":")[0] + ":" + item.schedule.split("T")[1].split(":")[1]}</p>
            <p>Precio: {item.price}</p>
            <p>Total: {item.itemTotal === 0 ? null : item.itemTotal}</p>
            <button
              className={Style.btn}
              onClick={() =>
                item.quantity > 1
                  ? handleUpdate(item, "-")
                  : null
              }
            >
              -
            </button>
            <button
              className={Style.btn}
              onClick={() => handleUpdate(item, "+")}
            >
              +
            </button>
            <button className={Style.btn} onClick={() => handleDelete(item.id)}>
              &times;
            </button>
          </li>
        ))}
        Total final: {cartTotal}
        <button
          className={Style.btncomprar}
          onClick={() =>
            !user ? loginWithPopup() : alert("Pasarela de pagos")
          }
        >
          Comprar Todos
        </button>
      </ul>
      <button className={Style.btncomprar} onClick={() => navigate("/")}>
        Volver
      </button>
    </div>
  );
}
