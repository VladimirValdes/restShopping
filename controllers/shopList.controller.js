const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const ShopList = require('../models/shopList');


const listsProductsGetByUser = async( req, res = response ) => {

    const user = req.user._id; 

    const shopListUser = await ShopList.find({ user, status: true })
                                       .populate('user', 'name')
                                       .populate('list.category', 'name')
                                       .populate('list.products.product', 'name');


   res.json({ shopListUser })



}

// const listProductsGetById = async( req, res = response ) => {

//      const { id } = req.params;
//      const user = req.user._id; 

//      const shopListUser = await ShopList.findById(id)
//                                         .populate('list.category', 'name')
//                                         .populate('list.products.product', 'name');


//     res.json({ shopListUser })



// }


const listByUser = async( req, res = response ) => {

    const user = req.user._id; 
    const shopListUser = await ShopList.findOne({ user , 
                                               status: true ,
                                               complete: false, 
                                               cancel: false })
                                            .populate('list.category', 'name')
                                            .populate('list.products.product', 'name');

   


   res.json({ shopListUser })



}

const listProductsPost = async( req, res = response ) => {


    let list = [];
    const products = [];
    const user = req.user._id; 
    const { product, category, listId } = req.body;



    list.push({ category, products})
    products.push({ product });

    const shopListU = await ShopList.findOne({ user , 
                                              status: true ,
                                              complete: false, 
                                              cancel: false })

     console.log(` This is the list:  ${ shopListU }`);

    if ( shopListU ) {

        const existCategory = shopListU.list.find( item => item.category == category);


        if ( existCategory ) {

            const existProduct = existCategory.products.find( p => p.product == product );

            if (!existProduct ) {

                const productList = await ShopList.findOneAndUpdate(
                                                  { "list._id": existCategory._id }, 
                                                  { $push: { "list.$.products": { product } }},
                                                  { new: true });

                console.log('Id de la lista creada',productList.id);

                return res.status(201).json({
                    id: productList.id,
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
                    id: newItem.id,
                    msg: 'Product and Category added'
             });
        }

    } 
                                              


    const data = {
        name: uuidv4(),
        user,
        list
    };


    
        const shopList = new ShopList(data);
    
        await shopList.save();
    
      
        res.status(201).json({
            id: shopList.id,
            msg: 'From product post'
        });

    }
    


const listProductsUpdate = async( req, res = response ) => {


        // const user = req.user._id; 
        const { id } = req.params;
        // const { name, complete, cancel, createAt, pid, quantity, purchased  } = req.body;
        const { pid, quantity = 1 } = req.body;


            
        const shopListU = await ShopList.findOneAndUpdate({  _id: id, "list.products._id": pid },
                                                          { $set: { "list.$.products.$[element].quantity": quantity } },
                                                          { multi: false,
                                                            arrayFilters: [{ "element._id": { $eq: pid }}],
                                                            new: true
                                                           },

                                                          );
    
        res.json({
            shopListU,
            msg: 'From product UPDATE'
        });
}

const listUpdate = async( req, res = response ) => {

    const { id } = req.params;
    const { name, createAt, complete = false, cancel = false } = req.body;

    const data = {
        name,
        createAt,
        complete,
        cancel
    }

    const list = await ShopList.findByIdAndUpdate(id, data, { new: true });


    res.json({
        list
    });

}


module.exports =  {
    // listProductsGetById,
    listProductsPost,
    listsProductsGetByUser,
    listProductsUpdate,
    listUpdate,
    listByUser
}
