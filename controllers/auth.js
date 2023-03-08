const { response } = require("express");
const Usuario = require('../models/user');
const bcryptjs = require('bcryptjs');

const loginController = async(req, res = response) => {

    const { email, password } = req.body;
    try {
        const user = await Usuario.findOne({ email });

        // Verificar si el email existe
        if (!user) {
            return res.status.status(400).json({
                msg: "Email no existe"
            });
        }
        // verificar si el usuario está activo en BBDD
        if (!user.status) {
            return res.status.status(400).json({
                msg: "El usuario fue borrado"
            });
        }
        // Validar password
        const validPass = bcryptjs.compareSync(password, user.password);
        if (!validPass) {
            return res.status.status(400).json({
                msg: "Contraseña incorrecta"
            });
        }
        // Generar JWT


        res.json({
            msg: 'Login correcto'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo ha ido mal'
        });
    }

}

module.exports = {
    loginController
}