const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            products: '/api/products',
            categories: '/api/categories',
            search: '/api/search'
        }

        // Conexión con BBDD
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();

    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio público
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.paths.users, require('../routes/user'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products'))
        this.app.use(this.paths.search, require('../routes/search'))
    }

    start() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo');
        })
    }
}

module.exports = Server;