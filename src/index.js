import { initializeModels } from './helpers/database_initialization.js';
import { sequelize } from '../config/database.js';
import { config } from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './api.js';
import net from 'net';
import fs from 'fs';
import { handleMessage } from './helpers/messageHandler.js';
import { getUserIdFromToken } from './helpers/auth.helper.js';
import { connectedSockets } from './websocket.js';
config();

const server = createServer(app);

// WebSocket server for the HTML page
const io = new Server(server);

io.on('connection', async (socket) => {
    console.log('WebSocket client connected.');
    
    const userId = await getUserIdFromToken(socket.handshake.headers.cookie.split('=')[1]);
    connectedSockets[userId] = socket;

    // Handle messages from HTML page
    socket.on('message', async (message) => {
        await handleMessage(message, connectedSockets);
    });

    // Handle WebSocket disconnect
    socket.on('disconnect', () => {
        console.log('WebSocket client disconnected.');
    });
});


// Initialize database and models
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
        await initializeModels(sequelize);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

// Serve HTML page
app.get('/', (req, res) => {
    const htmlContent = fs.readFileSync('./src/client/login.html', 'utf-8');
    res.send(htmlContent);
});

app.get('/home', (req, res) => {
  const htmlContent = fs.readFileSync('./src/client/index.html', 'utf-8');
  res.send(htmlContent);
});

app.get('/signup', (req, res) => {
  const htmlContent = fs.readFileSync('./src/client/signup.html', 'utf-8');
  res.send(htmlContent);
});

// Start the combined HTTP and WebSocket server
const HTTP_PORT = process.env.PORT || 3000;
server.listen(HTTP_PORT, () => {
    console.log(`Server is running on port ${HTTP_PORT}`);
});
