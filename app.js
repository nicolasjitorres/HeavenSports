// Dependencias
const express = require('express');
const app = express();
const path = require('path');
app.use(express.static('public'));

// Constantes
const PUERTO = 3000;

// Levantando el servidor
app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}...`);
});

// Ruta hacia home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/home.html'));
});

// Ruta hacia registro
app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, './views/registro.html'));
});