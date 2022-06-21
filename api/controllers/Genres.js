const genreFiles = require("../db_event_genre/db_genre.json")
const Event = require("../models/Events");

async function getAllGenres(req,res){
    const { genre } = req.body;
    try {
        const gen = genreFiles.genres.map(e => {return e.name});
        res.send(gen)
    } catch (error) {
        res.status(404).send({error: error.message})
    }
}

module.exports = {getAllGenres};