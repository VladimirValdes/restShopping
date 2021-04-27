
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Paths
        this.paths = {
            auth      : '/api/auth',
            categories: '/api/categories',
            products  :  '/api/products',
            users     : '/api/users',
        }

        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

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
        this.app.use( this.paths.auth,  require('../routes/auth.route'));
        this.app.use( this.paths.users, require('../routes/users.route'));
        this.app.use( this.paths.products, require('../routes/products.route'));
        this.app.use( this.paths.categories, require('../routes/categories.route'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server on port ${ this.port }`);
        });
    }
}


module.exports = Server;