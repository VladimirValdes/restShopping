
const { Router } = require('express');

const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validar-campos');

const { isValidRole, existEmail, existUserById } = require('../helpers/db-validators');

const {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
} = require ('../controllers/users.controller')

const router = Router();

router.get('/', usersGet);

router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password should has 6 letters').isLength({ min: 6 }),
    check('email', 'The email is invalid').isEmail(),
    check('email').custom( existEmail ),
    check('rol').custom( isValidRole ),
    validateFields
], usersPost);

router.put('/:id', [
    check('id', 'The id is invalid').isMongoId(),
    check('id').custom( existUserById ),
    check('rol').custom( isValidRole ),
    validateFields
], usersPut);

router.delete('/:id',[
    check('id', 'The id is invalid').isMongoId(),
    check('id').custom( existUserById ),
    validateFields
], usersDelete);

module.exports = router;
