const express = require('express');

// crear servidor
const app = express();

// puerto de la app
const port = process.env.PORT || 4000;

// arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log('El servidor esta funcionando');
})