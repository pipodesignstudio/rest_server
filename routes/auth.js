const { Router } = require('express');
const { check } = require('express-validator');

const { loginController, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar.campos');



const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos
], loginController);

router.post('/google', [
    check('id_token', 'El token es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);


module.exports = router;