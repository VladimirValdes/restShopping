
const { response } = require('express');
const bcryptjs = require('bcryptjs')



const User = require('../models/user');


const usersGet = async( req, res = response ) => {
    
    let skip = 0;

    const { page = 1, limit = 3 } = req.query;
    
    const query = { status: true };

    console.log('Pagina : ', page);


    if( Number(page) >= 1 ) {
        skip = (Number(page) - 1) * limit;
    }

    console.log("Skip --", skip);
    const [ total, users ] = await Promise.all([
        User.countDocuments(),
        User.find(query)
            .skip(skip)
            .limit(Number(limit))
    ]);

    

    res.json({
        total,
        users,
    });
}


const usersPost = async( req, res = response ) => {

    const { name, password, email, rol } = req.body;
    const user = new User({ name, email, password, rol });

    // password Encript
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    


    // Save to DB
    await user.save();

    res.json({
        user
    })
}


const usersPut = async( req, res = response ) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    if ( password ) {
        const salt = bcryptjs.genSaltSync();

        resto.password = bcryptjs.hashSync( password, salt );
    }


    const user = await User.findByIdAndUpdate(id, resto, { new: true });
    
    res.json({
      user
    });
}

const usersDelete = async( req, res = response ) => {

    const { id } = req.params;
    
    const user = await User.findByIdAndUpdate( id, { status: false }, { new: true });

    res.json({
        user
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}