require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genre } = require('../db.js');

router = Router();

// RUTA PARA TRAERME TODOS LOS JUEGOS, ESTA RUTA ABARCA TANTO LA DE '/VIDEOGAMES' COMO LA DE QUERY.

router.get('/', async (req,res) => {

    // BUSCAMOS TODOS LOS JUEGOS QUE ESTÉN EN LA BASE DE DATOS.

    let GamesinDB = await Videogame.findAll({
        include: {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
    })

    GamesinDB = JSON.stringify(GamesinDB);
    GamesinDB = JSON.parse(GamesinDB);

    GamesinDB = GamesinDB.reduce(
        (acc, el) =>
          acc.concat({
            ...el,
            genres: el.genres.map((g) => g.name),
          }),
        []
    );

    // - - - - ! - - - - HASTA AQUÍ TENEMOS LOS JUEGOS EN LA DATABASE.

    // COMPROBAMOS SI RECIBIMOS UNA QUERY EN LA RUTA.

    if(req.query.name){
      try{

        let response = await axios.get(`https://api.rawg.io/api/games?search=${req.query.name}&key=${API_KEY}`);
        console.log(1);

        // SI NO ENCONTRÓ RESULTADOS, ENTONCES RESPONDEMOS CON UN MENSAJE DE ERROR.
        if (!response.data.count) return res.status(204).json(`Juego no encontrado "${req.query.name}"`);


        // FILTRAMOS LA INFORMACIÓN IMPORTANTE QUE ENVIAREMOS.

        const Games = response.data.results.map(e => {
            return{
                id: e.id,
                name: e.name,
                rating: e.rating,
                img: e.background_image,
                metacritic: e.metacritic,
                genres: e.genres.map(g => g.name),
                platforms: e.platforms.map((e) => e.platform.name),
            }
        });

        //como antes me traje TODOS de la base de datos, si entro por queries, solo filtro los que coincidan con la busqueda
        const filteredGamesDb = GamesinDB.filter(g => g.name.toLowerCase().includes(req.query.name.toLowerCase()));

        //doy prioridad a la DB, y sumo todos, y corto el array en 15
        const results = [...filteredGamesDb, ...Games.splice(0,15)];
        return res.json(results)

    } catch (err) {
        return console.log(err)
      }
    } else {

    // VAMOS A ALMACENAR LAS PRIMERAS 5 PÁGINAS DE LA API, 100 JUEGOS.

    const page1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    let GamesinAPI = page1.data.results;

    for(let i=2; i<=5; i++){
        let info = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
        GamesinAPI = [...GamesinAPI, ...info.data.results];
    }

    let apiPromises = await Promise.all(GamesinAPI);

    const infoApi = apiPromises.map((e) => {
        return {
          id: e.id,
          name: e.name,
          rating: e.rating,
          released: e.released,
          img: e.background_image,
          genres: e.genres.map((e) => e.name),
          platforms: e.platforms.map((e) => e.platform.name),
        }
    })

    const AllGames = GamesinDB.concat(infoApi);

    res.json(AllGames);
  }
})

router.post('/', async (req,res) => {

    try{

        // Hacemos un destructuring para extraer cada elemento del juego creado.
    
        const { name, description, releaseDate, rating, platforms, genres } = req.body;
        
        const [GameCreated, tp] = await Videogame.findOrCreate({
            where: {
                name,
                description,
                releaseDate,
                rating,
                platforms,
            }
        });

        let genre = await Genre.findAll({ where: { name: genres } });

        await GameCreated.addGenre(genre);
        res.status(200).json(GameCreated);
        
    } 
    catch(error){
        res.status(400).json("ERROR FROM CATCH POST: " + error); // ver bien esto
    }
});

module.exports = router;