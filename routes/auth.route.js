
const { Router } = require('express');

const { check } = require('express-validator');

const { login, googleSigIn } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validar-campos');

const router = Router();


router.post('/login', [
    check('email', 'The email is not valid').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateFields
], login);

router.post('/google', [
    check('id_token', 'The id_token is required').not().isEmpty(),
    validateFields
], googleSigIn)


module.exports = router;