const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const videogames = require('./videogames');
const videogame = require("./videogame");
const genres = require('./genres');

router.use('/videogames', videogames);
router.use('/genres', genres);
router.use('/videogame', videogame);

module.exports = router;
