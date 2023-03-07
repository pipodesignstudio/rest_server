const { response, request } = require('express');
const Usuario = require('../models/user');
const bcryptjs = require('bcryptjs');



const usersGet = (req = request, res = response) => {
    const { q, nombre = 'noname', apikey } = request.query;
    res.json({
        msg: ' Get API controlador',
        q,
        nombre,
        apikey
    })
}
const usersPost = async(req, res = response) => {
    const {name, email, password, role} = req.body;
    const usuario = new Usuario({
        name,
        email,
        password,
        role
    });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    // Guardar objeto en MongoDB
    await usuario.save();
    
    res.json({
        msg: 'Usuarios API controlador',
        usuario
    })
}
const usersPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        msg: 'Usuarios API controlador',
        id
    })
}
const usersPatch = (req, res = response) => {
    res.json({
        msg: 'Usuarios API controlador'
    })
}
const usersDelete = (req, res = response) => {
    res.json({
        msg: 'Usuarios API controlador'
    })
}
module.exports = {
    usersGet,
    usersDelete,
    usersGet,
    usersPatch,
    usersPut,
    usersPost
}