const Producer = require("../models/Producer");
//prueba
require("../db.js");

async function createProducer(req,res){
  const{username,password,email,telephone,name,lastname,cbu,company,cuit_cuil} = req.body;
  if(!username || !password || !email || !telephone || !name || !lastname || !cbu || !cuit_cuil/* || !company */){
    res.status(404).send("Faltan completar Campos obligatorios")
  }else{
  try {
    let create = await Producer.findOrCreate({
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
async function getProducer(req,res){
  try {
    const DBproducer = await Producer.findAll();
    return res.send(DBproducer)
  } catch (error) {
    return res.status(404).send({ error: error.message })
  }
}
// "No se ha logrado crear el Producer"


async function putProducer(req, res){
  const { id, cuit_cuil, email, cbu, telephone, company } = req.body
  try {
    if(!cuit_cuil && !email && cbu && !telephone && !company){
      res.status(404).send("No se recibieron los parámetros necesarios para actualizar")
    }else{
      const upload = await Producer.findByPk(id) 
      if(upload){
        const producer = await Producer.update({
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
async function deleteProducer(req, res){
  try {
      const { id } = req.body //req.params.id
      const producer = await Producer.findByPk(id);
      if(!id){
          return res.status(404).send("El ID solicitado no existe")
      }
      if(!Producer){
          return res.status(404).send("No se a encontrado un Productor/ra que corresponda a lo solicitado")
      }
      const destoyed = await producer.destroy()
      if(destoyed){
          return res.status(201).send("El Productor/ra a sido eliminado con exito")
      }
  }catch(err){
      return res.status(404).send(err)
  }
}
module.exports={
  createProducer,
  getProducer,
  putProducer,
  deleteProducer
}