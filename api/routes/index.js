const { Router } = require("express");
const { getUser, createUser } = require("../controllers/Usuario");
const {createProductor, getProductor}= require("../controllers/Productor");
const {deleteEvent, deleteProductor, deleteUsuario} = require("../controllers/rutas-Delete");
const routes = Router();

routes.get("/user", getUser);
routes.post("/user",createUser);
routes.get("/productor",getProductor);
routes.post("/productor",createProductor);
routes.delete("/events", deleteEvent);
routes.delete("/user", deleteUsuario);
routes.delete("/productor", deleteProductor);
module.exports = routes;
