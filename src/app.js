// Importando dependencias
import express from 'express';
const app = express();
import path from 'path';
import methodOverride from 'method-override';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';

// Importando rutas
import indexRouter from './index/index-routes.js';
import userLoggedMiddleware from './middlewares/userLoggedMiddleware.js';
import { errorHandler } from './middlewares/errorHandler.js';

// Definiendo rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Definición de middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({ 
  secret: process.env.SESSION_SECRET, 
  resave: false, 
  saveUninitialized: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(userLoggedMiddleware);
app.use('/', indexRouter);

// Definición del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));

// Servidor escuchando en el puerto 3000
app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}...`);
});

// Manejo de errores
app.use(errorHandler);

// Manejo de rutas no definidas
app.use((req, res) => {
  res.status(404).render('info/error');
});