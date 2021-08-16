const { response } = require('express');
const MessageModel = require('../models/message');

const getMessages = (req, res = response) => {
    // localhost:3000/api/messages?desde=0 <-
    // const desde = Number(req.query.desde) || 0;
    console.log(req.uid);
    console.log(req.params.idTo);

    MessageModel.find({ 
    $or: [{idFrom: req.uid, idTo: req.params.idTo}, {idFrom: req.params.idTo, idTo: req.uid}]
    //    $and: [ 
    //        { idFrom: { $in: [req.uid, req.body.uid]}},
    //        { idTo: { $in: [req.uid, req.body.uid]}},
    //    ] 
    }) // todos los usuarios menos el mío
        // .sort('-createdAt') // '-' ordena en forma descendente
        .sort({createdAt: 'asc'}) // también funciona
        // .skip(desde)
        // .limit(5)
        .then(messagesDB => {
            console.log(messagesDB);
            res.status(200).json({
                ok: true,
                msg: 'Mensajes obtenidos correctamente',
                messages: messagesDB
            })
        }).catch(() => {
            res.status(500).json({
                ok: false,
                msg: 'Error al obtener los mesnajes',
                messages: null
            })
        })
}

module.exports = {
    getMessages
}