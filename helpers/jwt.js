const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid }; // lo que voy a encriptar en mi payload
        jwt.sign(payload, process.env.TOKEN_SEED, { expiresIn: '24h' }, (err, token) => {
            // callback
            if (err) {
                reject(err); // no se pudo crear el token
            } else {
                resolve(token);
            }
        });
    })
}

const checkToken = (userToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(userToken, process.env.TOKEN_SEED, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                // decoded: { uid: '6111282e0c219608906d4c09', iat: 1628518348, exp: 1628604748 }
                resolve(decoded);
            }
        });
    });
}

module.exports = {
    generarJWT,
    checkToken
}