import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

export default async (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response> => {
    const errMsg = err.toString() || 'Server error'

    return res.status(500).json({ message: errMsg })
}
