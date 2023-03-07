const Role = require('../models/role');
const Usuario = require('../models/user');



const isValidRole = async(role = '') => {
    const exists = await Role.findOne({role});
    if (!exists) {
        throw new Error(`El rol ${role} no existe en DB`)
    }
}

const emailInUse = async(email = '') => {
    const emailInUse = await Usuario.findOne({email});
    if (emailInUse) {
        throw new Error(`El email ${email} ya existe`)
    }
}

module.exports = {
    isValidRole,
    emailInUse
}