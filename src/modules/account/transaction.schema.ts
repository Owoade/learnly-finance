import mongoose from "mongoose";
import schemaType from "src/utils/schema";

export const TransactionSchema = new mongoose.Schema({

    fromAccount: schemaType.foriegnKey({ belongsTo: 'Accounts' }).required().init(),

    type: schemaType.enum("debit", "credit").required().init(),

    amount: schemaType.number().required().init(),

    toAccount: schemaType.foriegnKey({ belongsTo: 'Accounts' }).init(),

}, { timestamps: true })

