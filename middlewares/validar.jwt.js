const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => { 
    const token = req.header('authorization');
    if (!token) {
        return res.status(401).json({
            msg: 'No tienes permisos suficientes'
        });
    }
    try {
        const {uid} = jwt.verify(token , process.env.SECRETORPRIVATEKEY);
        req.uid = uid;
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