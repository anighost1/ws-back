import { Client as PgClient, Notification } from 'pg';
import { WebSocketServer, WebSocket } from 'ws';
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
// const pgClient = new PgClient({
//     connectionString: String(process.env.DATABASE_URL),
// });
const pgClient = new PgClient({
    user: 'postgres',
    host: 'localhost',
    database: 'wstest',
    password: '0000',
    port: 5432,
    ssl: false
});

// PostgreSQL client for listening to notifications
const dbTrigger = (wss: WebSocketServer) => {
    pgClient.connect()
        .then(() => {
            console.log('Connected to PostgreSQL database');
            pgClient.query('LISTEN number_changes');
        })
        .catch(err => {
            console.error('Error connecting to PostgreSQL:', err);
        });

    // Listen for PostgreSQL notifications
    pgClient.on('notification', async (msg: Notification) => {
        console.log('Received notification:', msg.payload);

        // Notify all connected WebSocket clients about the change
        const numbers = await prisma.number.findMany({
            select: {
                id: true,
                number: true,
            },
        });
        const totalCount = await prisma.number.count()

        wss.clients.forEach((client: WebSocket) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ data: numbers, totalCount: totalCount }));
            }
        });
    });

}

export default dbTrigger