import fs from "fs/promises"
import { Request, Response } from "express"
import models from "../models"
import env from "../utils/env"
import * as constants from "../utils/constants"
import { TempImages } from "../utils/interfaces"

/**
 * this function will provide and end point for uploading image temporaily in 
 * in the backend.
 * @param req is the request object we will recieve from the client
 * @param res is the response object we will be sending from server
 * @returns response object
 */
const uploadTempImage = async (req: Request, res: Response)=>{
    //console.log(req.file);
    let tmpFileData:TempImages = {
        path:req.file?.path ?? "",
        delete:false
    } 

    let tmpModel = new models.TempImageModel(tmpFileData)

    try {
        let savedData=await tmpModel.save()

        const id = savedData._id;
        

        return res.status(200).json({
            success:1,
            file:{
                url:`${env.URL}/api/tmp/get/${id}`
            },
            
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message:constants.DB_ERROR
        })
    }
    
}


/**
 * This function will help to get the temporarily uploaded image
 * @param req express request object
 * @param res express response object
 * @returns Promise
 */
const getTempImage = async (req: Request, res: Response) => {
    const tempId = req.params.id

    try{
        let tmpDoc =await models.TempImageModel.findById(tempId);
        //console.log(tmpDoc?.toObject());
        if(tmpDoc===undefined||tmpDoc===null){
            return res.status(404).json({
                message:constants.DB_NOT_FOUND
            })
        }
        
        return res.status(200).sendFile(tmpDoc.toObject().path)
        
    }catch(err){
        console.error(err);
        return res.status(500).json({
            message:constants.DB_ERROR
        })
        
    }
}

/**
 * This controller will be responsible for creating and deleting 
 * @param req 
 * @param res 
 * @returns Promise
 */
const deleteTempImage = async (req: Request, res: Response)=>{
    const tempId = req.params.id

    try{
        let tmpDoc = await models.TempImageModel.findById(tempId);
        if(tmpDoc===undefined||tmpDoc===null){
            return res.status(404).json({
                message: constants.DB_NOT_FOUND
            })
        }

        await tmpDoc.deleteOne();
        console.log(tmpDoc);
        
        let tmpImg:TempImages = {
            path:tmpDoc.toObject().path,
            delete:true
        };
        await fs.unlink(tmpDoc.path)

       
        
        return res.status(200);
    }catch(err){
        console.error(err);
        
        return res.status(500).json({
            message:constants.DB_ERROR
        })
    }
}


export default {
    uploadTempImage,
    getTempImage,
    deleteTempImage
}