const { io } = require('../index');

io.on('connection', client => {
    console.log('Cliente conectado.');
    client.on('event', data => { /* … */ });
    client.on('disconnect', () => {
        console.log('Cliente desconectado.');
    });
    // ESCUCHA
    client.on('mensaje', ( payload ) => {
        console.log('Mensaje del cliente:', payload);
        // EMITE BROADCAST
        io.emit('mensaje', {admin: 'Nuevo cliente conectado', id: client.id});
    })
});
