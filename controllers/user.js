const {response} = require('express')


const usersGet = (req, res = response) => {
    res.json({
        msg : ' Get API controlador'
    })
  }
const usersPost = (req, res = response) => {
    const {nombre, edad} = req.body;
    res.json({
        msg : 'Usuarios API controlador',
        nombre : nombre ,
        edad : edad 
    })
}
const usersPut = (req, res = response) => {
    res.json({
        msg : 'Usuarios API controlador'
    })
}
const usersPatch = (req, res = response) => {
    res.json({
        msg : 'Usuarios API controlador'
    })
}
const usersDelete = (req, res = response) => {
    res.json({
        msg : 'Usuarios API controlador'
    })
}
module.exports = {
    usersGet,
    usersDelete, 
    usersGet,
    usersPatch,
    usersPost
}