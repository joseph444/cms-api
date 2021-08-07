import http from "http"
import express, {Express} from "express"
import morgan from "morgan";
import ENV from "./utils/env"
import routes from "./routes"
import {connect} from "mongoose";
import cors from "cors";
import fs from "fs"
const router:Express = express()

connect(`${ENV.DB_LINK}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("Database connected....");
    
}).catch(err=>{
    console.error(err);
    console.log("exiting");
    process.exit(-1)
})

if(!fs.existsSync(`${process.cwd()}/tmp`)){
    fs.mkdirSync(`${process.cwd()}/tmp`)
}


router.use(morgan('dev'))
router.use(cors());
router.use(express.urlencoded({extended:false}))
router.use(express.json())



const API_PATH = `/api/v${ENV.API_VERSION}`

router.use(`${API_PATH}/tmp/`,routes.tempImageUploadRoute)

router.use((req,res,next)=>{
    const error = new Error('not found')
    return res.status(404).json({
        message:error.message
    })
})

const httpServer = http.createServer(router)
const port = ENV.PORT || 8080
httpServer.listen(port,()=>console.log(`The server is running on port ${port}`))
