const { Router } = require('express');
const { check } = require('express-validator');

const { createProduct, getProducts, getProductByid, updateProduct } = require('../controllers/products');
const { categoryExists, productExists } = require('../helpers/db.validators');
const { validateJWT, validarCampos } = require('../middlewares');



const router = Router();


router.get('/', getProducts);

// router.get('/:id',[
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( productExists ),
//     validarCampos,
// ], getProductByid );

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'No es un id válido').isMongoId(),
    check('category').custom(categoryExists),
    validarCampos
], createProduct)



router.put('/:id', [
    validateJWT,
    check('category', 'No es un id válido').isMongoId(),
    check('id').custom(productExists),
    validarCampos
], updateProduct);

// router.delete('/:id', [
//     validateJWT, 
//     check('category', 'No es un id válido').isMongoId(), 
//     check('id').custom(categoryExists),
// ], deleteProduct)



module.exports = router;