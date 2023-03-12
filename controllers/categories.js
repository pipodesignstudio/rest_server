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

const getCtegories = async(req, res = response) => {
    const { limit, from } = req.query;
    const query = { status: true }

    const [total, categorias] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
        .populate('user', 'name')
        .skip(Number(from))
        .limit(Number(limit))
    ])

    res.json({ total, categorias });


}

const getCategoryByid = async(req, res = response) => {
    const { id } = req.params;
    const category = await Category.findById(id).populate('user', 'name');
    res.json(category);
}

const updateCategories = async(req, res = response) => {
    const {id} = req.param;
    const {status, user, ...data} = req.body;
    
    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, { new: true});

    res.json(category);

}

const deleteCategory = async(req, res = response) => {
    const {id} = req.params;
    const deletedCategory = await Categoria.findByIdAndUpdate(id, {status: false} , {new: true});
    res.json(deletedCategory);
}
module.exports = {
    createCategory,
    getCtegories,
    getCategoryByid,
    updateCategories,
    deleteCategory
}