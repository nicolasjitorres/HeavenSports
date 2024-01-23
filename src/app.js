// Dependencias
const express = require('express');
const app = express();
const path = require('path');
const methodOverride =  require('method-override');
const indexRouter = require('./routes/index.routes')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({ 
  secret: 'Shhh... un secreto!', 
  resave: true, 
  saveUninitialized: false}));
app.use(cookieParser('Hola, esto es un secreto...'));
app.use(userLoggedMiddleware);


app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));

// Constantes
const PUERTO = 3000;

// Levantando el servidor
app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}...`);
});

app.use('/', indexRouter);

// PAGINA EN CASO DE QUE LA RUTA NO EXISTA
app.use((req, res, next) => {
  res.status(404).render('info/error');
});






