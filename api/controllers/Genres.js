const genreFiles = require("../db_event_genre/db_genre.json")
const Genre = require("../models/Genre")

async function getAllGenres(req,res){
    try {
            genreFiles.genres.map(async(e) => {
            return await Genre.findOrCreate({
                where:{
                    name: e.name.toLowerCase()
                }                
            })
        });
        const allGenre = await Genre.findAll()
        res.send(allGenre)
    } catch (error) {
        res.status(404).send({error: error.message})
    }
}

async function postOneGenre(req, res){
    const {name} = req.body
    try{
        Genre.findOrCreate({
            where:{
                name: name.toLowerCase()
            }   
        }).then(genreCreated =>{
            res.json(genreCreated)
        }).catch(e => res.status(404).send({error: 'Género no se pudo crear'}))       
    } catch (error) {
        res.status(404).send({error: error.message})
    }
}

module.exports = {getAllGenres, postOneGenre};