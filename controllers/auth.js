const { response } = require("express");
const Usuario = require('../models/user');
const bcryptjs = require('bcryptjs');
const { googleVerify } = require("../helpers/google.verify");
const { generateJWT } = require("../helpers/create_jwt");

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
        const token = await generateJWT(user.id);

        res.json({
            msg: 'Login correcto',
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo ha ido mal'
        });
    }

}


const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;
    console.log(id_token);

    try {
        const { email, name, img } = await googleVerify(id_token);

        // Validar email

        let usuario = await Usuario.findOne({ email });

        if (!usuario) {
            const data = {
                name,
                email,
                password: 'Sin pass',
                img,
                google: true
            };
            usuario = new Usuario(data);
            await usuario.save();
        }

        if (!usuario.status) {
            return res.status(401).json({
                msg: 'Este usuario ha sido borrado'
            })
        }

        const token = await generateJWT(user.id);
        console.log(token);

        res.status(200).json({
            msg: 'Tenemos id de google',
            token
        });
    } catch (error) {
        console.log(error);
        json.status(400).json({
            msg: 'No se ha podido validar el token'
        })
    }
}

module.exports = {
    loginController,
    googleSignIn
}