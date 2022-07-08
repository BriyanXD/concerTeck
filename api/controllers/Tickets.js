const Ticket = require("../models/Ticket");
require("dotenv").config()
const { STRIPE_KEY } = process.env
const stripe = require('stripe')(STRIPE_KEY);
const Events = require("../models/Events");
const TicketStock = require("../models/TicketStock");
const User = require('../models/User');
let priceId = ""


async function getTicketByID(req, res) {
  const { id } = req.query;
  const { userId } = req.body;
  const allTickets = await Ticket.findAll();
  try {
    if (id) {
      const findTicketForID = await Ticket.findByPk(id, {
        include: [
          { model: User, as: "user" },
          { model: Events, as: "event" },
        ],
      });
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
  const { name, price, eventId, userId } = req.body;
  try {
    if (name && price && eventId && userId) {
      const saveEvent = await Events.findByPk(eventId);
      const saveUser = await User.findByPk(userId);
      const newTicket = await Ticket.create({
        name: name,
        price: price,
        eventId: eventId,
        userId: userId,
 
        eventName: saveEvent.id || "undefined",
        userName: saveUser.id || "undefined",
      });
    }
  res.json({newTicket});
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

async function postCreatEventAndPrice(req, res, next){

  try {
    const findEvent = await Events.findAll()
    for (let i = 4; i < 8 ; i++ ) {
      const product = await stripe.products.create({
        name: findEvent[i].name,
        description: findEvent[i].description ,
        images: [findEvent[i].performerImage]
      });
      if(product){
        console.log("🚀 ~ file: Tickets.js ~ line 108 ~ getRaro ~ product", product)
        const findStock = await Events.findByPk(findEvent[i].id,{include:[{ model: TicketStock, as: "stock" },],});
        if(findStock){
          const price1 = await stripe.prices.create({
            product: product.id,
            unit_amount: (findStock.stock.streamingPrice)*100,
            currency: 'ars',
          });
          //logica de relacion de tablas price/idprice/event
        
          const price2 = await stripe.prices.create({
            product: product.id,
            unit_amount: (findStock.stock.vipPrice)*100,
            currency: 'ars',
          });
        
          const price3 = await stripe.prices.create({
            product: product.id,
            unit_amount: (findStock.stock.generalLateralPrice)*100,
            currency: 'ars',
          });
      
      
          const price4 = await stripe.prices.create({
            product: product.id,
            unit_amount: (findStock.stock.generalPrice)*100,
            currency: 'ars',
          });
  
          const price5 = await stripe.prices.create({
            product: product.id,
            unit_amount: (findStock.stock.palcoPrice)*100,
            currency: 'ars',
          });
        }else{
          console.log("Evento No tiene stock relacionado")
        }
      }
    }

  } catch (error) {
    console.log(error)
  }
  // const findEvent = await Events.findAll()
  // findEvent.map(async event =>{
    // const product = await stripe.products.create({
    //   name: "Divididos",
    //   description: "adscsdsfd" ,
    //   images: []
    // });
  // })
  // console.log(product)


  // const session = await stripe.checkout.sessions.create({
  //   line_items: [{
  //     price: 'price_1LJ01eEZzNuiTFe6CHhOssWk',
  //     quantity: 1,
  //   },
  // {
  //   price: 'price_1LJ01bEZzNuiTFe6YGzxVr89',
  //   quantity: 3
  // }],
  //   mode: 'payment',
  //   success_url: 'https://localhost:3001/',
  //   cancel_url: 'https://localhost:3001/',
  // });
  // console.log(session)
 
  // res.send("se creo1")
  // console.log(price)
}

// async function getRaro2(data, product){

//   const findStock = await TicketStock.findByPk(data)
//     const price1 = await stripe.prices.create({
//       product: product.id,
//       unit_amount: findStock.stock.streamingPrice,
//       currency: 'ars',
//     });
//     //logica de relacion de tablas price/idprice/event
  
//     const price2 = await stripe.prices.create({
//       product: product.id,
//       unit_amount: findStock.stock.vipPrice,
//       currency: 'ars',
//     });
  
//     const price3 = await stripe.prices.create({
//       product: product.id,
//       unit_amount: findStock.stock.generalLateralPrice,
//       currency: 'ars',
//     });


//     const price4 = await stripe.prices.create({
//       product: product.id,
//       unit_amount: findStock.stock.generalPrice,
//       currency: 'ars',
//     });


  
//     const price5 = await stripe.prices.create({
//       product: product.id,
//       unit_amount: findStock.stock.palcoPrice,
//       currency: 'ars',
//     });

//     console.log(price1)
//     console.log(price2)
//     console.log(price3)

//     res.send("creado")
// }

async function postCheckout(req, res, next){
  const { line_items } = req.body

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: 'https://localhost:3001/',
    cancel_url: 'https://localhost:3001/',
  });
  console.log(session)
  res.send("se creo2")
}



module.exports = {
  getTicketByID,
  postTicket,
  deleteTicket,
  postCreatEventAndPrice,
  postCheckout,
  // getRaro2
};
