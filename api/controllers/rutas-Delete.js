const Usuario = require('../models/Usuario');
const Events = require('../models/Events');
const Productor = require('../models/Productor');
//const { where } = require('sequelize/types');
const { Op } = require("sequelize");

require('../db')

async function deleteEvent(req, res){
    try {
        const { id } = req.body //req.params.id
        const event = await Events.findByPk(id);
        if(!id){
            return res.status(404).send("El ID solicitado no existe")
        }
        if(!event){
            return res.status(404).send("No se a encontrado un Evento que corresponda a lo solicitado")
        }
        const destoyed = await event.destroy()
        if(destoyed){
            return res.status(201).send("El evento a sido eliminado con exito")
        }
    } catch(err){
        return res.status(404).send(err)
    }
}

async function deleteProductor(req, res){
    try {
        const { id } = req.body //req.params.id
        const productor = await Productor.findByPk(id);
        if(!id){
            return res.status(404).send("El ID solicitado no existe")
        }
        if(!productor){
            return res.status(404).send("No se a encontrado un Productor/ra que corresponda a lo solicitado")
        }
        const destoyed = await productor.destroy()
        if(destoyed){
            return res.status(201).send("El Productor/ra a sido eliminado con exito")
        }
    }catch(err){
        return res.status(404).send(err)
    }
}


async function deleteUsuario(req, res){
    try {
        const { id } = req.body //req.params.id
        //console.log(id)
        const user = await Usuario.findByPk(id);
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


module.exports = {
    deleteEvent,
    deleteProductor,
    deleteUsuario
}