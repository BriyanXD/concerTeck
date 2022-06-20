const { Router } = require("express");
const { getUser, setUser } = require("../controllers/Usuario");
const routes = Router();

routes.get("/user", getUser);
routes.post("/user/:name", setUser);
routers.put("/user")

module.exports = routes;
