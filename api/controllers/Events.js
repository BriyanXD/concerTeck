const archivoEventos = require("../db_event_genre/db_events.json");
const Event = require("../models/Events");
async function loadEventsAndGetAllEvents(req, res) {
  try {
    archivoEventos.BigEvents.map(async (event) => {
      return await Event.findOrCreate({
        where: {
          name: event.name,
          genre: event.genre,
          address: event.address,
          schedule: event.schedule,
          map: event.map,
          image: event.image,
          description: event.description,
        },
      });
    });
    archivoEventos.Events.map(async (event) => {
      return await Event.findOrCreate({
        where: {
          name: event.name,
          genre: event.genre,
          address: event.address,
          schedule: event.schedule,
          map: event.map,
          image: event.image,
          description: event.description,
        },
      });
    });
    const eventos = await Event.findAll();
    res.json(eventos);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function getEvents(req, res) {
  try {
    const { name } = req.query;
    const eventsDB = await Events.findAll();
    if (name) {
      //const eventName = await Events.findOne({where:{name:name}})
      const eventName = eventsDB.filter((n) =>
        n.name.toLowerCase().includes(name.toLowerCase())
      );
      if (eventName) {
        return res.send(eventName);
      } else {
        return res
          .status(404)
          .send("No se a encontrado Eventos con ese nombre");
      }
    }
    return res.send(eventsDB);
  } catch (err) {
    return res.status(404).send(err);
  }
}

async function postEvents(req, res) {
  try {
    const { name, address, genre, schedule, map, image, description } =
      req.body;
    if (!name || !address || !genre || !schedule || !image) {
      return res.status(404).send("Faltan datos obligatorios");
    } else {
      const event = await Events.findOrCreate({
        where: {
          name: name,
          address: address,
          genre: genre,
          schedule: schedule,
          map: map,
          image: image,
          description: description,
        },
      });
      if (event) {
        console.log(event);
        return res.status(201).send("Evento creado con exito");
      } else {
        return res.status(404).send("Hubo un error en la creacion del evento");
      }
    }
  } catch (err) {
    return res.status(404).send(err);
  }
}

async function putEvents(req, res) {
  try {
    const { id, name, address, genre, schedule, map, image, description } =
      req.body;
    const upload = await Events.findByPk(id);
    if (upload) {
      const event = await Events.update(
        {
          name: name,
          address: address,
          genre: genre,
          schedule: schedule,
          map: map,
          image: image,
          description: description,
        },
        { where: { id: id } }
      );
      if (event) {
        return res.send(event);
      }
    }
  } catch (err) {
    return res.status(404).send(err);
  }
}

module.exports = {
  getAllEvents,
  getEvents,
  postEvents,
  putEvents,
  loadEventsAndGetAllEvents,
};
