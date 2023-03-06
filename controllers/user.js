const { respons, request } = require('express')


const usersGet = (req = request, res = response) => {
    const { q, nombre = 'noname', apikey } = request.query;
    res.json({
        msg: ' Get API controlador',
        q,
        nombre,
        apikey
    })
}
const usersPost = (req, res = response) => {
    const { nombre, edad } = req.body;
    res.json({
        msg: 'Usuarios API controlador',
        nombre: nombre,
        edad: edad
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