import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Cart() {
  const { Basket, AllEvents } = useSelector((state) => state);
  const [Tickets, setTickets] = useState([]);
  const [render, setrender] = useState([]);
  const events = [];
  let tickets = [];

  Basket.forEach((el) => {
    AllEvents.forEach((e) => {
      if (e.id === el) events.push(e);
    });
  });

  tickets = Tickets.filter((e) => e.variant && e.items);

  for (let i = 0; i <= tickets.length; i++) {
    for (let j = 1 + i; j <= tickets.length - 1; j++) {
      if (
        tickets[i].id === tickets[j].id &&
        tickets[i].variant === tickets[j].variant
      ) {
        tickets[i].items = (
          parseInt(tickets[i].items) + parseInt(tickets[j].items)
        ).toString();
        tickets[j].items = "";
      }
    }
  }

  function handleDelete(ev) {
    tickets = [tickets.filter((e) => ev.id !== e.id)];
    console.log("ID ticket filtrado", ev.id);
    console.log("tickets", tickets);
    setrender((tickets) => tickets);
  }

  return (
    <div>
      {events?.map((el) => {
        let ticket = {};
        function handleChange(e) {
          ticket = {
            ...ticket,
            id: el.id,
            name: el.name,

            [e.target.name]: e.target.value,
          };
        }

        function handleSubmit(e) {
          e.preventDefault();

          setTickets([
            ...Tickets,
            {
              ...ticket,
            },
          ]);
          document.getElementById(el.id).value = "1";
          document.getElementById(`items+${el.id}`).value = "";
          setrender((tickets) => tickets);
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
              <option value="streaming">
                Streaming: $ {el.stock.streamingPrice}
              </option>
              <option value="general">
                General: $ {el.stock.generalPrice}
              </option>
              <option value="general lateral">
                General lateral: $ {el.stock.generalLateralPrice}
              </option>
              <option value="vip">Vip: $ {el.stock.vipPrice}</option>
              <option value="palco">Palco: $ {el.stock.palcoPrice}</option>
            </select>
            <input
              onChange={handleChange}
              type="number"
              id={`items+${el.id}`}
              name="items"
              min="1"
              max="10"
            ></input>
            <button id="button" type="button" onClick={handleSubmit}>
              Agregar
            </button>
          </div>
        );
      })}

      <div>
        {render?.map((e) => {
          return (
            <div>
              <div>Evento: {e.name}</div>
              <div>Tipo de entrada: {e.variant}</div>
              <div>Cantidad:{e.items}</div>
              <button onClick={() => handleDelete(e)}>x</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
