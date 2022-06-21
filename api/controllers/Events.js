const archivoEventos = require("../db_event_genre/db_events.json");
const Event = require("../models/Events");
async function loadEventsAndGetEvents(req, res) {
  const { name, id } = req.query;
  try {
    for (let typeEvent in archivoEventos) {
      archivoEventos[typeEvent].map(async (event) => {
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
    }
    const allEvents = await Event.findAll();
    if (name) {
      //const eventName = await Events.findOne({where:{name:name}})
      const eventName = allEvents.filter((n) =>
        n.name.toLowerCase().includes(name.toLowerCase())
      );
      if (eventName.length >= 1) {
        return res.send(eventName);
      } else {
        return res
          .status(404)
          .json({ error: "No se encontro Eventos con ese Nombre" });
      }
    } else if (id) {
      console.log(id);
      const eventId = await Event.findByPk(id);
      if (eventId) {
        return res.send(eventId);
      } else {
        return res
          .status(404)
          .json({ error: "No se encontro Eventos con ese ID" });
      }
    }
    res.json(allEvents);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function postEvents(req, res) {
  try {
    const { name, address, genre, schedule, map, image, description } =
      req.body;
    if (!name || !address || !genre || !schedule || !image) {
      return res.status(404).send("Faltan datos obligatorios");
    } else {
      const event = await Event.findOrCreate({
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
    const upload = await Event.findByPk(id);
    if (upload) {
      const event = await Event.update(
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
  postEvents,
  putEvents,
  loadEventsAndGetEvents,
};
