
const { response } = require('express');

const isRoleAdmin = ( req, res = response, next ) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: `You want to verify the rol whitout valid token first`
        });
    }

    const { rol, name } = req.user;

    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ name } is not admin, He can not make this`
        });
    }

    next();
}


const hasRole = (...rols) => {
    return ( req, res= response, next ) => {

        if ( !req.user ) {
            return res.status(500).json({
                msg: `You want to verify the rol whitout valid token first`
            });
        }

        if ( !rols.includes( req.user.rol )) {
            return res.status(401).json({
                msg: `The service required one of below rols ${ rols }`
            });
        }

        next();
    }
}

module.exports = {
    isRoleAdmin,
    hasRole
}