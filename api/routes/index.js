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

const { loadEventsAndGetAllEvents } = require("../controllers/Events");

routes.get("/user", getUser);
routes.post("/user", createUser);
routes.get("/user", getUser);
routes.put("/user", putUser);
routes.delete("/user", deleteUsuario);

routes.get("/productor", getProductor);
routes.post("/productor", createProductor);
routes.put("/productor", putProductor);
routes.delete("/productor", deleteProductor);

routes.delete("/events", deleteEvent);
routes.get("/events", loadEventsAndGetAllEvents);

module.exports = routes;
