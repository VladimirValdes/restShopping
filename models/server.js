
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Paths

        this.usersPath = '/api/users';

        // Conectar DB
        this.dbConecction();
        // Middlewares

        this.middlewares();

        // Application routes
        this.routes();
    }

    async dbConecction() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // JSON parse
        this.app.use(express.json());

        // Public Folder
        this.app.use( express.static('public'));

    }

    routes() {
        this.app.use( this.usersPath, require('../routes/users.route'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server on port ${ this.port }`);
        });
    }
}


module.exports = Server;