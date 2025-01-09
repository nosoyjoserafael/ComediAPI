import http from 'http'; // Crea un servidor HTTP básico
import app from '../app.js'; // Importa app

const server = http.createServer(app);

server.listen(3000);

server.on('listening', () => {
  console.log('Server is listening on port 3000'); // Imprime en consola para verificar que el servidor está corriendo
});