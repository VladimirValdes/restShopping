

const { Router } = require('express');
const { check } = require('express-validator');


const { 
    validateFields,
    validateJWT,
    hasRole
} = require('../middlewares');

const  {
    existCategory,
    existProduct,
    isValidRole
} = require('../helpers/db-validators');



const {
    listProductsPost
} = require('../controllers/shopList.controller')

const router = Router();


// router.get('/:id', [
//     check('id', 'Id is not valid').isMongoId(),
//     check('id').custom( existProduct ),
//     validateFields
//  ], );


 router.post('/', [
    validateJWT,
    check('category', 'Category is required').not().isEmpty(),
    check('product', 'Product is required').not().isEmpty(),
    check('category', 'Category id is not valid').isMongoId(),
    check('product', 'Product id is not valid').isMongoId(),
    check('category').custom(existCategory),
    check('product').custom( existProduct ),
    validateFields
], listProductsPost );

// router.put('/:id', [
//     validateJWT,
//     check('id', 'Id is not valid').isMongoId(),
//     check('id').custom( existProduct ),
//     validateFields
// ], );

// router.delete('/:id', [
//     validateJWT,
//     hasRole('USER_ROLE', 'ADMIN_ROLE'),
//     check('id', 'Id is not valid').isMongoId(),
//     check('id').custom( existProduct ),
//     validateFields
// ], );

module.exports = router;
