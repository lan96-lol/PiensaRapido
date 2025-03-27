const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("Un jugador se ha conectado");

    // Escuchar cuando un jugador envía una respuesta
    socket.on("respuesta", (datos) => {
        console.log(`Jugador ${datos.jugador} respondió: ${datos.respuesta}`);
        io.emit("nuevaRespuesta", datos); // Enviar la respuesta a todos los jugadores
    });

    socket.on("disconnect", () => {
        console.log("Un jugador se ha desconectado");
    });
});

server.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
