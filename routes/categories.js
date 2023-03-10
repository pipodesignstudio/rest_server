const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory } = require('../controllers/categories');
const { validateJWT } = require('../middlewares');

const { validarCampos } = require('../middlewares/validar.campos');


const router = Router();

router.get('/', (req, res) => {
    res.json('get-id')
})
router.get(':id', (req, res) => {
    res.json('get-id')
})
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createCategory)

router.put('/', (req, res) => {
    res.json('update')
})

router.delete('/', (req, res) => {
    res.json('delete')
})



module.exports = router;