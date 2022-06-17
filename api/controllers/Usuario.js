const Usuario = require("../models/Usuario");
//prueba
require("../db.js");

function getUser(req, res) {
  try {
    return res.send("Ruta Usuario funcionando");
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
}

async function setUser(req, res) {
  const { name } = req.params;
  try {
    const user = await Usuario.create({
      name,
    });
    res.send(user);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
}

module.exports = {
  getUser,
  setUser,
};
