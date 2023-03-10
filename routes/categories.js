const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory, getCtegories, getCategoryByid } = require('../controllers/categories');
const { categoryExists } = require('../helpers/db.validators');
const { validateJWT } = require('../middlewares');

const { validarCampos } = require('../middlewares/validar.campos');


const router = Router();

router.get('/', getCtegories);


router.get(':id', [
    check('id', 'No es válido').isMongoId(),
    check('id').custom(categoryExists),
    validarCampos
], getCategoryByid)
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