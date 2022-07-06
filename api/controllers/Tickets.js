const Ticket = require("../models/Ticket");
const stripe = require('stripe')('pk_test_51LIBe4EZzNuiTFe6lP1cZbuwaoqo0TIvQ1ADkMjyUCIUaaksRilWpiGHOvvs365L3K7YWsl1sJg9i2kQRO8UwNMi008icNJL95')
const Events = require("../models/Events");


// mercadopago.configure({
//   access_token: "TEST_ACCESS_TOKEN",
// });

async function getTicketByID(req, res) {
  const { id, userId } = req.body;
  const allTickets = await Ticket.findAll();
  try {
    if (id) {
      const findTicketForID = await Ticket.findByPk(id);
      return res.json(findTicketForID);
    }
    if (userId) {
      const findTicketForIDEvent = allTickets.filter((ticket) => {
        if (ticket.userId === userId) return ticket;
      });
      return res.json(findTicketForIDEvent);
    }
    return res.json(allTickets);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}


async function postTicket(req, res) {
  try{

  const {name, price, eventId, userId, quantity } = req.body;
    if (name && price && eventId && userId && quantity) {
      // console.log(saveEvent)
      const saveEvent = await Events.findByPk(eventId)
      const newTicket = await Ticket.create({
        name: name,
        price: price,
        eventId: eventId,
        userId: userId,
        quantity: quantity,
      });
      
    //   if(newTicket){
    //     const array = []
    //     array.push(newTicket)
    
    //     let preference={
    //       items: array,
    //       external_reference: `${saveEvent}`,
    //       payment_methods: {
    //         excluded_payment_types: [
    //           {
    //             id: "atm"
    //           }
    //         ],
    //     },
    //     back_urls: {
    //       success: 'http://localhost:3001/home',
    //       failure: 'http://localhost:3001/*',
    //     },
    //   }
    //  const mercado = await mercadopago.preferences.create(preference)
    //   console.log("respondio")
    //   const response = mercado.body.id
    //     console.log("body", mercado.body)
    //     // console.log(newTicket, "ticket")
    // }
    }
  res.json({response});
  }
  catch(error){
    res.status(401).send({error: error.message})
  }
  } 

async function deleteTicket(req, res) {
  const { id } = req.body;
  try {
    const deletedTicket = await Ticket.destroy({
      where: {
        id: id,
      },
    });
    if (deletedTicket === 1) res.json({ message: "Ticket borrado con exito" });
    else res.json({ error: "Error al borrar el Ticket" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getRaro(req, res, next){

  const id_orden= 1

  //Cargamos el carrido de la bd
  const carrito = [
    {title: "Producto 1", quantity: 5, price: 10.52},
    {title: "Producto 2", quantity: 15, price: 100.52},
    {title: "Producto 3", quantity: 6, price: 200}
  ]
  
  const items_ml = carrito.map(i => ({
    title: i.title,
    unit_price: i.price,
    quantity: i.quantity,
  }))

  // Crea un objeto de preferencia
  let preference = {
    items: items_ml,
    external_reference : `${id_orden}`,
    payment_methods: {
      excluded_payment_types: [
        {
          id: "atm"
        }
      ],
      installments: 3  //Cantidad máximo de cuotas
    },
    back_urls: {
      success: 'http://localhost:3001/mercadopago/pagos',
      failure: 'http://localhost:3001/mercadopago/pagos',
      pending: 'http://localhost:3001/mercadopago/pagos',
    },
  };

  mercadopago.preferences.create(preference)

  .then(function(response){
    console.info('respondio')
  //Este valor reemplazará el string"<%= global.id %>" en tu HTML
    global.id = response.body.id;
    console.log(response.body)
    res.json({ id: global.id });
  })
  .catch(function(error){
    console.log(error);
  })
}



module.exports = {
  getTicketByID,
  postTicket,
  deleteTicket,
  getRaro
};
