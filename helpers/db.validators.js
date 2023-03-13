const { Category, Product , Usuario} = require('../models');
const Role = require('../models/role');



const isValidRole = async(role = '') => {
    const exists = await Role.findOne({ role });
    console.log(role);
    if (!exists) {
        throw new Error(`El rol ${role} no existe en DB`)
    }
}

const emailInUse = async(email = '') => {
    const emailInUse = await Usuario.findOne({ email });
    if (emailInUse) {
        throw new Error(`El email ${email} ya existe`)
    }
}
const userExits = async(id) => {
    const existsUser = await Usuario.findById(id);
    if (!existsUser) {
        throw new Error(`El id ${id} no existe`)
    }
}

const categoryExists = async(id) => {
    const existeCategoria = await Category.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id ${id} no existe`)
    }
}
const productExists = async(id) => {
    const existeProd = await Product.findById(id);
    if (!existeProd) {
        throw new Error(`El id ${id} no existe`)
    }
}

const allowedCollections = (collection = '', collections = []) => {
    const included = collections.includes(collection);
    if(!included) {
        throw new Error('La colección que quieres actualizar no está permitida');
    }

    return true;
}

module.exports = {
    isValidRole,
    emailInUse,
    userExits,
    categoryExists,
    productExists,
    allowedCollections
}