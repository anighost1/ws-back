import express from "express";
const router = express.Router()

import {
    number,
    createNumber,
    changeNumber,
    deleteNumber
} from "../controllers/number.controller";


router.get('/', number)
router.post('/', createNumber)
router.put('/', changeNumber)
router.delete('/', deleteNumber)


export default router