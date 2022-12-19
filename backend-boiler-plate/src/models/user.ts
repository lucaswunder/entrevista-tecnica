import mongoose, { model, Schema } from 'mongoose'

interface IUser {
    _id?: string
    name: string
    email: string
    password: string
    dob?: Date
}

const schema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dob: Date,
})

const userModel = model<IUser>('User', schema) as mongoose.Model<IUser>

export default () => userModel
