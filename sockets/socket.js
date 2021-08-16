const { io } = require('../index');



const BandsController = require('../controllers/bands.js');
const bandsController = new BandsController();
const SocketController = require('../controllers/socket.js');
const socketController = new SocketController();



const { checkToken } = require("../helpers/jwt");

// bandsController.addBand('Iron Maiden');
// bandsController.addBand('Stratovarius');
// bandsController.addBand('Helloween');
// bandsController.addBand('Sonata Arctica');

console.log('Inicializando servidor de sockets...');

io.on('connection', async client => {

    console.log('Cliente conectado.');

    // 1. EN LA CONEXIÓN DEL CLIENTE RECIBO EL TOKEN EN LOS HEADERS PARA VALIDAR LA CONEXION
    // HANDSHAKE significa darse las manos, es decir lo primero que se negocia con el cliente 

    const { uid } = await checkToken(client.handshake.headers['x-token'])
        .catch(() => {
            console.log('El token no es válido');
            return client.disconnect();
        })

    // resp: { uid: '6111282e0c219608906d4c09', iat: 1628518348, exp: 1628604748 }
    console.log('Token válido');
    socketController.changeStatus(uid, true);

    // ingreso al cliente a una sala de chat con su id de mongo para e
    client.join(uid);

    client.on('disconnect', () => {
        console.log('Cliente desconectado.');
        socketController.changeStatus(uid, false);
    });


    client.emit('bands-list', bandsController.getBands());
    // ESCUCHA
    // io.emit() -> emite a todos 
    // client.broadcast.emit() -> emite a todos menos a quien lo envía 

    client.on('mensaje-privado', async (payload) => {
        console.log('Mensaje del cliente:', payload);
        await socketController.saveMessage(payload);
        // io.emit('mensaje', payload);
        io.to(payload.para).emit('mensaje-privado', payload);
    });



    client.on('mensaje', (payload) => {
        console.log('Mensaje del cliente:', payload);
        io.emit('mensaje', payload);
    });

    client.on('vote-band', (idBand) => {
        console.log('votando', idBand);
        bandsController.voteBand(idBand);
        io.emit('bands-list', bandsController.getBands()); // envío a TODOS la lista actualizada
    })

    client.on('add-band', (txBand) => {
        bandsController.addBand(txBand, 0);
        io.emit('bands-list', bandsController.getBands()); // envío a TODOS la lista actualizada
    })

    client.on('delete-band', (idBand) => {
        bandsController.deleteBand(idBand);
        io.emit('bands-list', bandsController.getBands()); // envío a TODOS la lista actualizada
    })
});
