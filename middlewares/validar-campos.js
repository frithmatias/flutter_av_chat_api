const { validationResult } = require("express-validator");

const validarCampos = ( req, res, next ) => {
    // NEXT es un callback para continuar con el siguiente middleware

    const errores = validationResult( req );
    console.log(errores);

    if(!errores.isEmpty()){
        return res.status(400).json({
            ok: false, 
            errors: errores.mapped()
        })
    }

    next();
}

module.exports = {
    validarCampos
}