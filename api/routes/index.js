const { Router } = require("express");
const { getUser, setUser } = require("../controllers/Usuario");
const routes = Router();

routes.get("/user", getUser);
routes.post("/user/:name", setUser);

module.exports = routes;
