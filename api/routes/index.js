const { Router } = require("express");
<<<<<<< HEAD

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
const {
  loadEventsAndGetEvents,
=======
const { getUser, createUser, putUser,deleteUser } = require("../controllers/User");
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
>>>>>>> fb3183930ba42fa71bca478f2d831a99c4c59166
  postEvents,
  putEvents,
  deleteEvent,
} = require("../controllers/Events");

<<<<<<< HEAD
const routes = Router();

routes.get("/user", getUser);
routes.post("/user", createUser);
routes.get("/user", getUser);
=======
routes.post("/user",createUser);
routes.get("/user",getUser);
>>>>>>> fb3183930ba42fa71bca478f2d831a99c4c59166
routes.put("/user", putUser);
routes.delete("/user", deleteUser);

routes.get("/producer", getProducer);
routes.post("/producer", createProducer);
routes.put("/producer", putProducer);
routes.delete("/producer", deleteProducer);

<<<<<<< HEAD
routes.delete("/events", deleteEvent);
routes.get("/events", loadEventsAndGetEvents);
=======
routes.get("/events", loadEventsAndGetEvents);
// routes.get("/events:name", getEvents);
>>>>>>> fb3183930ba42fa71bca478f2d831a99c4c59166
routes.post("/events", postEvents);
routes.put("/events", putEvents);
routes.delete("/events", deleteEvent);

module.exports = routes;

