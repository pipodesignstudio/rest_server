const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => { 
    const token = req.header('authorization');
    console.log(token);
    next();
}

module.exports = {
    validateJWT
}