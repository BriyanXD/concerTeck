const Venue = require("../models/Venue");
const dbVenue = require("../db_event_genre/db_venue.json");

async function chargeVenue() {
  dbVenue.Venues.map(async (e) => {
    return await Venue.findOrCreate({
      where: {
        name: e.name,
        address: e.address,
        map: e.map,
        maxStockStreaming: e.maxStockStreaming,
        maxStockVIP: e.maxStockVIP,
        maxStockGeneralLateral: e.maxStockGeneralLateral,
        maxStockGeneral: e.maxStockGeneral,
        maxStockPalco: e.maxStockPalco,
        isBigEvent: e.isBigEvent || false,
      },
    });
  });
}

async function getVenues(req, res) {
  try {
    const allVenues = await Venue.findAll();
    res.json(allVenues);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  chargeVenue,
  getVenues,
};
