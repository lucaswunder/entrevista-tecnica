import { describe, expect, test, beforeEach, it } from '@jest/globals'

import Controller from '../menu'

interface IController {
    create: Function
    get: Function
    delete: Function
}

interface IEntitie {
    create: Function
    findById: Function
    addSubmenu: Function
    delete: Function
}

describe('src :: controllers :: menu', () => {
    describe('', () => {
        let controller: IController, entitiesMenu: IEntitie

        beforeEach(() => {
            entitiesMenu = {
                findById: jest.fn(),
                create: jest.fn(),
                addSubmenu: jest.fn(),
                delete: jest.fn(),
            }

            controller = Controller({
                entitiesMenu,
            })
        })

        describe('create', () => {
            it('Should call create a new menu without a relatedId', async () => {
                const newMenu = { id: 'id' }

                entitiesMenu.create = jest.fn().mockResolvedValue(newMenu)

                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(data => data),
                }
                const req = { body: { name: 'eletronicos' } }

                const result = await controller.create(req, res)

                expect(result).toEqual({ id: newMenu.id })

                expect(entitiesMenu.create).toHaveBeenCalledTimes(1)
                expect(entitiesMenu.create).toHaveBeenCalledWith({
                    name: req.body.name,
                })

                expect(entitiesMenu.findById).not.toHaveBeenCalled()
                expect(entitiesMenu.addSubmenu).not.toHaveBeenCalled()
            })

            it('Should call create a new menu with a relatedId', async () => {
                const newMenu = { id: 'id' }

                entitiesMenu.create = jest.fn().mockResolvedValue(newMenu)

                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(data => data),
                }
                const req = {
                    body: { name: 'eletronicos', relatedId: 'relatedId' },
                }

                const result = await controller.create(req, res)

                expect(result).toEqual({ id: newMenu.id })

                expect(entitiesMenu.create).toHaveBeenCalledTimes(1)
                expect(entitiesMenu.create).toHaveBeenCalledWith({
                    name: req.body.name,
                })

                expect(entitiesMenu.findById).toHaveBeenCalledTimes(1)
                expect(entitiesMenu.findById).toHaveBeenCalledWith({
                    id: req.body.relatedId,
                    throwOnNotFound: true,
                })

                expect(entitiesMenu.addSubmenu).toHaveBeenCalledTimes(1)
                expect(entitiesMenu.addSubmenu).not.toHaveBeenCalledWith({
                    relatedId: req.body.relatedId,
                    submenu: newMenu,
                })
            })
        })

        describe('get', () => {
            it('Should call get', async () => {
                const findedMenu = {
                    id: '639fa9a3d4415c7c54accbd1',
                    name: 'Eletrodomésticos2',
                    submenu: [],
                }
                const newMenu = {
                    toJSON: () => findedMenu,
                }

                entitiesMenu.findById = jest.fn().mockResolvedValue(newMenu)

                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(data => data),
                }

                const req = { params: { id: 'someId' } }

                const result = await controller.get(req, res)

                expect(result).toEqual({ ...findedMenu })

                expect(entitiesMenu.findById).toHaveBeenCalledTimes(1)
                expect(entitiesMenu.findById).toHaveBeenCalledWith({
                    id: req.params.id,
                    throwOnNotFound: true,
                })
            })
        })

        describe('delete', () => {
            it('Should call delete', async () => {
                entitiesMenu.findById = jest.fn()
                entitiesMenu.delete = jest.fn()

                const res = {
                    status: jest.fn().mockReturnThis(),
                    end: jest.fn(),
                }

                const req = { params: { id: 'someId' } }

                const result = await controller.delete(req, res)

                expect(result).toBeUndefined()

                expect(entitiesMenu.findById).toHaveBeenCalledTimes(1)
                expect(entitiesMenu.findById).toHaveBeenCalledWith({
                    id: req.params.id,
                    throwOnNotFound: true,
                })
                expect(entitiesMenu.delete).toHaveBeenCalledTimes(1)
                expect(entitiesMenu.delete).toHaveBeenCalledWith(req.params.id)
            })
        })
    })
})
