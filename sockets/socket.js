const { io } = require('../index');
const Bands = require('../controllers/bands.js');
const Band = require('../models/band');
const bands = new Bands();

bands.addBand( 'Iron Maiden', 5);
bands.addBand( 'Stratovarius');
bands.addBand( 'Helloween');
bands.addBand( 'Sonata Arctica');

console.log(bands);

console.log('Inicializando servidor de sockets...');

io.on('connection', client => {

    client.emit('bands-list', bands.getBands());
    console.log('Cliente conectado.');
    client.on('event', data => { /* … */ });
    client.on('disconnect', () => {
        console.log('Cliente desconectado.');
    });

    // ESCUCHA
    // io.emit() -> emite a todos 
    // client.broadcast.emit() -> emite a todos menos a quien lo envía 
    client.on('mensaje', (payload) => {
        console.log('Mensaje del cliente:', payload);
        io.emit('mensaje', payload);
    });

    client.on('vote-band', (idBand) => {
        bands.voteBand(idBand);
        io.emit('bands-list', bands.getBands()); // envío a TODOS la lista actualizada
    })

    client.on('add-band', (txBand) => {
        bands.addBand(txBand, 0);
        io.emit('bands-list', bands.getBands()); // envío a TODOS la lista actualizada
    })

    client.on('delete-band', (idBand) => {
        bands.deleteBand(idBand);
        io.emit('bands-list', bands.getBands()); // envío a TODOS la lista actualizada
    })
});
