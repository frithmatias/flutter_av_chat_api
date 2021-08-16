const mongoose = require('mongoose');

const dbConnection = async () => {
    // voy a trabajar de manera asincrona con async-await 
    try {

        let resp = mongoose.connect(process.env.DB_CONN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true ,
            useFindAndModify: false 
        })
        
        console.log('Conectado con Mongo Atlas');


    } catch (error) {
        throw new Error('Error en la base de datos - Hable con el admin');
    }
}

module.exports = {
    dbConnection
}