const express = require('express');
const connectDB = require('./config/db');

// crear servidor
const app = express();

// conectar la base de datos
connectDB();

// puerto de la app
const port = process.env.PORT || 4000;

// leer los valores del body
app.use(express.json());

// rutas de la app
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));

// arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log('El servidor esta funcionando');
})