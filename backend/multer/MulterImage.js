const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './upload')
    },
    filename: function(req,file,cb){
        const unique = Date.now() + "-" + Math.random(Math.random() * 1E9)
        cb(null, file.fieldname + "-" + unique + path.extname(file.originalname))
    }
})

const uploads = multer({storage: storage, 
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const ext = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mime = fileTypes.test(file.mimetype);
        if (ext && mime) cb(null, true);
        else cb(new Error("Only JPEG, JPG, PNG images allowed"));
    }
})

const profileUpload = uploads.single('image')
const multipleUpload = uploads.array('images', 4)

module.exports = {
    profileUpload,
    multipleUpload
}