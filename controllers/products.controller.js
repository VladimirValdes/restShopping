
const { response } = require('express');

const Products = require('../models/products');

const productsGet = async( req, res = response ) => {

    let skip = 0;

    const { page = 1, limit = 3 } = req.query;
    
    const query = { status: true };

    // console.log('Pagina : ', page);

    
    if( Number(page) >= 1 ) {
        skip = (Number(page) - 1) * limit;
    }

    const [ total, products ] = await Promise.all([
        Products.countDocuments(query),
        Products.find(query)
            .skip(skip)
            .limit(Number(limit))
            .populate('user', 'name')
            .populate('category', 'name')
    ]);

    

    res.json({
        total,
        products
    });
   
}

const productsGetById = async( req, res = response ) => {

    const { id } = req.params;

    const product = await Products.findById(id)
                                  .populate('user', 'name')
                                  .populate('category', 'name');


    if (!product.status) {
        res.status(400).json({
            msg: `Product is not active - status false`
        })
    }

    res.json({
        product
    })
}

const productsPost = async( req, res = response ) => {

    const { status, name = name.toUpperCase(), description, category } = req.body;

    // name 

    const productDB = await Products.findOne({ name });

    if ( productDB ) {
        res.status(400).json({
            msg: `Product ${ name } already exist in DB`
        });
    }

    const data = {
        name, 
        description,
        category,
        user: req.user._id
    }


    const product  = new Products(data);

    await  product.save();

    res.status(201).json({
        product
    })
}

const productsPut = async( req, res = response ) => {

    const { id } = req.params;
    const { status, user, ...data } = req.body;

    data.user = req.user._id;


    const product = await Products.findByIdAndUpdate(id, data, { new: true });


    res.json({
       product
    })
}

const productsDelete = async( req, res = response ) => {

    const { id } = req.params;

    const product = await Products.findByIdAndUpdate(id, { status: false }, { new: true });

    res.json({
        product
    })
}

module.exports =  {
    productsGet,
    productsGetById,
    productsPost,
    productsPut,
    productsDelete
}
