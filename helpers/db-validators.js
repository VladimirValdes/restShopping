//
//

const Role = require('../models/role');
const User = require('../models/user');
const Category = require('../models/categories');
const Product  = require('../models/products');



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

const existCategory = async( id ) => {
    const existC = await Category.findById(id);
    
    if ( !existC ) {
        throw new Error(` Category ${ id } doesn't exist in the DB`);
    }
}

const existCategoryByName = async( name = "" ) => {

    name = name.toUpperCase();

    const existName = await Category.findOne({ name });

    if ( existName ) {
        throw new Error(`Category ${ name } already exist`);
    }

}

const existProduct = async( id ) => {
    const existP = await Product.findById(id);
    
    if ( !existP ) {
        throw new Error(` Product ${ id } doesn't exist in the DB`);
    }
}


module.exports = {
    isValidRole,
    existEmail,
    existUserById,
    existCategory,
    existCategoryByName,
    existProduct
}