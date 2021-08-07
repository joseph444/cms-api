import {model, Schema,SchemaTypes} from "mongoose";
import { Posts } from "../utils/interfaces";

const postSchema = new Schema<Posts>({
    slug:{type:SchemaTypes.String,required:true,unique:true,lowerCase:true},
    body:{type:SchemaTypes.String,required:true},
    active:{type:SchemaTypes.Boolean,default:false},
    createdAt:{type:SchemaTypes.Date,default:new Date()}
})

export default model<Posts>("posts",postSchema);