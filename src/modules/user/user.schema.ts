import * as mongoose from 'mongoose';
import  schemaType from 'src/utils/schema';

export const UserSchema = new mongoose.Schema({
  email: schemaType.string().unique().init(),
  password: schemaType.string().required().init(),
  Accounts: [schemaType.foriegnKey({ belongsTo: 'Accounts' }).init()] // many to many relationship
});
