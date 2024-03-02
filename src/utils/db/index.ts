import mongoose from "mongoose";
import { DatabaseUtilsInterface } from "./type";

export class DatabaseUtils implements DatabaseUtilsInterface{

    async dbTransaction<T>( callback: (...args: any[]) => Promise<T> ){

        console.log("in transaction")
        const session = await mongoose.startSession();
        session.startTransaction();
    
        try {
    
            console.log("in transaction try block")
    
            const data = await callback();
    
            await session.commitTransaction();
    
            return data;
    
        }catch(e){
    
            session.abortTransaction();
    
            throw new Error("Transaction failed");
    
        }
        
    }

} 
