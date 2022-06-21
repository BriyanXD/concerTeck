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
module.exports = {
  loadEventsAndGetAllEvents,
};
