import mongoose from "mongoose";

export default async function dbTransaction<T>( callback: (...args: any[]) => T ){

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const data = await callback();

        await session.commitTransaction();

        return data;

    }catch(e){

        session.abortTransaction();

        throw new Error("Transaction failed");

    }
    
}