const express = require('express');
const router = express.Router();
const upload  = require('../controllers/awsBucket')

const { createUser, updatedUser, userLogin, getUser, getAlluser ,handleRefreshToken , logout , updatedPassword , forgetPasswordToken , resetPassword } = require('../controllers/userControllers.js')
const { createCart, updatedCart, getCart, deleteCart, applyCupon ,  removeProductFromCart, updateQuantityFromCart } = require('../controllers/cartControllers.js')
const { createProduct, updatedProduct, getProductById, getAllProducts, deletedProduct, filterProduct , addToWishList, rating , getWishlist } = require('../controllers/productControllers.js')
const { createOrder , getMyOrder } = require('../controllers/orderControllers.js')
const { createBrand, getBrand, getBrandById, updateBrand, deletedBrand } = require("../controllers/brandControler")
const { createCategory, getCategory, getCategoryById, updateCategory, deletedCategory } = require('../controllers/categoryController.js')
const { createColor, getColor, updateColor, getColorId } = require("../controllers/colorController")
const { createCoupon, getCoupon, getCouponById, updateCoupon, deletedCoupon } = require("../controllers/couponController")
const { createBlog, updateBlog, getBlog, getAllBlog , likeBlog , disLiketheBlog} = require('../controllers/blogController')
const {createEnq , getEnq , updateEnq , getAllEnq , deleteEnq} = require("../controllers/enqController")
const {checkOut , paymentVerification} = require('../controllers/paymentController')
const { auth } = require('../middleware/auth.js')
const AWS = require("aws-sdk");
const shortId = require("shortid")




router.post('/register', createUser)
router.post('/admin-login', userLogin)
router.get('/user/:userId/profile', auth, getUser)
router.get('/all-users', getAlluser)
router.put('/user/updateUser', auth, updatedUser)
router.get("/refreshToken",handleRefreshToken)
router.post("/forget-password-token" ,forgetPasswordToken)
router.put("/reset-password/:token" ,resetPassword)
router.put("/password",auth ,updatedPassword)
router.get("/logOut",logout)


router.post('/products', createProduct)
router.get('/products', filterProduct)
router.put('/products/:productId', updatedProduct)
router.get('/products/:productId', getProductById)
router.get('/all-products', getAllProducts)
router.delete('/products/:productId', deletedProduct)
router.put('/wishlist', auth , addToWishList)
router.put('/rating', auth , rating)
router.get('/get-wishlist',auth ,getWishlist )



//--------------------------cart--------------------------------------------------------------//
router.post('/users/cart', auth, createCart)
router.put('/users/:userId/cart', auth, updatedCart)
router.get('/users/getCart', auth, getCart)
router.delete('/users/cart', auth, deleteCart)
router.post('/cart/coupon', auth, applyCupon)
router.delete('/cart/removeCart/:cartItemId', auth, removeProductFromCart)
router.delete('/cart/update/:cartItemId/:newQuantity', auth, updateQuantityFromCart)

//---------------------------orders----------------------------------------------------------//
router.post('/user/order', auth, createOrder)
router.get('/user/getMyOrder',auth , getMyOrder)
// router.put('/users/:userId/orders', auth, updateOrder)

router.post("/create-brand", createBrand)
router.get("/get-brand", getBrand)
router.get("/brand/:brandId", getBrandById)
router.put("/brand/:brandId", updateBrand)
router.delete("/brand/:brandId", deletedBrand)

router.post("/create-category", createCategory)
router.get("/get-category", getCategory)
router.get("/category/:categoryId", getCategoryById)
router.put("/category/:categoryId", updateCategory)
router.delete("/category/:categoryId", deletedCategory)

router.post("/create-coupon", createCoupon)
router.get("/get-coupon", getCoupon)
router.get("/coupon/:couponId", getCouponById)
router.put("/coupon/:couponId", updateCoupon)
router.delete("/coupon/:couponId", deletedCoupon)


router.post("/create-color", createColor)
router.get("/get-color", getColor)
router.get("/color/:colorId", getColorId)
router.put("/color/:colorId", updateColor)


router.post("/create-blog",auth, createBlog)
router.put("/updateBlog/:id",auth, updateBlog)
router.get("/getBlog/:id", getBlog)
router.get("/getAllBlog", getAllBlog)
router.put("/like",auth , likeBlog)
router.put("/dislike",auth , disLiketheBlog)


router.post("/create-enq", createEnq)
router.put("/update-enq/:id",auth , updateEnq)
router.get("/enq/:id", getEnq)
router.get("/allEnq",getAllEnq)
router.delete("/enq/:id", deleteEnq)


router.post("/order/checkout", auth , checkOut)
router.post("/order/paymentVerification",auth, paymentVerification)


const aws = require("aws-sdk")

aws.config.update({
    accessKeyId: "AKIA2VQCREO4NBWV2455",
    secretAccessKey: "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",
    region: "ap-northeast-1"
})

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





router.post("/img", async function (req, res) {
    try {
        let files = req.files
        let photos = []
        if(files && files.length > 0){
            
            for (let i = 0; i < req.files.length; i++) {
                let imgLink = await uploadFile(files[i])
                photos.push({
                    // productId: productId,
                    // uploadFileUrl :  req.files[i].fileName,
                    // mime: req.files[i].mimetype,
                    url: imgLink,
                    asset_id: shortId.generate(),
                    public_id: shortId.generate()
                })
            }
            res.status(201).send(photos)
        }
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err })
    }
})



  




// router.all("/*", function (req, res) {
//     res.status(400).send({
//         status: false, msg: "The endpoint is not correct"
//     });
// });


module.exports = router