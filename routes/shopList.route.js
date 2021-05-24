

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
    existList,
    existProductList,
    isValidRole
} = require('../helpers/db-validators');



const {
    listProductsPost,
    listProductsGetById,
    listsProductsGetByUser,
    listProductsUpdate,
    listUpdate

} = require('../controllers/shopList.controller')

const router = Router();



router.get('/user', [
    validateJWT,
    validateFields
], listsProductsGetByUser)

router.get('/:id', [
    validateJWT,
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(existList),
    validateFields
 ], listProductsGetById);


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

router.put('/:id', [
    validateJWT,
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(existList),
    check('pid', 'PID is not valid').isMongoId(),
    check('pid').custom( existProductList ),
    validateFields
], listProductsUpdate);


router.put('/list/:id', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('createAt', 'createAt is required').not().isEmpty(),
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(existList),
    validateFields
], listUpdate);

// router.delete('/:id', [
//     validateJWT,
//     hasRole('USER_ROLE', 'ADMIN_ROLE'),
//     check('id', 'Id is not valid').isMongoId(),
//     check('id').custom( existProduct ),
//     validateFields
// ], );

module.exports = router;
