const { Router } = require('express');
const { check } = require('express-validator');

const { loginController } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar.campos');



const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos
], loginController);


module.exports = router;