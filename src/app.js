import express from 'express';
const app = express();
import { resolve } from 'path';
import methodOverride from 'method-override';
import indexRouter from './routes/index.routes.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import userLoggedMiddleware from './middlewares/userLoggedMiddleware.js';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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
app.set('views', resolve(__dirname, './views'));

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

