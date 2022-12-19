import { Document, Types } from 'mongoose'

interface IData {
    id: string
    throwOnNotFound?: boolean
}

interface IMenu extends Document {
    _id: Types.ObjectId
    name: string
    submenu: Types.ObjectId[]
}

interface IContext {
    modelsMenu: {
        findById: Function
        create: Function
        addSubmenu: Function
        delete: Function
        findOne: Function
        findByIdAndDelete: Function
    }
}

export default (ctx: IContext) => ({
    findById: async ({
        id,
        throwOnNotFound = false,
    }: IData): Promise<IMenu | null> => {
        const parent = await ctx.modelsMenu.findById(id)

        if (!parent && throwOnNotFound == true)
            throw new Error('Menu not found.')

        return parent
    },
    create: async (data: object): Promise<IMenu> => {
        return ctx.modelsMenu.create(data)
    },
    addSubmenu: async (relatedId: string, submenu: IMenu) => {
        const parent = await ctx.modelsMenu.findById(relatedId)

        parent?.submenu.push(submenu._id)

        await parent?.save()
    },
    delete: async (id: string): Promise<void> => {
        const parent = await ctx.modelsMenu.findOne({ submenu: { $in: id } })

        await parent?.updateOne({ $pull: { submenu: id } })

        await ctx.modelsMenu.findByIdAndDelete(id)
    },
})
