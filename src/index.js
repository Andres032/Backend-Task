const express = require('express');
require('dotenv').config();
const cors = require('cors');
require('./database/connection')

// capture data body
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('welcome');
});

// route middlewares
app.use('/api/auth', require('./routes/auth'));
app.use('/api/task', require('./routes/task'));

// Server
app.listen(process.env.PORT, () => {
    console.log(`Server running success:${process.env.PORT}`)
});
