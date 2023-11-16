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

// Ruta hacía index (ex home)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/index.html'));
});

// Ruta hacía el detalle del producto
app.get('/productDetail', (req, res) => {
  res.sendFile(path.join(__dirname, '.views\productDetail.html'));
});

// Ruta hacía el carrito de compras
app.get('/productCart', (req, res) => {
  res.sendFile(path.join(__dirname, './views/productCart.html'));
});

// Ruta hacía el registro
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, './views/register.html'));
});

// Ruta hacía el login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, './views/login.html'));
});


// Ruta hacía index (ex home)
app.post('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/index.html'));
});