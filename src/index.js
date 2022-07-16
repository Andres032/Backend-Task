const express = require('express');
require('dotenv').config();
require('./database/connection')

// capture data body
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('welcome');
});

// route middlewares

// Server
app.listen(process.env.PORT, () => {
    console.log(`Server running success:${process.env.PORT}`)
});
