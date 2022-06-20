const Productor = require("../models/Productor");
//prueba
require("../db.js");

async function createProductor(req,res){
  const{user,password,mail,telephone,name,lastname,cbu,company,cuit_cuil} = req.body;
  if(!user || !password || !mail || !telephone || !name || !lastname || !cbu || !cuit_cuil/* || !company */){
    res.status(404).send("Faltan completar Campos obligatorios")
  }else{
  try {
    let create = await Productor.findOrCreate({
      where:{
        user:user,
        password:password,
        mail:mail,
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
module.exports={
  createProductor,
  getProductor
}