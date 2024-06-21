"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const client_1 = require("@prisma/client");
const dbtrigger_config_1 = __importDefault(require("./dbtrigger.config"));
const prisma = new client_1.PrismaClient();
const wss = new ws_1.WebSocketServer({ noServer: true });
// Function to send initial data to WebSocket client
function sendInitialData(ws) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const numbers = yield prisma.number.findMany({
                select: {
                    id: true,
                    number: true,
                },
            });
            const totalCount = yield prisma.number.count();
            ws.send(JSON.stringify({ data: numbers, totalCount: totalCount }));
        }
        catch (error) {
            console.error('Error fetching initial data:', error);
        }
    });
}
const webSocketConfig = (server) => {
    // Handle WebSocket connections
    server.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    });
    (0, dbtrigger_config_1.default)(wss);
    // WebSocket server logic
    wss.on('connection', (ws) => {
        console.log('Client connected');
        // Send initial data to the client
        sendInitialData(ws);
        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
};
exports.default = webSocketConfig;
