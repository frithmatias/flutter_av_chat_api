const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Envs
dotenv.config();


// DB Config 
// const { dbConnection } = require('./database/config');
// dbConnection();
// o bien 
require('./database/config').dbConnection();

// Express Server
const app = express();

// lectura del body COMO UN JSON
// POSTMAN > BODY > RAW > {"email":"prueba@prueba.com"} > JSON
app.use( express.json() ); 
// app.use( express.urlencoded() );

// ---------------------------------------------------------------------------
// NOTA ACERCA DE EXPRESS.JSON() EXPRESS.URLENCODED() Y EL PAQUETE BODY-PARSER

// 1) ¿Qué es el middleware? Son esos métodos/funciones/operaciones que se denominan ENTRE el procesamiento 
// de la Solicitud y el envío de la Respuesta en su método de aplicación.

// 2) Cuando se habla de express.json() y express.urlencoded() piense específicamente en POST peticiones 
// (es decir, el objeto de solicitud .post) y Solicitudes PUT (es decir, el objeto de solicitud .put )

// 3) NO NECESITA express.json() y express.urlencoded() para las solicitudes GET o DELETE.

// 4) NECESITAS express.json() y express.urlencoded() para POST y PUT solicitudes, porque en ambas solicitudes 
// estás enviando datos (en la forma de algún objeto de datos) al servidor y le está pidiendo al servidor 
// que acepte o almacene esos datos (objeto), que está encerrado en el cuerpo (es decir, req.body) de esa 
// solicitud (POST o PUT)

// 5) Express le proporciona middleware para tratar con los datos (objetos) (entrantes) en el cuerpo de la solicitud.

//  A. express.json() es un método incorporado en express para reconocer el objeto de solicitud entrante 
//  como objeto JSON. Este método se llama como middleware en su aplicación usando el código: 
//  app.use(express.json());

//  B. express.urlencoded() es un método incorporado en express para reconocer el objeto de solicitud entrante 
//  como cadenas o matrices. Este método se llama como middleware en su aplicación usando el código: 
//  app.use(express.urlencoded());

//  6) ALTERNATIVAMENTE, recomiendo usar body-parser (es un paquete NPM) para hacer lo mismo. 
//  Está desarrollado por los mismos píos que construyeron express y está diseñado para trabajar con express. 
//  body-parser solía ser parte de express. Piense en body-parser específicamente para POST Solicitudes 
//  (es decir, el objeto de solicitud .post) y/o Solicitudes PUT (es decir, el objeto de solicitud .put).

//  En body-parser puedes hacer

//  calling body-parser to handle the Request Object from POST requests
//      var bodyParser = require('body-parser');
//  parse application/json, basically parse incoming Request Object as a JSON Object 
//      app.use(bodyParser.json());
//  parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
//      app.use(bodyParser.urlencoded({ extended: false }));
//  combines the 2 above, then you can parse incoming Request Object if object, with nested objects, or generally any type.
//      app.use(bodyParser.urlencoded({ extended: true }));

// ---------------------------------------------------------------------------


// path pubico
const publicPath = path.resolve(__dirname, 'public'); // define mi path hacia /public
app.use(express.static(publicPath)); // monta mi servidor http en /public

// API Rutas 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/messages', require('./routes/messages'));



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
    console.log('Servidor corriendo en el puerto', process.env.PORT);
})