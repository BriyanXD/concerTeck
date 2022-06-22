const eventsFiles = require("../db_event_genre/db_events.json");
const Event = require("../models/Events");
async function loadEventsAndGetEvents(req, res) {
  const { name, id, schedule } = req.query;
  try {
    for (let typeEvent in eventsFiles) {
      eventsFiles[typeEvent].map(async (event) => {
        return await Event.findOrCreate({
          where: {
            name: event.name,
            artist: event.artist,
            genre: event.genre,
            address: event.address,
            schedule: event.schedule,
            map: event.map,
            performerImage: event.performerImage,
            placeImage: event.placeImage,
            description: event.description,
            isBigEvent: event.isBigEvent,
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
    } else if (schedule) {
      console.log(schedule);
      //const eventName = await Events.findOne({where:{name:name}})
      const eventByDate = allEvents.filter((eventDate) => {
        if (Date.parse(eventDate.schedule) === Date.parse(schedule))
          return eventDate;
      });
      if (eventByDate.length >= 1) {
        return res.send(eventByDate);
      } else {
        return res
          .status(404)
          .json({ error: "No se encontro Eventos con esa fecha" });
      }
    }
    res.json(allEvents);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function postEvents(req, res) {
  try {
    const {
      name,
      artist,
      address,
      genre,
      schedule,
      map,
      performerImage,
      placeImage,
      description,
    } = req.body;
    if (
      !name ||
      !address ||
      !genre ||
      !schedule ||
      !performerImage ||
      !placeImage ||
      !artist
    ) {
      return res.status(404).send("Faltan datos obligatorios");
    } else {
      const event = await Event.findOrCreate({
        where: {
          name: name,
          artist: artist,
          address: address,
          genre: genre,
          schedule: schedule,
          map: map,
          performerImage: performerImage,
          placeImage: placeImage,
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
    const {
      id,
      name,
      artist,
      address,
      genre,
      schedule,
      map,
      performerImage,
      placeImage,
      description,
      producerId,
    } = req.body;
    const upload = await Event.findByPk(id);
    if (upload) {
      const event = await Event.update(
        {
          name: name,
          artist: artist,
          address: address,
          genre: genre,
          schedule: schedule,
          map: map,
          performerImage: performerImage,
          placeImage: placeImage,
          description: description,
          producerId: producerId,
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
async function deleteEvent(req, res) {
  try {
    const { id } = req.body; //req.params.id
    const event = await Event.findByPk(id);
    if (!id) {
      return res.status(404).send("El ID solicitado no existe");
    }
    if (!event) {
      return res
        .status(404)
        .send("No se a encontrado un Evento que corresponda a lo solicitado");
    }
    const destoyed = await event.destroy();
    if (destoyed) {
      return res.status(201).send("El evento a sido eliminado con exito");
    }
  } catch (err) {
    return res.status(404).send(err);
  }
}

module.exports = {
  // getAllEvents,
  deleteEvent,
  // getEvents,
  postEvents,
  putEvents,
  loadEventsAndGetEvents,
};
