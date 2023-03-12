const { response } = require("express");
const { uploadArchivo } = require("../helpers");

const uploadFile = async(req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg: 'No hay adjuntos'
        });
    }

   const nombre = await uploadArchivo(req.files);
    res.json(nombre)
    
}
 
module.exports = {
    uploadFile
}