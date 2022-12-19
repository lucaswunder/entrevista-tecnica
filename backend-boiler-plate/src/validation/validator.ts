import * as yup from 'yup'
import { Request, Response, NextFunction } from 'express'

export default {
    validate:
        (schema: yup.AnySchema) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await schema.validate(req, { abortEarly: false })
                return next()
            } catch (err) {
                const { errors } = err as yup.ValidationError
                return res.status(400).json({ messages: errors })
            }
        },
}
