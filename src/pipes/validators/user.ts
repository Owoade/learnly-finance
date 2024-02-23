import * as Joi from "joi";

export const UserAuthValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
}).required()
