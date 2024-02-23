import * as Joi from "joi";

export const singleAccountValidator = Joi.object({

    accountId:  Joi.string()
    .pattern(new RegExp(/^[a-f\d]{24}$/i)).required(),

    amount: Joi.number().min(1).required()

}).required() 

export const accountTransferValidator = Joi.object({
    fromAccountId: Joi.string()
    .pattern(new RegExp(/^[a-f\d]{24}$/i)).required(),

    toAccountId:Joi.string()
    .pattern(new RegExp(/^[a-f\d]{24}$/i)).required(),

    amount: Joi.number().min(1).required()

}).required()

export const accountIdValidator = Joi.object({

    accountId: Joi.string()
    .pattern(new RegExp(/^[a-f\d]{24}$/i)).required(),

}).required()

export const getAccountsValidator = Joi.object({

    page: Joi.number().min(1),

    perPage: Joi.number(),

}).required()

export const getTransactionsValidator = Joi.object({

    page: Joi.number().min(1),

    perPage: Joi.number(),

    accountId: Joi.string()
    .pattern(new RegExp(/^[a-f\d]{24}$/i)).required(),

}).required()