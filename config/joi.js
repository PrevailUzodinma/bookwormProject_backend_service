const joi = require ("joi")
export const userJoiSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
})
export const userLoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})