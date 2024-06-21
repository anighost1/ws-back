"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const websocket_config_1 = __importDefault(require("./config/websocket.config"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4032;
const number_route_1 = __importDefault(require("./routes/number.route"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({
        message: 'WS test'
    });
});
app.use('/api/number', number_route_1.default);
const server = app.listen(port, () => {
    console.log(`WS app is listening on port ${port} `);
});
(0, websocket_config_1.default)(server);
