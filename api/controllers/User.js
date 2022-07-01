// const { useInflection } = require("sequelize/types");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("../routes");
require("dotenv").config();
const { AUTH_ROUNDS, AUTH_SECRET, AUTH_EXPIRES } = process.env;
require("../db.js");

async function createUser(req, res) {
  const { name, username, email } = req.body;
  if (!username || !email || !name) {
    res.status(404).json({ error: "Faltan completar Campos obligatorios" });
  } else {
    try {
      //let passcrypt = bcrypt.hashSync(password, parseInt(AUTH_ROUNDS));
      User.findOrCreate({
        where: {
          name: name,
          username: username,
          email: email,
        },
      })
        .then((newuser) => {
          let token = jwt.sign({ user: newuser }, AUTH_SECRET, {
            expiresIn: AUTH_EXPIRES,
          });
          res.json(["Usuario", { user: newuser }, { token: token }]);
        })
        .catch((error) => res.status(500).json(error));
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  }
}
// "No se ha logrado crear el usuario"
async function getUser(req, res) {
  const DBusers = await User.findAll({ include: { model: Ticket } });
  /* const { username, password } = req.body; */
  try {
    /* if (username && password) {
      const userFound = DBusers.find((user) => {
        if (user.username === username && user.password === password)
          return user;
      });
      return res.send(userFound);
    } */
    return res.send(DBusers);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
}

async function putUser(req, res) {
  const { id, email, password, username } = req.body;
  try {
    if (!id && !email && !password && username) {
      return res
        .status(404)
        .json({ error: "Faltan completar Campos obligatorios" });
    } else {
      await User.update(
        {
          email: email,
          password: password,
          username: username,
        },
        {
          where: {
            id: id,
          },
        }
      );
      const user = await User.findOne({ where: { id: id } });
      return res.json({ message: `Usuario Actualizado con exitos`, user });
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
}
async function deleteUser(req, res) {
  try {
    const { id } = req.query; //req.params.id
    //console.log(id)
    const user = await User.findByPk(id);
    //console.log(user)
    if (!id) {
      return res.status(404).json({ error: "El ID solicitado no existe" });
    }
    if (!user) {
      return res.status(404).json({
        error: "No se a encontrado un Usuario que corresponda a lo solicitado",
      });
    }
    const destoyed = await user.destroy();
    if (destoyed) {
      return res
        .status(201)
        .json({ message: "El Usuario a sido eliminado con exito" });
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

async function UpgradeRank(req, res) {
  const { isAdmin, id } = req.body;
  try {
    if (typeof isAdmin !== "boolean") {
      return res
        .status(404)
        .json({ error: "isAdmin tiene que ser un booleado" });
    } else {
      await User.update(
        {
          isAdmin: isAdmin,
        },
        {
          where: {
            id: id,
          },
        }
      );
      const user = await User.findOne({ where: { id: id } });
      return res.json({ message: `Rango de usuario actualizado`, user });
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
}

async function postAdminUser(req, res) {
  try {
    const { username, password, email } = req.body;
    let passcrypt = bcrypt.hashSync(password, parseInt(AUTH_ROUNDS));
    const admin = User.findOrCreate({
      where: {
        username: username,
        password: passcrypt,
        email: email,
        isAdmin: true,
      },
    });
    res.send(admin);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

module.exports = {
  getUser,
  createUser,
  putUser,
  deleteUser,
  UpgradeRank,
  postAdminUser,
};
