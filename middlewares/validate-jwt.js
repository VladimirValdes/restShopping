
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async( req = request, res = response, next ) => {

    // Get pameters of HEADERS
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(400).json({
            msg: 'There is not token in the request'
        });
    }

    try {
        
        // If valid token

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById( uid );


        // Verify if user is null or undefined

        if ( !user ) {
            return res.status(401).json({
                msg: 'Invalid token - user doesnt exist in DB'
            });
        }

        // // Verify if user status is true

        if ( !user.status ) {
            return res.status(401).json({
                msg: 'Invalid token  - user status: false '
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        });
    }

    // console.log( token );
}

module.exports = {
    validateJWT
}