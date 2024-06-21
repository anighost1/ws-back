import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";
import { PrismaClient } from "@prisma/client";
import dbTrigger from "./dbtrigger.config";

const prisma = new PrismaClient()
const wss = new WebSocketServer({ noServer: true });

// Function to send initial data to WebSocket client
async function sendInitialData(ws: WebSocket) {
    try {
        const numbers = await prisma.number.findMany({
            select: {
                id: true,
                number: true,
            },
        });
        const totalCount = await prisma.number.count()

        ws.send(JSON.stringify({ data: numbers, totalCount: totalCount }));
    } catch (error) {
        console.error('Error fetching initial data:', error);
    }
}

const webSocketConfig = (server: Server) => {
    // Handle WebSocket connections
    server.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (ws: WebSocket) => {
            wss.emit('connection', ws, request);
        });
    });

    dbTrigger(wss);

    // WebSocket server logic
    wss.on('connection', (ws: WebSocket) => {
        console.log('Client connected');

        // Send initial data to the client
        sendInitialData(ws);

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });

}

export default webSocketConfig