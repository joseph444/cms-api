import express from "express"
import {v1 as uuid} from "uuid"
import path from "path"
import controller from "../controller"
import middlewares from "../middlewares"
import { uniqueId } from "lodash"
const router = express.Router()

const tempUploadFolderPath = path.normalize(`${process.cwd()}/tmp`,) //path to tmp/ in root
const fileUplaodMW = middlewares.FileUploadMiddleware(tempUploadFolderPath,`tmp_${uniqueId().toLowerCase()}_`)

/**
 * @path /api/{version}/tmp/upload
 */
router.post('/upload',fileUplaodMW.single('image'),controller.uploadTempImage)

/**
 * @path /api/{version}/tmp/get/:id
 */
router.get('/get/:id',controller.getTempImage)

/**
 * @path /api/{version}/tmp/delete/:id
 */
router.delete('/delete/:id',controller.deleteTempImage)
export default router