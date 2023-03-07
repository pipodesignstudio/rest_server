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
const usersPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    // Validar contra BBDDD

    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, rest);

    res.json({
        msg: 'Usuarios API controlador',
        usuario
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