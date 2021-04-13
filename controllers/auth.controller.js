
const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');
const user = require('../models/user');

const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        // If email exits in the DB

        const userDB = await User.findOne({ email });

        if ( !userDB ) {
            
            return res.status(400).json({
                msg: 'User/Password are not valid - email'
            });
        }

        // If user is active 

        if ( !userDB.status ) {
            
            return res.status(400).json({
                msg: 'User/Password are not valid - status: false'
            });
        }

        // If password is valid

        const validPassword = bcryptjs.compareSync( password, userDB.password );


        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'User/Password are not valid - password'
            });
        }


        // Generate JWT
        const token  = await generateJWT( userDB.id );

        res.json({
            user: userDB,
            token
        });


    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            msg: 'Talk to admin'
        });
    }
}

module.exports = {
    login
};