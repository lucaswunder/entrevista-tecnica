import path from 'path'
import * as awilix from 'awilix'

// import MenuModel from './models/menu'
// import entitiesMenu from './entities/menu'
// import MenuController from './controllers/menu'
// import MenuRouter from './routes/menu'

import { AwilixContainer } from 'awilix'

const container: AwilixContainer = awilix.createContainer()

container.register({
    // menuModel: awilix.asValue(MenuModel),
    // entitiesMenu: awilix.asFunction(entitiesMenu),
    // menuController: awilix.asFunction(MenuController),
    // menuRouter: awilix.asFunction(MenuRouter),
})

const domainModules = [
    './src/controllers/*.ts',
    './src/models/*.ts',
    './src/entities/*.ts',
    './src/routes/*.ts',
]

container.loadModules(domainModules, {
    formatName: (name, descriptor) => {
        const splat = descriptor.path.split(path.sep)
        const namespace = splat[splat.length - 2]
        return namespace + name.charAt(0).toUpperCase() + name.slice(1)
    },
    resolverOptions: {
        injectionMode: awilix.InjectionMode.PROXY,
        lifetime: 'SINGLETON',
    },
})

// console.log(container.registrations)

// container.register({
//   menuModel: awilix.asValue(MenuModel),
//   entitiesMenu: awilix.asFunction(entitiesMenu),
//   menuController: awilix.asFunction(MenuController),
//   menuRouter: awilix.asFunction(MenuRouter),
// })

export default container
