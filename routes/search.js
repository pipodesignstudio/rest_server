const { Router } = require('express');
const { search } = require('../controllers/search');


const router = Router();

router.get('/:coleccion/:query', search)


module.exports = router;