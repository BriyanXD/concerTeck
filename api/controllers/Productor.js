const Productor = require("../models/Productor");
//prueba
require("../db.js");

async function createProductor(req,res){
  const{username,password,email,telephone,name,lastname,cbu,company,cuit_cuil} = req.body;
  if(!username || !password || !email || !telephone || !name || !lastname || !cbu || !cuit_cuil/* || !company */){
    res.status(404).send("Faltan completar Campos obligatorios")
  }else{
  try {
    let create = await Productor.findOrCreate({
      where:{
        username:username,
        password:password,
        email:email,
        telephone:telephone,
        name:name,
        lastname:lastname,
        cbu:cbu,
        company:company,
        cuit_cuil:cuit_cuil,
      }
    })
    res.json(create)
  } catch (error) {
    res.status(404).send({ error: error.message })
  }
}
}
async function getProductor(req,res){
  try {
    const DBproductor = await Productor.findAll();
    return res.send(DBproductor)
  } catch (error) {
    return res.status(404).send({ error: error.message })
  }
}
// "No se ha logrado crear el Productor"


async function putProductor(req, res){
  const { id, cuit_cuil, email, cbu, telephone, company } = req.body
  try {
    if(!cuit_cuil || !email || cbu || !telephone || !company){
      res.status(404).send("No se recibieron los parámetros necesarios para actualizar")
    }else{
      const upload = await Productor.findByPk(id) 
      if(upload){
        const producer = await Productor.update({
          cuit_cuil: cuit_cuil,
          email: email,
          cbu: cbu,
          telephone: telephone,
          company: company
        },
        {where:
          {
            id: id
          }
        }
      )
      res.send("Campos actualizados con exito")
    }
  }
 } catch (error) {
    res.status(404).send(error)
}
}
module.exports={
  createProductor,
  getProductor,
  putProductor
}