// const { useInflection } = require("sequelize/types");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
//prueba
require("../db.js");

async function createUser(req, res) {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res.status(404).json({ error: "Faltan completar Campos obligatorios" });
  } else {
    try {
      let create = await User.findOrCreate({
        where: {
          username: username,
          password: password,
          email: email,
        },
      });
      res.json(create);
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  }
}
// "No se ha logrado crear el usuario"
async function getUser(req, res) {
  const DBusers = await User.findAll({ include: { model: Ticket } });
  const { username, password } = req.body;
  try {
    if (username && password) {
      const userFound = DBusers.find((user) => {
        if (user.username === username && user.password === password)
          return user;
      });
      return res.send(userFound);
    }
    return res.send(DBusers);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
}

async function putUser(req, res) {
  const { id, email, password } = req.body;
  try {
    if (!id && !email && !password) {
      return res
        .status(404)
        .json({ error: "Faltan completar Campos obligatorios" });
    } else {
      const upload = await User.findByPk(id);
      if (upload) {
        const user = await User.update(
          {
            email: email,
            password: password,
          },
          {
            where: {
              id: id,
            },
          }
        );
<<<<<<< HEAD
        return res.send("Usuario Actualizado con exitos");
=======

        return res.json({ error: "Usuario Actualizado con exitos" });
>>>>>>> d28e30f384576992b9246f90ce59105c0b3fb166
      }
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
}
async function deleteUser(req, res) {
  try {
    const { id } = req.body; //req.params.id
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
        .json({ error: "El Usuario a sido eliminado con exito" });
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

<<<<<<< HEAD
=======
//   const { name } = req.params;
//   try {
//     const user = await Usuario.create({
//       name,
//     });
//     res.send(user);
//   } catch (error) {
//     return res.status(400).send({ error: error.message });
//   }
// }
>>>>>>> d28e30f384576992b9246f90ce59105c0b3fb166

module.exports = {
  getUser,
  createUser,
  putUser,
  deleteUser,
};
