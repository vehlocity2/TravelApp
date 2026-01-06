const Cloudinary = require('cloudinary').v2

Cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

const uploadToCloudinary = (buffer) =>{
    return new Promise((resolve, reject)=>{
        Cloudinary.uploader.upload_stream(
            {folder: 'travel-app'},
            (error, result)=>{
                if(error){
                    reject(error)
                }else{
                    resolve(result.secure_url)
                }
            }).end(buffer)
    })
}
module.exports = { uploadToCloudinary }