import React, { useEffect } from "react";
import { useCart } from "react-use-cart";
import { useSelector, useDispatch } from "react-redux";
import { getEvents } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import Style from "./Cart.module.css"
import NavBarProfile from '../ProfileUser/NavBarProfile/NavBarProfile'

export default function Cart() {
  const dispatch = useDispatch();
  const { user, loginWithRedirect } = useAuth0();

  const {
    isEmpty,
    totalUniqueItems,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    updateItem,
  } = useCart();
  const { AllEvents } = useSelector((state) => state);
  let events = [];

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  items.forEach((el) => {
    AllEvents.forEach((e) => {
      if (e.id === el.id) return events.push(e);
    });
  });

  if (isEmpty) return(
    <div className={Style.containerNavVacio}>
      <div>
    <NavBarProfile/>
</div>
    <div className={Style.carritoVacio}>
      <p>El carrito esta vacio</p>
    </div>
    </div>
  )
  return (
    <div className={Style.containerGeneral}>
      <div className={Style.containerNavbar}>
                <NavBarProfile/>
      </div>
    <div className={Style.containerInfo}>
      {events?.map((el) => {
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
            <select className={Style.select} onChange={handleChange} id={el.id} name="variant">
              <option value="1">Elegir tipo de entrada...</option>
              <option value="streamingPrice">
                Streaming: $ {el.stock.streamingPrice}
              </option>
              <option value="generalPrice">
                General: $ {el.stock.generalPrice}
              </option>
              <option value="generalLateralPrice">
                General lateral: $ {el.stock.generalLateralPrice}
              </option>
              <option value="vipPrice">Vip: $ {el.stock.vipPrice}</option>
              <option value="palcoPrice">Palco: $ {el.stock.palcoPrice}</option>
            </select>
          </div>
        );
      })}

      <ul className={Style.containerCart}>
        {items.map((item) => (
          <li key={item.id} className={Style.informacion}>
            {console.log(item)}
            {item.quantity} x {item.name} &mdash;
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
            {item.price !== 0 ? <p>Precio: {item.price}</p>: null}
            <p>Total: {item.itemTotal === 0 ? null : item.itemTotal}</p>
            <button className={Style.btn}
              onClick={() =>
                item.quantity > 1
                  ? updateItemQuantity(item.id, item.quantity - 1)
                  : null
              }
            >
              -
            </button>
            <button className={Style.btn}
              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
            <button className={Style.btn} onClick={() => removeItem(item.id)}>&times;</button>
            <button className={Style.btncomprar}>Comprar entradas</button>
          </li>
        ))}
        <span className={Style.textTotal}>Total final: {cartTotal}</span>
        <button className={Style.btncomprarpasarela}
          onClick={() =>
            !user ? loginWithRedirect() : alert("Pasarela de pagos")
          }
        >
          Comprar Todos
        </button>
      </ul>
      </div>
    </div>
  );
}
