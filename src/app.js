// Dependencias
const express = require('express');
const app = express();
const path = require('path');
const mainRouter = require('./routes/main.routes')
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));

// Constantes
const PUERTO = 3000;

// Levantando el servidor
app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}...`);
});

app.use('/', mainRouter);






