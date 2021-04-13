
const { Router } = require('express');

const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validar-campos');

const router = Router();


router.post('/login', [
    check('email', 'The email is not valid').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateFields
], login);


module.exports = router;