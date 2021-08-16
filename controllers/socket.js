
const User = require('../models/user');
const Message = require('../models/message');

class Socket {

    changeStatus(uid, online){
        User.findByIdAndUpdate(uid, {blOnline: online}, {new: true}).then( userDB => {
            console.log(uid, online ? 'conectado' : 'desconectado');
        }).catch( userDB => {
            console.log('Error al actualizar el usuario', userDB);
        })
    }

    saveMessage( payload ){
        console.log('Guardando mensaje', payload);
        const message = new Message();
        message.idFrom = payload['de'];
        message.idTo = payload['para'];
        message.txMessage = payload['mensaje'];
        message.save().then(messageDB => {
            console.log('Usuario guardado correctamente');
        })
    }

}
module.exports = Socket;

