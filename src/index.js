const express = require('express');
require ('./database/connection')
require('dotenv').config();
const cors = require('cors');


// Crear el servidor de express
const app = express();

app.get('/', (req, res) => {
    res.send('welcome');
});


// CORS
app.use(cors())


// Lectura y parseo del body
app.use( express.json() );

// Rutas




// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});

