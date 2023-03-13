const { response } = require("express");
const { uploadArchivo } = require("../helpers");
const {Usuario, Product} = require('../models')

const uploadFile = async(req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg: 'No hay adjuntos'
        });
    }
    try {
        // Pasando como archivos permitidos txt y md
        // const nombre = await uploadArchivo(req.files, ['txt', 'md']);

        // Dejando solo subir imágenes
        const nombre = await uploadArchivo(req.files, undefined, 'imgs');
        res.json(nombre)

    } catch (msg) {
        res.status(400).json({msg})
    }
   
    
}


const updatePicture = async(req, res = response) => {

    const {collection, id} = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await Usuario.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: 'No existe el usuario con este Id'
                });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: 'No existe el producto con este Id'
                })
            }
            break;
    
        default:
            res.status(500).json({msg: 'No hemos validado este caso'})
    }


    const name = await uploadArchivo(req.files, undefined, collection);
    console.log(name);
    model.img = name;
    await model.save;

    res.json(model);
}
 
module.exports = {
    uploadFile,
    updatePicture
}