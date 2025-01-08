import http from 'http'; // Crea un servidor HTTP básico
import app from '../app.js'; // Importa app

const port = 3000;

const server = http.createServer(app);

server.listen(port);

server.on('listening', () => {
  console.log(`http://localhost:${port}`); // Imprime en consola para verificar que el servidor está corriendo
});