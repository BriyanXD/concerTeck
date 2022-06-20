const { Router } = require("express");
const { getUser, createUser } = require("../controllers/Usuario");
const {createProductor, getProductor}= require("../controllers/Productor")
const routes = Router();

routes.get("/user", getUser);
routes.post("/user",createUser);
routes.get("/productor",getProductor);
routes.post("/productor",createProductor);
module.exports = routes;
