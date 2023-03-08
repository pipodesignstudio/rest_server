const { response, request } = require("express")


const validateRoles = async(req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Token no validado antes de validar el role'
        })
    }

    const { role, name } = req.usuario;

    if (role !== 'ADMIN_ROLE') {
        return res.status(500).json({
            msg: `${name} no es Administrador`
        })
    }
    next();
}


const hasAnyRole = (...roles) => {
    return (req, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Token no validado antes de validar el role'
            })
        }

        if (!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                msg: 'No tienes permisos suficientes'
            })
        }

        next();
    }
}

module.exports = {
    validateRoles,
    hasAnyRole
}