import multer from "multer"

/**
 * This function will create a middleware such that all the 
 * whenever a file is uploaded it will store the file
 * to the specifed directory.
 * @param folderName the path for the upload
 * @param pre in case a filename has some prescript.
 * @returns multer middleware
 */
const createFileUploadMiddleware = (folderName:string,pre:string|null=null):multer.Multer=>{
    
    const storage = multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null,folderName)
        },
        filename:(req,file,cb)=>{
            const id = `${new Date().getTime()}`
            let filename = (pre||'')+id+file.originalname
            cb(null,filename)
        }
    });

    return multer({
        storage:storage,
        limits:{fileSize:10000000}
    })
}

export default createFileUploadMiddleware