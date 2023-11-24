const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer();
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  // Escucha el evento 'enviarVotacion' desde el cliente
  socket.on('enviarVotacion', (data) => {
    // Maneja la votación recibida del cliente
    console.log('Votación recibida:', data);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

const PORT = 3000; // Puedes cambiar el puerto si es necesario
server.listen(PORT, () => {
  console.log(`Servidor de sockets escuchando en el puerto ${PORT}`);
});