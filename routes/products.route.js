
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
} = require('../helpers/db-validators')

const {
    productsGet,
    productsGetById,
    productsPost,
    productsPut,
    productsDelete
} = require('../controllers/products.controller');


const router = Router();

router.get('/', productsGet);

router.get('/:id', [
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom( existProduct ),
    validateFields
 ], productsGetById);

router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('category', 'Category id is not valid').isMongoId(),
    check('category').custom(existCategory),
    validateFields
], productsPost);

router.put('/:id', [
    validateJWT,
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom( existProduct ),
    validateFields
], productsPut);

router.delete('/:id', [
    validateJWT,
    hasRole('USER_ROLE', 'ADMIN_ROLE'),
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom( existProduct ),
    validateFields
], productsDelete);

module.exports = router;