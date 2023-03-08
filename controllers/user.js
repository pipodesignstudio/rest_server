const { response, request } = require('express');
const Usuario = require('../models/user');
const bcryptjs = require('bcryptjs');



const usersGet = async(req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true }

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ])

    res.json({ total, usuarios });
}
const usersPost = async(req, res = response) => {
    const { name, email, password, role } = req.body;
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

    res.json(
        usuario
    )
}
const usersPatch = (req, res = response) => {
    res.json({
        msg: 'Usuarios API controlador'
    })
}
const usersDelete = async(req, res = response) => {

    const { id } = req.params;
    // Borrado físico
    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findById(id);
    if (!usuario.status) {
        return res.json(usuario);
    }  else {
        usuario.findByIdAndUpdate(id, {
            status: false
        });
    
        res.json(
            usuario
        )
    }

    
}
module.exports = {
    usersGet,
    usersDelete,
    usersGet,
    usersPatch,
    usersPut,
    usersPost
}