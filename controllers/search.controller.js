
const { response } = require('express');
const { User, Categories, Products, Role} = require('../models');

const allowCollections = [
    "products",
    "categories",
    "users",
    "rols"
];

const getCategoriesByUser = async( req, res = response ) => {

    const uid = req.user._id;

    const categories = await Categories.find({ user: uid, status: true });

    res.json({
        categories: ( categories ) ?  categories  : []
    });
}

const getPxCByUser = async( req, res = response ) => {

    const results = [];

    const uid = req.user._id;

    const categories = await Categories.find({ user: uid, status: true });

    if ( !categories ) {
        return res.status(400).json({
            msg: 'User does not have categories'
        });
    }

    // console.log( categories );

    for (const category of categories) {
        
        const products = await Products.find({ user: uid, category: category._id, status: true });


        if ( products.length > 0 ) {

            const data = {
                category: category.name,
                products
            }

            results.push( data );
            
        } 
       
    }

    res.json({
        results
    });

}


module.exports = {
    getCategoriesByUser,
    getPxCByUser
}