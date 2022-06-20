// const { useInflection } = require("sequelize/types");
const Usuario = require("../models/Usuario");
//prueba
require("../db.js");

async function createUser(req,res){
  const{user,password,email} = req.body;
  if(!user || !password |!email){
    res.status(404).send("Faltan completar Campos obligatorios")
  }else{
  try {
    let create = await Usuario.findOrCreate({
      where:{
        user:user,
        password:password,
        email:email
      }
    })
    res.json(create)
  } catch (error) {
    res.status(404).send({ error: error.message })
  }
}
}
// "No se ha logrado crear el usuario"
async function getUser(req, res) {
  try {
    const DBusers = await Usuario.findAll()
    return res.send(DBusers);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
}


async function putUser(req, res) {
  const { id , email, password } = req.body
  try {
    if(!id || !email || !password){
      return res.status(404).send( "No se recibieron los parámetros necesarios para actualizar")
    }else{
      const upload = await Usuario.findByPk(id)
      if(upload){
        const user = await Usuario.update({
            email: email,
            password: password
        },
          {where: 
          {
            id: id
          }
        }
        );
    return res.send(user)
      }
  }
} catch (error){
  res.status(404).send(error)
  }
}

// async function setUser(req, res) {
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
  putUser
};
