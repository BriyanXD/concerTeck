import React, { useEffect } from "react";
import { useCart } from "react-use-cart";
import { useSelector, useDispatch } from "react-redux";
import { getEvents } from "../../redux/actions";
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
  
  //*Trae todos los eventos
  const { AllEvents } = useSelector((state) => state);
  let events = [];

  //*Llama a todos los eventos
  useEffect(() => {
    dispatch(getEvents());
  }, []);

  //*Items de localStorage recorre todos los eventos
  items.forEach((el) => {
    AllEvents.forEach((e) => {
      if (e.id === el.id) return events.push(e);
    });
  });

  //*isEmpty carrito vacio localstorage
  if (isEmpty)
    return <p className={Style.carritoVacio}>Sin eventos en el carrito</p>;
  return (
    <div className={Style.containerGeneral}>
      <h3>Carrito ({totalUniqueItems})</h3>
      {/* {events?.map((el) => {
        function handleChange(e) {
          updateItem(el.id, { variant: e.target.value });
          updateItem(el.id, { price: el.stock[e.target.value] });
        }

        const date = el.schedule.split("T")[0];
        const time =
          el.schedule.split("T")[1].split(":")[0] +
          ":" +
          el.schedule.split("T")[1].split(":")[1];
        return (
          <div className={Style.containerDetail}>
            <div>{el.name}</div>
            <div className={Style.text}>{date}</div>
            <div className={Style.text}>{time}</div>
            <div className={Style.containerImage}>
             <img className={Style.image} src={el.performerImage} alt={el.name} />
            </div>
          </div>
        );
      })} */}
      <ul>
    
        {items.map((item) => (
          
          <li key={item.id}>
            {console.log(item)}
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
                  ? updateItemQuantity(item.id, item.quantity - 1)
                  : null
              }
            >
              -
            </button>
            <button
              className={Style.btn}
              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
            <button className={Style.btn} onClick={() => removeItem(item.id)}>
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
