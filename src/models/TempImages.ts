import {model, Schema, SchemaTypes} from "mongoose";
import { TempImages } from "../utils/interfaces";

const tempImagesSchema = new Schema<TempImages>({
    path:{type:SchemaTypes.String,required:true},
    delete:{type:SchemaTypes.Boolean,default:false}
})

export default model<TempImages>("tempImages",tempImagesSchema);
