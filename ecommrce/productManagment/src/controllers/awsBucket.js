
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3')

AWS.config.update({
    accessKeyId: "AKIA2VQCREO4NBWV2455",
    secretAccessKey: "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",
    region: "ap-northeast-1"
})

const s3 = new AWS.S3();
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
    }
}

var upload = multer({
    storage: multerS3({
        fileFilter,
        s3: s3,
        bucket: "devdutta",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: 'abhi_meta_data' });
        },
        key: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
})

module.exports = upload;