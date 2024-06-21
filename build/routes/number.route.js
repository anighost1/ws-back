"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const number_controller_1 = require("../controllers/number.controller");
router.get('/', number_controller_1.number);
router.post('/', number_controller_1.createNumber);
router.put('/', number_controller_1.changeNumber);
router.delete('/', number_controller_1.deleteNumber);
exports.default = router;
