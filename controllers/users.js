const { response } = require('express');
const UserModel = require('../models/user');

const getUsuarios = (req, res = response) => {
    console.log('Obteniendo usuarios solicitado por ', req.uid);
    // localhost:3000/api/users?desde=0 <-
    const desde = Number(req.query.desde) || 0;
    UserModel.find({ _id: { $ne: req.uid } }) // todos los usuarios menos el mío
        .sort('-blOnline') // '-' ordena en forma descendente
        .skip(desde)
        .limit(5)
        .then(usersDB => {
            res.status(200).json({
                ok: true,
                msg: 'Usuarios obtenidos correctamente',
                users: usersDB
            })
        }).catch(() => {
            res.status(500).json({
                ok: false,
                msg: 'Error al obtener los usuarios',
                users: null
            })
        })
}

module.exports = {
    getUsuarios
}