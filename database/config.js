const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {})
        console.log('Conectado con BBDD')
    } catch (error) {
        console.log(error)
        throw new Error('Error en la inicialización de la db')
    }
}

module.exports = {
    dbConnection
}