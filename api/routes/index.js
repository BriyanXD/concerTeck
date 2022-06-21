const { Router } = require("express");
const { getUser, createUser, putUser } = require("../controllers/Usuario");
const {
  createProductor,
  getProductor,
  putProductor,
} = require("../controllers/Productor");
const {
  deleteEvent,
  deleteProductor,
  deleteUsuario,
} = require("../controllers/rutas-Delete");
const routes = Router();

const {
  loadEventsAndGetAllEvents,
  getEvents,
  postEvents,
  putEvents,
} = require("../controllers/Events");

routes.post("/user",createUser);
routes.get("/user",getUser);
routes.put("/user", putUser);
routes.delete("/user", deleteUsuario);

routes.get("/productor", getProductor);
routes.post("/productor", createProductor);
routes.put("/productor", putProductor);
routes.delete("/productor", deleteProductor);

routes.delete("/events", deleteEvent);
routes.get("/events:name", loadEventsAndGetAllEvents);
routes.get("/events:name", getEvents);
routes.post("/events", postEvents);
routes.put("/events", putEvents);

module.exports = routes;

