import * as mongoose from "mongoose";

class  SchemaType  {
    schema: any
    constructor(){
        this.schema = {};
    }
    init(){
        const _schema = this.schema;
        this.schema = {}
        return _schema;
    }
    required(){
        this.schema.required = true;
        return this
    }
    string(){
        this.schema.type = String;
        return this;
    }
    number(){
        this.schema.type = Number;
        return this
    }
    boolean(){
        this.schema.type = Number;
        return this;
    }
    unique(){
        this.schema.unique = true;
        return this;
    }
    enum(...args: string[]){
        this.schema.type = String;
        this.schema.enum = args;
        return this;
    }
    default(value: any){
        this.schema.default = value;
        return this;
    }
    foriegnKey(payload: {belongsTo: string}){
        this.schema.type = mongoose.Schema.Types.ObjectId,
        this.schema.ref = payload.belongsTo;
        return this;
    }

}

const schemaType = new SchemaType();

export default schemaType;