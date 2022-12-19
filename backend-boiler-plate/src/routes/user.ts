import express from 'express'

import validator from '../validation/validator'
import requestHandler from '../_shared/requestHandler'

import userSchema from '../schemas/user'

interface IContext {
    controllersUser: {
        create: Function
        delete: Function
        getOne: Function
        getAll: Function
        update: Function
    }
}

export default (ctx: IContext) => {
    const User = ctx.controllersUser
    const routes = express.Router()

    routes.post(
        '/',
        validator.validate(userSchema.upsert),
        requestHandler(User.create),
    )

    routes.get(
        '/:id',
        validator.validate(userSchema.documentId),
        requestHandler(User.getOne),
    )

    routes.get('/', requestHandler(User.getAll))

    routes.put(
        '/:id',
        validator.validate(userSchema.update),
        requestHandler(User.update),
    )

    routes.delete(
        '/:id',
        validator.validate(userSchema.documentId),
        requestHandler(User.delete),
    )

    return routes
}
