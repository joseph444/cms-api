import {model, Schema, SchemaTypes} from "mongoose";
import { Comments } from "../utils/interfaces";

const commentSchema = new Schema<Comments>({
    name:{type:SchemaTypes.String,required:true},
    email:{type:SchemaTypes.String,required:true},
    comments:{type:SchemaTypes.String,required:true},
    createdAt:{type:SchemaTypes.Date,default:new Date()}
});

export default model<Comments>("comments",commentSchema);