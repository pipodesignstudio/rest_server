const express = require('express')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();

    
   }

   middlewares() {
    // Directorio público
    this.app.use(express.static('public'));
   }

   routes() {
    this.app.get('/', (req, res) => {
        res.send('Hello World')
      })
    this.app.get('/api', (req, res) => {
        res.json({
            msg: 'hola'
        })
      })
    this.app.post('/', (req, res) => {
        res.send('Hello World')
      })
    this.app.put('/', (req, res) => {
        res.send('Hello World')
      })
    this.app.delete('/', (req, res) => {
        res.send('Hello World')
      })
}

start() {
    this.app.listen(this.port, () => {
        console.log('Servidor corriendo')
    })
}
}

module.exports = Server;