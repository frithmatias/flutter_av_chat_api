const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Express Server
const app = express();

// Envs
dotenv.config();

// path pubico
const publicPath = path.resolve(__dirname, 'public'); // define mi path hacia /public
app.use(express.static(publicPath)); // monta mi servidor http en /public

// Socket.io Server 
// este paquete http de node es el MISMO que utiliza express para su instancia http , por lo tanto 
// son compatibles y puedo enviarle mi instancia de servidor express para configurar 
// mi instancia de servidor http como -> createServer(app)
const server = require('http').createServer(app); // <- "inyecto" mi app de express para configurar mi server http
module.exports.io = require('socket.io')(server); // <- "inyecto" el server http
require('./sockets/socket');


//app.listen( process.env.PORT ,(err)=> {
server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Servidor corriendo en el puerto', 3000);
})