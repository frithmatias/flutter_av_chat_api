const { response, request } = require("express");
const UserModel = require("../models/user");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");


const registerUser = async (req = request, res = response) => {

    // A mi modelo de usuario, le voy a pasar el objeto JSON que viene en el body, esto
    // va a filtrar todos los campos que me puede mandar el cliente en el body pero que 
    // NO estén en el modelo

   
    try {
        // VERIFICAR SI EL EMAIL YA EXISTE 

        // para obtener el email puedo destructurar el objeto JSON que me viene en el body 
        const { email, name, password } = req.body;
        console.log(email, name, password);
        const userDB = await UserModel.findOne({ txEmail: email });
        if(userDB){
            return res.status(400).json({
                ok: false, 
                msg: 'El usuario ya existe',
                usuario: userDB
            })
        }

        // El email NO existe, procedo a guardarlo en la BD
        // req.body viene como un objeto json
        const usuario = new UserModel();
        usuario.txEmail = email;
        usuario.txName = name;

        // Encriptar contraseña 
        const salt = bcrypt.genSaltSync();
        usuario.txPassword = bcrypt.hashSync(password, salt);
        await usuario.save();
   
        // Generar Token con JWT 
        const token = await generarJWT(usuario._id);

        res.status(200).json({
            ok: true, 
            msg: 'Usuario guardado correctamente', 
            user: usuario,
            token
        });

    } catch(error) {

        res.status(500).json({
            ok: false, 
            msg: error,
            token: null
        })
    }


}

const loginUser = async (req = request, res = response) => {
   
    try {

        const { email, password } = req.body;
        const userDB = await UserModel.findOne({ txEmail: email });
        
        if(!userDB){
            return res.status(400).json({
                ok: false, 
                msg: 'El usuario no existe',
                token: null
            })
        }

        if (!bcrypt.compareSync(password, userDB.txPassword)) {
            return res.status(400).json({
              ok: false,
              msg: "Contraseña incorrecta.",
              token: null
            });
          }

        const token = await generarJWT(userDB._id);

        res.status(200).json({
            ok: true, 
            msg: 'Usuario logueado correctamente', 
            user: userDB,
            token
        });

    } catch(error) {

        res.status(500).json({
            ok: false, 
            msg: 'Error',
            token: null
        })
    }

}


const newToken = async (req = request, res = response ) => {
    try {

        const uid = req.uid;
        const token = await generarJWT(uid);
        const userDB = await UserModel.findById(uid);
        
        res.status(200).json({
            ok: true, 
            msg: 'Token actualizado correctamente', 
            user: userDB,
            token
        });

    } catch(err) {
        
        res.status(400).json({
            ok: false, 
            msg: 'Error al renovar el token', 
            user: null,
            token: null
        });
    
    }

}

module.exports = {
    registerUser,
    loginUser,
    newToken
}