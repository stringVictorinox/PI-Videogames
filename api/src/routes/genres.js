require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const axios = require('axios');
const { Genre } = require('../db');

router = Router();

router.get('/', async (req, res) => {

    try {

        const GenresDB = await Genre.findAll();
        if (GenresDB.length) return res.json(GenresDB);
        
        const genresAll = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);

        let genres = genresAll.data.results.map((e) => ({
            id: e.id,
            name: e.name,
        }));
        
        genres.forEach( async (e) =>
            await Genre.findOrCreate({
                where: {
                    name: e.name,
                    id: e.id,
                },
            })
        );

        res.json(genres);
        
    } catch (err) {
        return console.log(err)
    }
})

module.exports = router;