const { Schema, model } = require('mongoose');

// const ListProductsSchema = Schema({
      
//     category: {
//         type: Schema.Types.ObjectId,
//         ref: 'Category',
//         required: true
//     },
//     products: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true
//       }
//     ],
// });

const ShoppingListSchema = Schema({
    name: {
        type: String,
        unique: true
    },
    createAt: {
        type: String,
    },
    complete: {
        type: Boolean,
        default: false,
        required: true
    },
    cancel: {
        type: Boolean,
        default: false,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    list: [{
            category: {
                type: Schema.Types.ObjectId,
                ref: 'Category',
                required: true
            },
            products: [{
                pid: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1,
                    required: true
                }
            }],
        }]
    });


    {
        
    }
// ListProductsSchema.methods.toJSON = function() {
//     const { __v, _id, ...data } = this.toObject();

//     data.id = _id;

//     return data;
// }

module.exports = model('ShoppingList', ShoppingListSchema );
