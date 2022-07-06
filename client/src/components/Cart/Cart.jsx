import React, { useEffect } from "react";
import { useCart } from "react-use-cart";
import { useSelector, useDispatch } from "react-redux";
import { getEvents } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Style from "./Cart.module.css";
import { style } from "@mui/system";

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
      <div>Carrito ({totalUniqueItems})</div>
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
          
          <li key={item.id} className={Style.items}>
            <div>
            {item.quantity} x {item.nombre} 
            <img src={item.performerImage} alt={item.nombre} className={Style.image} />
            </div>
           <div className={Style.tipo}>
             
           
              <div >
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
            
            <div> {item.schedule.split("T")[0]} {'  '}
            {item.schedule.split("T")[1].split(":")[0] + ":" + item.schedule.split("T")[1].split(":")[1]} h</div>
            <div>Precio: ${item.price} Total: ${item.itemTotal === 0 ? null : item.itemTotal}</div>
            <div>

           
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
            </div>
            </div>
          </li>
        ))}
      </ul>
        <div>
        Total final: ${cartTotal} ARS.
          </div>
        <button
          className={Style.btncomprar}
          onClick={() =>
            !user ? loginWithPopup() : alert("Pasarela de pagos")
          }
        >
          Comprar Todos
        </button>
      {/* <button className={Style.btncomprar} onClick={() => navigate("/")}>
        Volver
      </button> */}
    </div>
  );
}
