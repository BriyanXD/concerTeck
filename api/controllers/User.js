// const { useInflection } = require("sequelize/types");
const User = require("../models/User");
//prueba
require("../db.js");

async function createUser(req, res) {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res.status(404).send("Faltan completar Campos obligatorios");
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
  try {
    const DBusers = await User.findAll();
    return res.send(DBusers);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
}

async function putUser(req, res) {
  const { id, email, password } = req.body;
  try {
    if (!id || !email || !password) {
      return res
        .status(404)
        .send("No se recibieron los parámetros necesarios para actualizar");
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

        return res.send("Usuario Actualizado con exitos");
      }
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
}
async function deleteUser(req, res){
  try {
      const { id } = req.body //req.params.id
      //console.log(id)
      const user = await User.findByPk(id);
      //console.log(user)
      if(!id){
          return res.status(404).send("El ID solicitado no existe")
      }
      if(!user){
          return res.status(404).send("No se a encontrado un Usuario que corresponda a lo solicitado")
      }
      const destoyed = await user.destroy()
      if(destoyed){
          return res.status(201).send("El Usuario a sido eliminado con exito")
      }
  }catch(err){
      return res.status(404).send(err)
  }
}


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

module.exports = {
  getUser,
  createUser,
  putUser,
  deleteUser,
};
