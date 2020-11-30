const express = require('express');
const connectDB = require('./config/db');

// crear servidor
const app = express();

// conectar la base de datos
connectDB();

// puerto de la app
const port = process.env.PORT || 4000;

// rutas de la app
app.use('/api/usuarios', require('./routes/usuarios'));

// arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log('El servidor esta funcionando');
})