const Ticket = require("../models/Ticket");
require("dotenv").config()
const { STRIPE_KEY } = process.env
const stripe = require('stripe')(STRIPE_KEY);
const Events = require("../models/Events");
const TicketStock = require("../models/TicketStock");
let priceId = "";


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


  // const findEvent = await Events.findAll()
  // findEvent.map(async event =>{
    const product = await stripe.products.create({
      name: "Divididos",
      description: "adscsdsfd" ,
      images: []
    });
  // })
  console.log(product)



  // const session = await stripe.checkout.sessions.create({
  //   line_items: [{
  //     price:'price_1LIvH3EZzNuiTFe67vUd1guS',
  //     quantity: 1,
  //   },
  // {
  //   price: 'price_1LIvKfEZzNuiTFe6tu11nMDt',
  //   quantity: 3
  // }],
  //   mode: 'payment',
  //   success_url: 'https://localhost:3001/',
  //   cancel_url: 'https://localhost:3001/',
  // });
  // console.log(session)
  // res.send("se creo2")
  res.send("se creo1")
  // console.log(price)
}


async function getRaro2(req, res, next){
  const {name, description, images, eventId} = req.body

  const findStock = await Events.findByPk("e63dbb71-f299-4218-a076-b670c3d8a686")
    const price1 = await stripe.prices.create({
      product: 'prod_M0xp1GFYyl2RPd',
      unit_amount: findStock.stock.streamingPrice,
      currency: 'ars',
    });
    
  
    const price2 = await stripe.prices.create({
      product: 'prod_M0xp1GFYyl2RPd',
      unit_amount: findStock.stock.vipPrice,
      currency: 'ars',
    });
  
  
    const price3 = await stripe.prices.create({
      product: 'prod_M0xp1GFYyl2RPd',
      unit_amount: findStock.stock.generalLateralPrice,
      currency: 'ars',
    });


    const price4 = await stripe.prices.create({
      product: 'prod_M0xp1GFYyl2RPd',
      unit_amount: findStock.stock.generalPrice,
      currency: 'ars',
    });


  
    const price5 = await stripe.prices.create({
      product: 'prod_M0xp1GFYyl2RPd',
      unit_amount: findStock.stock.palcoPrice,
      currency: 'ars',
    });

    console.log(price1)
    console.log(price2)
    console.log(price3)
    
    res.send("creado")
    

}

async function postCheck(req,res,next){
  // priceId = price.id

}



module.exports = {
  getTicketByID,
  postTicket,
  deleteTicket,
  getRaro,
  postCheck,
  getRaro2
};
