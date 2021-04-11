//
//

const Role = require('../models/role');
const User = require('../models/user');



const isValidRole = async( rol = "" ) => {

    const validRole = await Role.findOne({ rol });
    
    if( !validRole ) {
        throw new Error(` The ${ rol } does not exist in the DB`);
    }
}

const existEmail = async( email = "" ) => {
    
    const duplicateEmail = await User.findOne({ email }); 

    if ( duplicateEmail ) {
        throw new Error(`The ${ email } already exist in the DB`);
    }
}


const existUserById = async( id ) => {
    
    const existId = await User.findById(id);

    if (!existId) {
        throw new Error(`The id ${ id } does not exist in the DB`);
    }
}


module.exports = {
    isValidRole,
    existEmail,
    existUserById
}