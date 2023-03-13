const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile, updatePicture } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers');

const { validarCampos } = require('../middlewares/validar.campos');

const router = Router();

router.post('/', [], uploadFile);

router.put('/:collection/:id', [
    check('id', 'El id no es válido').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'prods'])),
    validarCampos
], updatePicture)


module.exports = router;