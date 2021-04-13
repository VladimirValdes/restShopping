
const validateFields = require('../middlewares/validar-campos');
const validateJWT  = require('../middlewares/validate-jwt');
const validateRols = require('../middlewares/validate-roles');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRols
}