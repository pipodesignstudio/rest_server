const { response } = require("express");
const { Product } = require("../models");

const createProduct = async(req, res = response) => {

    const {status, user, ...body} = req.body;

    const productDb = await Product.findOne({name});

    if (productDb) {
        return res.status(400).json({
            msg: 'El producto ya existe la categoría'
        });
    }

    const data = {
        ...body,
        name : body.name.toUpperCase(),
        user: req.usuario._id
    }

    const product = await new Product(data)
    await product.save();
    res.status(201).json(categoria);
}

const getProducts = async(req, res = response) => {
    const { limit, from } = req.query;
    const query = { status: true }

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
        .populate('user', 'name')
        .populate('categoria', 'name')
        .skip(Number(from))
        .limit(Number(limit))
    ])

    res.json({ total, products });


}

const getProductById = async(req, res = response) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    .populate('user', 'name')
    .populate('category', 'name');
    res.json(product);
}

const updateProduct = async(req, res = response) => {
    const {id} = req.param;
    const {status, user, ...data} = req.body;
    if (data.name) {

        data.name = data.name.toUpperCase();
    }
    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, data, { new: true});

    res.json(product);

}

const deleteProduct = async(req, res = response) => {
    const {id} = req.params;
    const deletedProd = await Product.findByIdAndUpdate(id, {status: false} , {new: true});
    res.json(deletedProd);
}



module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}