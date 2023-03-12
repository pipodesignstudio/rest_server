const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Category, Product } = require("../models");

const allowedCollections = [
    'users',
    'categories',
    'products',
    'roles'
];

const searchUsers = async(query = '', res = response) => {
    const isMongoId = ObjectId.isValid(query);

    if (isMongoId) {
        const usuario = await Usuario.findById(query)
        res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(query, 'i');

    const usuarios = await Usuario.find({
        $or: [
            { name: regex },
            { email: regex }
        ],
        $and: [{ status: true }]
    });

    res.json({
        results: usuarios
    })
}
const searchProducts = async(query = '', res = response) => {
    const isMongoId = ObjectId.isValid(query);

    if (isMongoId) {
        const product = await Product.findById(query)
        res.json({
            results: (product) ? [product] : []
        })
    }

    const regex = new RegExp(query, 'i');

    const products = await Product.find({
        $or: [
            { name: regex },
            { email: regex }
        ],
        $and: [{ status: true }]
    }).populate('category', 'name');

    res.json({
        results: products
    })
}

const searchCategories = async(query = '', res = response) => {
    const isMongoId = ObjectId.isValid(query);

    if (isMongoId) {
        const category = await Usuario.findById(query)
        res.json({
            results: (category) ? [category] : []
        })
    }

    const regex = new RegExp(query, 'i');

    const categories = await Category.find({
        $or: [
            { name: regex },
        ],
        $and: [{ status: true }]
    }).populate('category', 'name');

    res.json({
        categories
    })
}


const search = (req, res = response) => {

    const { coleccion, query } = req.params;

    if (!allowedCollections.includes(coleccion)) {
        return res.status(400).json({
            msg: 'No se puede buscar por ese parámetro'
        })
    }
    switch (coleccion) {
        case 'users':
            searchUsers(query, res)
            break;

        case 'categories':
            searchCategories(query, res)
            break;

        case 'products':
            searchProducts(query, res)
            break;

        default:
            res.status(500).json({
                msg: 'No se ha implementado esta búsqueda'
            })
    }
}

module.exports = {
    search
}