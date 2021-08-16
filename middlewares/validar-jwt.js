const jwtHelper = require('../helpers/jwt');

let verificaToken = (req, res, next) => {

    const userToken = req.header('x-token');
    console.log('Verificando token:', userToken);
    if(!userToken){
        return res.status(400).json({
            ok: false, 
            msg: 'No se recibió el token', 
            token: null
        })
    }

    try {
        jwtHelper.checkToken(userToken).then((decoded) => {
            // decoded: { uid: '6111282e0c219608906d4c09', iat: 1628518348, exp: 1628604748 }
            req.uid = decoded.uid;
            next();
        }).catch((err) => {
            res.status(401).json({
                ok: false,
                msg: 'El token no es válido',
                code: err
            });
        });

    } catch (error) {
        return res.status(400).json({
            ok: false, 
            msg: 'Ocurrio un error al verificar el token', 
            token: null
        });
    }

};


module.exports = {
    verificaToken
}