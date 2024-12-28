import express from 'express';
import morgan from 'morgan'; //middleware de registro de solicitudes HTTP
import jokesRoutes from './routes/jokes.routes.js';
import mongoose from 'mongoose';

const app = express();

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/jokes',)
.then(() => {
    console.log('Conectado a la base de datos');
}).catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
});

// Middlewares
app.use(express.json()); // middleware para analizar solicitudes con formato JSON
app.use(express.urlencoded({ extended: true })); // middleware para analizar solicitudes con formato application/x-www-form-urlencoded
app.use(morgan('dev')); // middleware de registro de solicitudes HTTP

app.use('/api', jokesRoutes); // middleware para enrutar las solicitudes a la api

app.get('/',(req,res)=>{ // ruta de bienvenida
    res.send('Hello World!');
})

export default app;