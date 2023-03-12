const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory, getCtegories, getCategoryByid, updateCategories, deleteCategory } = require('../controllers/categories');
const { categoryExists } = require('../helpers/db.validators');
const { validateJWT, hasAnyRole } = require('../middlewares');

const { validarCampos } = require('../middlewares/validar.campos');


const router = Router();

router.get('/', getCtegories);


router.get('/:id', [
    check('id', 'No es válido').isMongoId(),
    check('id').custom(categoryExists),
    validarCampos
], getCategoryByid)


router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createCategory)

router.put('/:id', [
    validateJWT,
    check('name', 'Nombre es obligatorio').not().isEmpty(),
    check('id').custom(categoryExists),
    validarCampos
], updateCategories);

router.delete('/:id', [
    validateJWT, hasAnyRole, 
    check('category', 'No es un id válido').isMongoId(), 
    check('id').custom(categoryExists),
], deleteCategory)



module.exports = router;