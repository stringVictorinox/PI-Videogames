require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genre } = require('../db.js');

router = Router();

router.get('/:idVideogame', async (req, res) => {

    const { idVideogame } = req.params
    
    if (idVideogame.includes('-')){

        let videogameDb = await Videogame.findOne({
            where: {
                id: idVideogame,
            },
            include: Genre
        })

        //Parseo el objeto
        videogameDb = JSON.stringify(videogameDb);
        videogameDb = JSON.parse(videogameDb);
        
        //dejo un array con los nombres de genero solamente
        videogameDb.genres = videogameDb.genres.map(g => g.name);
        res.json(videogameDb);

    } else {
        //else (si no es un juego creado, voy a buscar la info a la API)
        try {
            const response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
            let { id, name, background_image, genres, description, released: releaseDate, rating, platforms, metacritic } = response.data;
            genres = genres.map(g => g.name);
            platforms = platforms.map(p => p.platform.name);
            return res.json({
                id,
                name,
                background_image,
                genres,
                description,
                releaseDate,
                rating,
                metacritic,
                platforms
            })
        } catch (err) {
            
            return console.log(err)
        }
    }
});

module.exports = router;