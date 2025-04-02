const socket = require('socket.io');

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);

        // Join chat
        socket.on("joinChat", ({firstName ,userId, targetUserId }) => {
            const room = [userId, targetUserId].sort().join("-");
            console.log(`${firstName} joined room: ${room}`);
            socket.join(room);
            
        });

        // Handle sending messages
        socket.on("sendMessage", ({ firstName, userId, targetUserId, text}) => {
            const room = [userId, targetUserId].sort().join("-");
            //console.log(firstName + " " + text);
            
            io.to(room).emit("messageReceived", {firstName, text})
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
};

module.exports = initializeSocket;
