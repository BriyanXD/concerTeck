const { Router } = require("express");
const { getUser, createUser } = require("../controllers/Usuario");
const {createProductor, getProductor}= require("../controllers/Productor")
const routes = Router();

routes.post("/user",createUser);
routes.get("/productor",getProductor);
routes.post("/productor",createProductor);
routers.put("/user")



module.exports = routes;
