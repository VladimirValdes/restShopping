

const { response } = require('express');

const  Category = require('../models/categories');

const categoriesGet = async( req, res = response) => {

    let skip = 0;

    const { page = 1, limit = 3 } = req.query;
    
    const query = { status: true };

    // console.log('Pagina : ', page);

    
    if( Number(page) >= 1 ) {
        skip = (Number(page) - 1) * limit;
    }

    const [ total, categories ] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .skip(skip)
            .limit(Number(limit))
    ]);

    

    res.json({
        total,
        categories,
    });
}

const categoriesPost = async( req, res = response ) => {

    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });


    if ( categoryDB ) {
        res.status(400).json({
            msg: `Category ${ categoryDB.name } already exist`
        });
    }

    const data = {
        name,
        user: req.user._id
    }

    const category = new Category( data );

    // Save DB

    await category.save();

    res.status(201).json({
        category
    });
}


const categoriesPut = async( req, res = response ) => {

    const { id } = req.params;
    const { status, user, ...data} = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate( id, data, { new: true });


    res.json({
        category
    });
}

const categoriesDelete = async( req, res = response ) => {

    const { id } = req.params;

    const category = await Category.findByIdAndUpdate( id, { status: false }, { new: true });

    res.json({
        category
    });
}


module.exports = {
    categoriesGet,
    categoriesPost,
    categoriesPut,
    categoriesDelete
}