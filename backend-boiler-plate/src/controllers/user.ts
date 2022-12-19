import { Request, Response } from 'express'

interface IContext {
    modelsUser: {
        findOne: Function
        find: Function
        create: Function
        deleteOne: Function
        updateOne: Function
    }
}

export default (ctx: IContext) => ({
    create: async (req: Request, res: Response): Promise<Response> => {
        const { id } = await ctx.modelsUser.create(req.body)

        return res.json({ id }).status(201)
    },
    getOne: async (req: Request, res: Response): Promise<Response> => {
        const user = await ctx.modelsUser.findOne({ _id: req.params.id })

        return res.json(user)
    },
    getAll: async (_: Request, res: Response): Promise<Response> => {
        const user = await ctx.modelsUser.find()

        return res.json(user)
    },
    update: async (req: Request, res: Response): Promise<Response> => {
        const user = await ctx.modelsUser.findOne({ _id: req.params.id })
        if (!user || !user?.id)
            return res.status(400).json({ message: 'User not found' })

        await ctx.modelsUser.updateOne({ id: user.id }, req.body)
        return res.json({
            id: user.id,
        })
    },
    delete: async (req: Request, res: Response): Promise<Response> => {
        const user = await ctx.modelsUser.findOne({ _id: req.params.id })
        if (!user || !user?.id)
            return res.status(400).json({ message: 'User not found' })

        await ctx.modelsUser.deleteOne({ id: user.id })
        return res.json({
            id: user.id,
        })
    },
})
