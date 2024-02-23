import mongoose from "mongoose";
import schemaType from "src/utils/schema";

export const AccountSchema = new mongoose.Schema({

    User: schemaType.foriegnKey({ belongsTo: 'Users' }).required().init(),

    balance: schemaType.number().default(0).init(),

    Transactions: [schemaType.foriegnKey({ belongsTo: 'Transactions' }).init()] // many to many relationship

},{ timestamps: true })