const { response } = require("express");
const { Category } = require("../models");

const createCategory = async(req, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoryDb = await Category.findOne({ name });

    if (categoryDb) {
        return res.status(400).json({
            msg: 'ya existe la categoría'
        });
    }

    const data = {
        name,
        user: req.usuario._id
    }

    const categoria = await new Category(data)
    await categoria.save();
    res.status(201).json(categoria);
}

module.exports = {
    createCategory
}