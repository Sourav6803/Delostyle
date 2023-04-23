const aws = require("aws-sdk")

aws.config.update({
    accessKeyId: "AKIA2VQCREO4NBWV2455",
    secretAccessKey: "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",
    region: "ap-northeast-1"
})

// secretAccessKey : CJ2tzMSE73ZXKhVJc32hkIzvU6elbBr/DA8rEtkj
// accessKeyId : AKIAUCD4DQKOUQCHJWZW

// AKIAUCD4DQKOROHTRH7L
// BhlOVdKyGx/0F6H8duho67jrQ1EH2SQuJwsfWdKS


const uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
        // this function will upload file to aws and return the link
        let s3 = new aws.S3({ apiVersion: '2006-03-01' });

        var uploadParams = {
            ACL: "public-read",
            Bucket: "devdutta",
            Key: "abc/" + file.originalname,
            Body: file.buffer
        }
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }
            console.log("file uploaded succesfully")
            return resolve(data.Location)
        })
    })
}

// const upload = async function (req, res) {
//     try {
//         const files = req.files;
//         if (!files || !files.length > 0) return res.status(400).send({ status: false, message: "please enter profileImage" })
//         const myFile = files
//         if()
//         const fileType = myFile['mimetype'];
//         const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
//         if (!validImageTypes.includes(fileType)) return res.status(400).send({ status: false, message: "Please enter valid image file" })
//         //********uploading image to aws*******/
//         const uploadImage = await uploadFile.uploadFile(myFile)

//         data.profileImage = uploadImage;
//         if (!data.profileImage) return res.status(400).send({ status: false, message: "please add profile Image" })
//     }
//     catch (err) {
//         return res.status(500).send({ status: false, msg: err })
//     }
// }

module.exports.uploadFile = uploadFile 


// const uploadFile = async (file) => {
//     return new Promise(function (resolve, reject) {
//         // this function will upload file to aws and return the link
//         let s3 = new aws.S3({ apiVersion: '2006-03-01' });

//         var uploadParams = {
//             ACL: "public-read",
//             Bucket: "devdutta",
//             Key: "abc/" + file.originalname,
//             Body: file.buffer
//         }
//         s3.upload(uploadParams, function (err, data) {
//             if (err) {
//                 return reject({ "error": err })
//             }
//             console.log("file uploaded succesfully")
//             return resolve(data.Location)
//         })
//     })
// }



// router.post("/img-upload", uploadFile.array("images",3), async function (req, res) {
//     try {
//         let files = req.files

//         // if(files && files.length > 0){
//         //     let uploadFileUrl = await uploadFile(files[0])
//         //     console.log(uploadFileUrl)
//         //     res.status(201).send({msg:"upolad success", data: uploadFileUrl})
//         // }
//         let uploadFileUrl;
//         let productId = req.body.productId
//         let photos = []
//         if (files && files.length > 0) {
//             for (let i = 0; i < req.files.length; i++) {  
//                 photos.push({
//                     productId: productId,
//                     uploadFileUrl :  req.files[i].fileName,
//                     mime: req.files[i].mimetype,
//                     imgUrl: req.files[i].location, 
//                 })
//             }
//         }
//         res.status(201).send({ msg: "upolad success", data: photos })
//     }
//     catch (err) {
//         res.status(500).send({ status: false, msg: err })
//     }
// })

//  async multiplePhotoUpload(req, res, next) {
//     let attachmentEntries = [];
//     var productId = req.body.productId;
//     for (var i = 0; i < req.files.length; i++) {
//         attachmentEntries.push({
//             productId: productId,
//             name: req.files[i].filename,
//             mime: req.files[i].mimetype,
//             imgUrl: req.files[i].location,
//         })
//     }

//     db.product.findOne({
//         where: { id: productId },
//     }).then(r => {
//         if (r) {
//             return queue.create('img-upload', {
//                 productId: productId,
//                 productName: r.item_name,
//                 attachmentEntries: attachmentEntries,
//             }).save();
//         }
//         throw new RequestError('ProductId is not found')
//     }).then(r => {
//         res.status(200).json({ success: r });
//     })
//         .catch(function (error) {
//             console.log(error);
//             res.status(500).json({ 'errors': ['Error insert photo'] });
//         });
// }