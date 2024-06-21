import { Request, Response } from "express"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const number = async (req: Request, res: Response) => {
    try {
        const result = await prisma.number.findMany({
            select: {
                id: true,
                number: true
            }
        })
        const totalCount = await prisma.number.count()
        res.json({ data: result, totalCount: totalCount })
    } catch (err: any) {
        console.log(err)
        res.json({ error: true, message: err?.message })
    }
}

export const createNumber = async (req: Request, res: Response) => {
    const { number }: { number: number } = req.body || {}
    try {
        if (!number) {
            throw { error: true, message: 'number is required' }
        }
        const result = await prisma.number.create({
            data: {
                number: number
            },
            select: {
                id: true,
                number: true
            }
        })
        res.json(result)
    } catch (err: any) {
        console.log(err)
        res.json({ error: true, message: err?.message })
    }
}

export const changeNumber = async (req: Request, res: Response) => {
    const { id, number }: { id: string, number: number } = req.body || {}
    try {
        if (!number) {
            throw { error: true, message: 'number is required' }
        }
        if (!id) {
            throw { error: true, message: 'id is required' }
        }
        const result = await prisma.number.update({
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
        })
        res.json(result)
    } catch (err: any) {
        console.log(err)
        res.json({ error: true, message: err?.message })
    }
}

export const deleteNumber = async (req: Request, res: Response) => {
    const { id }: { id: string } = req.body || {}
    try {
        if (!id) {
            throw { error: true, message: 'id is required' }
        }
        const result = await prisma.number.delete({
            where: {
                id: id
            },
            select: {
                id: true,
                number: true
            }
        })
        res.json(result)
    } catch (err: any) {
        console.log(err)
        res.json({ error: true, message: err?.message })
    }
}