const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/user')


const validateJWT = async(req = request, res = response, next) => {
    const token = req.header('authorization');
    if (!token) {
        return res.status(401).json({
            msg: 'No tienes permisos suficientes'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'El usuario no existe'
            });
        }

        if (!usuario.status) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Token no válido'
        })
    }


}

module.exports = {
    validateJWT
}