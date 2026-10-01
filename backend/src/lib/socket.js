import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

const io = new Server(server, { cors: { origin: [allowedOrigin] } });

// A user can be signed in from multiple tabs/devices at once. Keep each
// socket in the user's room so messages reach every active session.
const userSocketMap = new Map();

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
        socket.join(String(userId));
        const userSockets = userSocketMap.get(String(userId)) || new Set();
        userSockets.add(socket.id);
        userSocketMap.set(String(userId), userSockets);
    }

    // io.emit() sends event to everyone - broadcast
    io.emit("getOnlineUsers", [...userSocketMap.keys()]);

    // socket.on is used to listen for events
    socket.on("disconnect", () => {
        if (userId) {
            const userKey = String(userId);
            const userSockets = userSocketMap.get(userKey);
            userSockets?.delete(socket.id);
            if (userSockets?.size === 0) userSocketMap.delete(userKey);
        }
        io.emit("getOnlineUsers", [...userSocketMap.keys()]);
    });
});

export { app, server, io };
