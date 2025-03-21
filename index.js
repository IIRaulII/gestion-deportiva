// Cargar variables de entorno
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const apiRoutes = require('./src/api/routes');
const errorHandler = require('./src/middlewares/error.middleware');


// Conectar a la base de datos
connectDB();

// Inicializar express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logging en desarrollo
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rutas
app.use('/api', apiRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API de Gestión Deportiva',
    author: 'Raúl Montoya',
    version: '1.0.0',
  });
});

// Middleware para errores
app.use(errorHandler);

// Puerto
const PORT = process.env.PORT || 9090;
const HOST = 'localhost';

// Iniciar servidor
app.listen(PORT, HOST, () => {
  console.log(`Servidor ejecutándose en modo ${process.env.NODE_ENV} en puerto ${PORT}`);
  console.log(`Accede a la API en http://${HOST}:${PORT}`);
});

// Manejar errores no capturados
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
}); 