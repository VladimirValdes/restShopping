const { Router } = require('express');
const { search } = require('./auth.route');

const router = Router();


const { 
    validateFields,
    validateJWT,
    isRoleAdmin
} = require('../middlewares');

const {
    getCategoriesByUser,
    getPxCByUser
} = require('../controllers/search.controller')




router.get('/categoriesUser', [
    validateJWT,
    validateFields
], getCategoriesByUser);

router.get('/productsUser', [
    validateJWT,
    validateFields
], getPxCByUser);
// router.get('/:collection/:term', search);


module.exports = router;