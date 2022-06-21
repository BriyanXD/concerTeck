const Ticket = require("../models/Ticket");

async function getTicketByID(req, res) {
  const { id } = req.body;
  try {
    const ticket = await Ticket.findByPk(id);
    res.json(ticket);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function postTicket(req, res) {
  const { name, price, id_event, id_user } = req.body;
  try {
    if (name && price && id_event && id_user) {
      const newTicket = await Ticket.create({
        name: name,
        price: price,
        idid_event: id_event,
        id_user: id_user,
      });
    }
    res.json(newTicket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getTicketByID,
  postTicket,
};
