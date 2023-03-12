const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { response } = require("express");

const uploadFile = (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg: 'No hay adjuntos'
        });
    }

    const { archivo } = req.files;
    const cropedName = archivo.name.split('.');
    const extension = cropedName.pop();
    console.log(extension);
    // Validate extensions

    const allowedExt = ['jpg', 'png', 'jpeg', 'csv', 'xls'];

    if (!allowedExt.includes(extension)) {
        return res.status(400).json({
            msg: 'La extensión del archivo no es permitida'
        })
    } else {
        console.log("Si puedes subir este archivo")
    }

    const tempName = uuidv4() + '.' + extension;
    const uploadPath = path.join(__dirname, '../uploads', tempName);

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(uploadPath, function(err) {
        if (err)
            return res.status(500).json({
                msg: err
            });

        res.json({
            msg: `Archivo subido a ${path}`
        });
    });
}

module.exports = {
    uploadFile
}