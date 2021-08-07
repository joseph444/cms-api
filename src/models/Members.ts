import { model, Schema, SchemaTypes } from "mongoose";
import { Members } from "../utils/interfaces";


const memberSchema = new Schema({
    email:{type:SchemaTypes.String,required:true},
    password:{type:SchemaTypes.String,required:true}
})

export default model<Members>("members",memberSchema);