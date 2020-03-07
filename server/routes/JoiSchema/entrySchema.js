const Joi = require('joi');

const loginSchema = Joi.object({
    number: Joi.number().integer().min(0).required(),
    password: Joi.string().required(),
    rememberme: Joi.any(),
})

const codeSchema = Joi.object({
    number: Joi.number().integer().min(0).required(),
    code: Joi.number().integer().min(100000).max(1000000).required()
})

const registerSchema = Joi.object({
    number: Joi.number().integer().min(0).required(),
    fullName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(50).required(),
    // profilePic: Joi.any().required(),
    // profilePicFile: Joi.any().required()
})

const userProfileSchema = Joi.object({
    fullName: Joi.string().min(3).max(50),
    email: Joi.string().email(),
    status: Joi.string()
})


module.exports = {
    loginSchema,
    registerSchema,
    codeSchema,
    userProfileSchema
}


