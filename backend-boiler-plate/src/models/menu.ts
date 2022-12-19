import mongoose from 'mongoose'

interface IMenu extends Document {
    _id?: mongoose.Types.ObjectId
    name: string
    submenu: mongoose.Types.ObjectId[]
}

const menuSchema = new mongoose.Schema<IMenu>({
    name: { type: String, required: true },
    submenu: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Menu',
            autopopulate: { maxDepth: 10 },
        },
    ],
})

menuSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    aliases: true,
    transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
    },
    useProjection: true,
})

menuSchema.plugin(require('mongoose-autopopulate'))

const menuModel = mongoose.model<IMenu>(
    'Menu',
    menuSchema,
) as mongoose.Model<IMenu>

export default () => menuModel
