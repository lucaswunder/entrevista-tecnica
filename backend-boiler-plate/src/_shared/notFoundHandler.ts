import { Request, Response, NextFunction } from 'express'

export default async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response> => {
    return res.status(404).json({ messages: 'Resource not found' })
}
