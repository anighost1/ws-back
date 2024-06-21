import express, { Request, Response } from 'express'
import webSocketConfig from './config/websocket.config'

const app = express()
const port = process.env.PORT || 4032

import numberRouter from './routes/number.route'
require('dotenv').config();


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'WS test'
    })
})

app.use('/api/number', numberRouter)

const server = app.listen(port, () => {
    console.log(`WS app is listening on port ${port} `)
})

webSocketConfig(server)