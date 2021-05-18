const { response } = require('express');
const ShopList = require('../models/shopList');



const listProductsPost = async( req, res = response ) => {


    let list = [];
    const products = [];
    const user = req.user._id; 
    const { product, category } = req.body;



    list.push({ category, products})
    products.push({ pid: product });

    const shopListU = await ShopList.findOne({ user, 
                                              complete: false,
                                              cancel: false });

    console.log(shopListU);

    if ( shopListU ) {

        const existCategory = shopListU.list.find( item => item.category == category);


        if ( existCategory ) {

            const existProduct = existCategory.products.find( p => p.pid == product );

            if (!existProduct ) {

                const productList = await ShopList.findOneAndUpdate(
                                                  { "list._id": existCategory._id }, 
                                                  { $push: { "list.$.products": { pid: product } }},
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
    // productsGet,
    // productsGetById,
    listProductsPost,
    // productsPut,
    // productsDelete
}
