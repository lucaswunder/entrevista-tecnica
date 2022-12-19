import { Request, Response } from 'express'

interface IContext {
    entitiesMenu: {
        findById: Function
        create: Function
        addSubmenu: Function
        delete: Function
    }
}

export default (ctx: IContext) => ({
    create: async (req: Request, res: Response): Promise<Response> => {
        const { name, relatedId } = req.body

        if (relatedId) {
            await ctx.entitiesMenu.findById({
                id: relatedId,
                throwOnNotFound: true,
            })

            const submenu = await ctx.entitiesMenu.create({ name })

            await ctx.entitiesMenu.addSubmenu(relatedId, submenu)

            return res.status(201).json({
                id: submenu.id,
            })
        }

        const menu = await ctx.entitiesMenu.create({ name })

        return res.status(201).json({
            id: menu.id,
        })
    },
    get: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params

        const menu = await ctx.entitiesMenu.findById({
            id,
            throwOnNotFound: true,
        })

        return res.status(200).json({
            ...menu.toJSON(),
        })
    },
    delete: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params

        await ctx.entitiesMenu.findById({ id, throwOnNotFound: true })

        await ctx.entitiesMenu.delete(id)

        return res.status(200).end()
    },
})
