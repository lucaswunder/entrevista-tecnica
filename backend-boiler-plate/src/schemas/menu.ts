import * as yup from 'yup'
import { isValidObjectId } from 'mongoose'

const mongoIdErrorMsg = (field: string) =>
    `Field ${field} is not a valid objectId`

const mongooseId = yup
    .string()
    .test('databaseId', mongoIdErrorMsg('relatedId'), (value: any) => {
        if (!value) return true
        return isValidObjectId(value)
    })

export default {
    create: yup.object().shape({
        body: yup.object().shape({
            name: yup.string().min(3).required(),
            relatedId: mongooseId,
        }),
    }),
    documentId: yup.object().shape({
        params: yup.object().shape({
            id: mongooseId,
        }),
    }),
}
