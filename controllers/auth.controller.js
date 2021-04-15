
const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

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


const googleSigIn = async( req, res = response ) => {

    const { id_token } = req.body;

    try {
        
        const { name, img, email } = await googleVerify( id_token );
        
        let user = await User.findOne({ email });

        if ( !user ) {
            
            const data = {
                name,
                email,
                password: 'NoseS1lab48',
                img,
                google: true
            };

            user = new User( data );
            await user.save();
        }

        if ( !user.status ) {
            res.status(401).json({
                msg: 'Talk with Admin, Access Denig'
            });
        }

        // Generate JWT

        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });




    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Google Token is not Valid'
        });
    }

}

module.exports = {
    login,
    googleSigIn
};