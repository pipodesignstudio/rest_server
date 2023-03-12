const path = require('path');
const { v4: uuidv4 } = require('uuid');


const uploadArchivo = ( files, validExtensions = ['jpg', 'png', 'jpeg', 'csv', 'xls'], folder = '' ) => {

    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const cropedName = archivo.name.split('.');
        const extension = cropedName.pop();

    
        if (!validExtensions.includes(extension)) {
            return reject('La extensión del archivo no es válida');
        } 
    
        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads', folder, tempName);
    
        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, function(err) {
            if (err) {
                reject(err);
            }
    
         resolve(tempName);
        }); 
    });

    
}

module.exports = {
    uploadArchivo
}