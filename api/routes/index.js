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

module.exports = routes;
