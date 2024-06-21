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
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const ws_1 = require("ws");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const pgClient = new pg_1.Client({
    connectionString: String(process.env.DATABASE_URL),
});
// PostgreSQL client for listening to notifications
const dbTrigger = (wss) => {
    pgClient.connect()
        .then(() => {
        console.log('Connected to PostgreSQL database');
        pgClient.query('LISTEN number_changes');
    })
        .catch(err => {
        console.error('Error connecting to PostgreSQL:', err);
    });
    // Listen for PostgreSQL notifications
    pgClient.on('notification', (msg) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Received notification:', msg.payload);
        // Notify all connected WebSocket clients about the change
        const numbers = yield prisma.number.findMany({
            select: {
                id: true,
                number: true,
            },
        });
        const totalCount = yield prisma.number.count();
        wss.clients.forEach((client) => {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(JSON.stringify({ data: numbers, totalCount: totalCount }));
            }
        });
    }));
};
exports.default = dbTrigger;
