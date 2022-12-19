import { Request, Response } from 'express'

export default (ctrlFn: Function) =>
    async (req: Request, res: Response): Promise<Response> => {
        try {
            return await ctrlFn(req, res)
        } catch (err: any) {
            return res.status(400).json({
                messages:
                    err.message || 'Something went wrong with the request.',
            })
        }
    }
