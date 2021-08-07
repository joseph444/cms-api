const env = process.env.NODE_ENV || 'dev'
if (env === "dev"){
   require("dotenv").config()
}

export default {
    ...process.env
}