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
exports.deleteNumber = exports.changeNumber = exports.createNumber = exports.number = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const number = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.number.findMany({
            select: {
                id: true,
                number: true
            }
        });
        const totalCount = yield prisma.number.count();
        res.json({ data: result, totalCount: totalCount });
    }
    catch (err) {
        console.log(err);
        res.json({ error: true, message: err === null || err === void 0 ? void 0 : err.message });
    }
});
exports.number = number;
const createNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { number } = req.body || {};
    try {
        if (!number) {
            throw { error: true, message: 'number is required' };
        }
        const result = yield prisma.number.create({
            data: {
                number: number
            },
            select: {
                id: true,
                number: true
            }
        });
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.json({ error: true, message: err === null || err === void 0 ? void 0 : err.message });
    }
});
exports.createNumber = createNumber;
const changeNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, number } = req.body || {};
    try {
        if (!number) {
            throw { error: true, message: 'number is required' };
        }
        if (!id) {
            throw { error: true, message: 'id is required' };
        }
        const result = yield prisma.number.update({
            where: {
                id: id
            },
            data: {
                number: number
            },
            select: {
                id: true,
                number: true
            }
        });
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.json({ error: true, message: err === null || err === void 0 ? void 0 : err.message });
    }
});
exports.changeNumber = changeNumber;
const deleteNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body || {};
    try {
        if (!id) {
            throw { error: true, message: 'id is required' };
        }
        const result = yield prisma.number.delete({
            where: {
                id: id
            },
            select: {
                id: true,
                number: true
            }
        });
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.json({ error: true, message: err === null || err === void 0 ? void 0 : err.message });
    }
});
exports.deleteNumber = deleteNumber;
