const { Router } = require("express");

const {
  getUser,
  createUser,
  putUser,
  deleteUser,
} = require("../controllers/User");
const { getAllGenres, postOneGenre } = require("../controllers/Genres");
const {
  createProducer,
  getProducer,
  putProducer,
  deleteProducer,
} = require("../controllers/Producer");
const routes = Router();

const {
  loadEventsAndGetEvents,
  // getEvents,
  postEvents,
  putEvents,
  deleteEvent,
} = require("../controllers/Events");

const {
  getTicketByID,
  postTicket,
  deleteTicket,
} = require("../controllers/Tickets");

const { getVenues,postVenues } = require("../controllers/Venue");
const { getTicketStock } = require("../controllers/TicketStock");

const { LoginUser } = require("../controllers/Login");
const { 
  ValidationUser,
  ValidationUsername,
  ValidationEmail,
} = require("../controllers/Validations");

routes.post("/user", createUser);
routes.get("/user", getUser);
routes.put("/user", putUser);
routes.delete("/user", deleteUser);

routes.get("/producer", getProducer);
routes.post("/producer", createProducer);
routes.put("/producer", putProducer);
routes.delete("/producer", deleteProducer);

routes.get("/events", loadEventsAndGetEvents);
routes.post("/events", postEvents);
routes.put("/events", putEvents);
routes.delete("/events", deleteEvent);

routes.get("/ticket", getTicketByID);
routes.post("/ticket", postTicket);
routes.delete("/ticket", deleteTicket);

routes.get("/genres", getAllGenres);
routes.post("/genres", postOneGenre);

routes.get("/venues", getVenues);
routes.post("/venues",postVenues)

routes.get("/ticketstock", getTicketStock);

routes.post("/login", LoginUser);

routes.post("/validation/login", ValidationUser);
routes.post("/validation/username",   ValidationUsername);
routes.post("/validation/email", ValidationEmail);

module.exports = routes;
