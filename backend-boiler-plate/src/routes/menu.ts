import express from 'express'

import validator from '../validation/validator'
import requestHandler from '../_shared/requestHandler'

import menuSchemas from '../schemas/menu'

interface IContext {
    controllersMenu: {
        create: Function
        get: Function
        delete: Function
    }
}

export default (ctx: IContext) => {
    const Menu = ctx.controllersMenu

    const routes = express.Router()

    routes.post(
        '/',
        validator.validate(menuSchemas.create),
        requestHandler(Menu.create),
    )

    routes.post(
        '/',
        validator.validate(menuSchemas.create),
        requestHandler(Menu.create),
    )
    routes.get(
        '/:id',
        validator.validate(menuSchemas.documentId),
        requestHandler(Menu.get),
    )
    routes.delete(
        '/:id',
        validator.validate(menuSchemas.documentId),
        requestHandler(Menu.delete),
    )

    return routes
}
