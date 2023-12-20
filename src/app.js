// Dependencias
const express = require('express');
const app = express();
const path = require('path');
const methodOverride =  require('method-override');
const indexRouter = require('./routes/index.routes')


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method')); 

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));

// Constantes
const PUERTO = 3000;

// Levantando el servidor
app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}...`);
});

app.use('/', indexRouter);






