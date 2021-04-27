
const { Router } = require('express');
const { check } = require('express-validator');


const { 
    validateFields,
    validateJWT,
    isRoleAdmin
} = require('../middlewares');

const  {
    existCategory,
    existCategoryByName
} = require('../helpers/db-validators')

const {
    categoriesGet,
    categoriesPost,
    categoriesPut,
    categoriesDelete
} = require('../controllers/categories.controller');


const router = Router();

// Get all categories - Public

router.get('/', categoriesGet );

router.post('/',[
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    validateFields
], categoriesPost);


router.put('/:id', [
    validateJWT,
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom( existCategory ),
    check('name', 'The name is required').not().isEmpty(),
    check('name').custom( existCategoryByName ),
    validateFields
], categoriesPut);

router.delete('/:id', [
    validateJWT,
    isRoleAdmin,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existCategory ),
    validateFields
], categoriesDelete );

module.exports = router;