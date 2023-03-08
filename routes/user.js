const { Router } = require('express');
const { usersGet, usersPost, usersDelete, usersPatch, usersPut } = require('../controllers/user');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar.campos');
const { isValidRole, emailInUse, userExits } = require('../helpers/db.validators');
const role = require('../models/role');
const { validateJWT } = require('../middlewares/validar.jwt');


const router = Router();

router.get('/', usersGet);
router.post('/', [
    check('name', 'El nombre no es válido').not().isEmpty(),
    check('password', 'El nombre no es válido').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('role', 'El rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    check('role').custom(emailInUse),
    validarCampos
], usersPost);

router.delete('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userExits),
    validarCampos
], usersDelete);
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userExits),
    validarCampos
], usersPut)
router.patch('/', usersPatch);

module.exports = router;