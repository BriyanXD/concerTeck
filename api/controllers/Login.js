/* const User = require("../models/User");
const Producer = require("../models/Producer");

async function getForLogin(req, res) {
  const { username, password } = req.body;
  Promise.all([
    User.findAll({ attributes: ["username", "password"] }),
    Producer.findAll({ attributes: ["username", "password"] }),
  ])
    .then((response) => {
      const allUser = [...response[0], ...response[1]];
      let matchUser = allUser.find((user) => {
        if (user.username === username && user.password === password)
          return user;
      });
      if (matchUser) return res.json(matchUser);
      else
        return res
          .status(404)
          .json({ error: "Username o Password incorrecto" });
    })
    .catch((error) => {
      res.status(404).json({ error: error.message });
    });
}

module.exports = {
  getForLogin,
}; */

const Producer = require("../models/Producer");
const User = require("../models/User");

async function LoginUser(req, res) {
  const { username, password } = req.body;
  try {
    if (username && password) {
      let user = await User.findOne({ where: { username, password } });
      let producer = await Producer.findOne({ where: { username, password } });
      if (user !== null) res.json(user);
      if (producer !== null) {
        res.json(producer);
      } else {
        res.send("Los datos ingresados no coinciden con un usuario registrado");
      }
    } else {
      res.send("Complete los datos requeridos");
    }
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { LoginUser };
