const { Router } = require("express");
const { getUser, createUser,putUser } = require("../controllers/Usuario");
const {createProductor, getProductor, putProductor}= require("../controllers/Productor");
const {deleteEvent, deleteProductor, deleteUsuario} = require("../controllers/rutas-Delete");
const routes = Router();


routes.get("/user", getUser);
routes.post("/user",createUser);
routes.put("/user", putUser);

routes.get("/productor",getProductor);
routes.post("/productor",createProductor);
routes.put("/productor", putProductor);


routes.delete("/events", deleteEvent);
routes.delete("/user", deleteUsuario);
routes.delete("/productor", deleteProductor);

module.exports = routes;
