import * as yup from 'yup'

import { isValidObjectId } from 'mongoose'
const mongoIdErrorMsg = (field: string) =>
    `Field ${field} is not a valid objectId`

const mongooseId = yup
    .string()
    .test('databaseId', mongoIdErrorMsg('params.userId'), (value: any) => {
        if (!value) return true
        return isValidObjectId(value)
    })

const baseSchema = yup.object().shape({
    name: yup.string().required().min(3),
    email: yup.string().email().required().min(5),
    password: yup.string().required().min(6),
    dob: yup.date(),
})

export default {
    upsert: yup.object().shape({
        body: baseSchema,
    }),
    documentId: yup.object().shape({
        params: yup.object().shape({
            id: mongooseId,
        }),
    }),
    update: yup.object().shape({
        body: baseSchema,
        params: yup.object().shape({
            id: mongooseId,
        }),
    }),
}
