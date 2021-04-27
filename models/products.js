const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [ true, 'The name is required'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    description: {
        type: String,
    },
    img: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

ProductSchema.methods.toJSON = function() {
    const { __v, status, _id, ...data } = this.toObject();

    data.pid = _id;

    return data;

}

module.exports = model('Product', ProductSchema );