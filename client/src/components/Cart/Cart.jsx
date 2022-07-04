import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { useSelector, useDispatch } from "react-redux";
import { getEvents } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { getCartDB, deleteCart, putCartDB } from "../../redux/actions";

export default function Cart() {
  const dispatch = useDispatch();
  const { user, loginWithPopup } = useAuth0();
  // const [card, setCard] = useState({
  //   quantity: 0,
  //   variant: "",
  //   itemTotal:0,
  //   price:0,
  // })
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
  const { cartDB } = useSelector(state => state);
  const userData = useSelector(state => state.User);
 

  let events = [];
  let eventsUser = [];
 
  useEffect(() => {
    dispatch(getEvents());
    if(userData[0]){
      dispatch(getCartDB(userData[0].id))
    }
  }, [dispatch]);

  userData[0]? cartDB.forEach((el) => {
    AllEvents.forEach((e) => {
      if (e.id === el.idEvent) return eventsUser.push(e);
    });
  }):items.forEach((el) => {
    AllEvents.forEach((e) => {
      if (e.id === el.id) return events.push(e);
    });
  });
  // function handleCartDB(e) {
  //   let idTemp = eventsUser?.map((el) => { cartDB.find((cart)=> cart.idEvent === el.id)})
  //   console.log("ID TEMP", idTemp)
  //   dispatch(putCartDB({
  //     id: idTemp.id,
  //     price: el.stock[e.target.value],
  //     //quantity: 1,
  //     //itemTotal: price * quantity,
  //     [e.target.name]: e.target.value
  //   }))
  // }
  //  if (isEmpty && cartDB) return <p>El carrito esta vacio</p>;
  console.log("evetos", events)
  return (
    <>
      {!userData[0]?events?.map((el) => {
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
          <div>
            <div>{el.name}</div>
            <div>{date}</div>
            <div>{time}</div>
            <select onChange={handleChange} id={el.id} name="variant">
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
      }):eventsUser?.map((el) => {
        let idTemp = cartDB.find((cart)=> cart.idEvent === el.id)
        console.log("ID TEMPORAL", idTemp)
        function handleCartDB(e) {
          dispatch(putCartDB({
            id: idTemp.id,
            price: el.stock[e.target.value],
            //quantity: 1,
            //itemTotal: price * quantity,
            [e.target.name]: e.target.value
          }))
        }

        const date = el.schedule.split("T")[0];
        const time =
          el.schedule.split("T")[1].split(":")[0] +
          ":" +
          el.schedule.split("T")[1].split(":")[1];
        return (
          <div>
            <div>{el.name}</div>
            <div>{date}</div>
            <div>{time}</div>
            <select onChange={handleCartDB} id={el.id} name="variant">
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
      <h1>Cart ({cartDB.length > 0 ? cartDB.length : totalUniqueItems})</h1>

      <ul>
        {!userData[0]?items.map((item) => (
          <li key={item.id}>
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
            <button
              onClick={() =>
                item.quantity > 1
                  ? updateItemQuantity(item.id, item.quantity - 1)
                  : null
              }
            >
              -
            </button>
            <button
              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
            <button onClick={() => removeItem(item.id)}>&times;</button>
            <button>Comprar entrada/s</button>
          </li>
          
        )): cartDB?.map((item) => (
          <li key={item.id}>
            {item.quantity} x {item.nombre} &mdash;
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
            <button
              onClick={() =>
                item.quantity > 1
                  ? dispatch(putCartDB({id:item.id, quantity:item.quantity - 1}))
                  : null
              }
            >
              -
            </button>
            <button
              onClick={() =>dispatch(putCartDB({id:item.id, quantity:item.quantity + 1}))}
            >
              +
            </button>
            <button onClick={() => dispatch(deleteCart(item.id))}>&times;</button>
            <button>Comprar entrada/s</button>
          </li>))}
        Total final: {cartTotal}
        <button
          onClick={() =>
            !user ? loginWithPopup() : alert("Pasarela de pagos")
          }
        >
          Comprar Todos
        </button>
      </ul>
    </>
  );
}
