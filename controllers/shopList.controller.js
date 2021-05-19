const { response } = require('express');
const ShopList = require('../models/shopList');

const listProductsGet = async( req, res = response ) => {

     const { id } = req.params;
     const user = req.user._id; 

     const shopListUser = await ShopList.findById(id)
                                        .populate('list.category', 'name')
                                        .populate('list.products.product', 'name');


    res.json({ shopListUser })



}

const listProductsPost = async( req, res = response ) => {


    let list = [];
    const products = [];
    const user = req.user._id; 
    const { product, category } = req.body;



    list.push({ category, products})
    products.push({ product });

    const shopListU = await ShopList.findOne({ user, 
                                              complete: false,
                                              cancel: false });


    if ( shopListU ) {

        const existCategory = shopListU.list.find( item => item.category == category);


        if ( existCategory ) {

            const existProduct = existCategory.products.find( p => p.product == product );

            if (!existProduct ) {

                const productList = await ShopList.findOneAndUpdate(
                                                  { "list._id": existCategory._id }, 
                                                  { $push: { "list.$.products": { product } }},
                                                  { new: true });

                return res.status(201).json({
                    productList,
                    msg: 'Product added'
                });

            } else {

                return res.status(400).json({
                    msg: 'Product already exists'
                });
            }

        } else {

         
            const newItem = await ShopList.findOneAndUpdate(
                                                    { user, complete: false, cancel: false },
                                                    { $push: { "list": { category, products }}},
                                                    { new: true });

             return res.status(201).json({
                    newItem,
                    msg: 'Product and Category added'
             });
        }

    } 
                                              


    const data = {
        name: user,
        user,
        list
    };


    
        const shopList = new ShopList(data);
    
        await shopList.save();
    
      
        res.status(201).json({
            shopList,
            msg: 'From product post'
        });

    }
    





module.exports =  {
    listProductsGet,
    listProductsPost,
    // productsPut,
    // productsDelete
}
