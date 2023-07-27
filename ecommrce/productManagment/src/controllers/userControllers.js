const userModel = require("../models/userModel.js");
const file = require("../controllers/aws.js");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const { generateRefreshToken } = require("../config/refreshToken.js");
const sendEmail = require("./emailCtrl.js");
const crypto = require("crypto")


const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    if (typeof value != "string") return false;
    return true;
};

const createUser = async function (req, res) {
    try {
        let data = req.body

        const { fname, lname, email, phone, password, address } = data
        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, message: "please enter details" })

        if (!isValid(fname)) return res.status(400).send({ status: false, message: "please enter fname" })
        if (!/^[a-zA-Z ]{2,20}$/.test(fname)) return res.status(400).send({ status: false, message: "please enter fname" })

        if (!isValid(lname)) return res.status(400).send({ status: false, message: "please enter lname" })
        if (!/^[a-zA-Z ]{2,20}$/.test(lname)) return res.status(400).send({ status: false, message: "please enter fname" })

        if (!isValid(email)) return res.status(400).send({ status: false, message: "please enter email" })
        if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)) return res.status(400).send({ status: false, message: "please enter valid email" })
        const usedEmail = await userModel.findOne({ email: email })
        if (usedEmail) return res.status(409).send({ status: false, message: "emailId is already used" })

        //===================================Imagefile validation==========================//
        const files = req.files;
        if (!files || !files.length > 0) return res.status(400).send({ status: false, message: "please enter profileImage" })
        // const myFile = files[0]
        console.log("files",files)
        
        const fileType = files['mimetype'];
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png' ,'image/jpg' ];
        //if (!validImageTypes.includes(fileType)) return res.status(400).send({ status: false, message: "Please enter valid image file" })
        //********uploading image to aws*******/
        let uploadImage = []
        let imageLink

        for(let i=0;i<files.length;i++){
             imageLink = await file.uploadFile(files[i])
             uploadImage.push(imageLink)
        }
        
        data.profileImage = uploadImage;
         if(!data.profileImage)return res.status(400).send({status:false,message:"please add profile Image"})
        //==================================phone validations============================//
        //if (!isValid(phone)) return res.status(400).send({ status: false, message: "please enter phone number" })
        //if (!/^([9876]{1})(\d{1})(\d{8})$/.test(phone)) return res.status(400).send({ status: false, message: "please enter valid phone number" })
        // const usedNumber = await userModel.findOne({ phone: phone })
        // if (usedNumber) return res.status(409).send({ status: false, message: " Phone number is already exist" })
        //===========================password validation===================================//
        // let password = req.body.password
        if (!isValid(password)) return res.status(400).send({ status: false, message: "please enter password" })
        if (!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/.test(password)) return res.status(400).send({ status: false, message: "Please enter strong password of atleast 8 character, It should contain atleast One Capital letter , one lower case letter and special character ," })
        //******password hashing and salting **********/

        const bcryptPassword = await bcrypt.hash(password, 10)
        data.password = bcryptPassword
        //    console.log(password)

        //============================address validations================================//
        // try {
        //    // if (!req.body.address) return res.status(400).send({ status: false, message: "address should be present" })
        //     var myAddress = JSON.parse(req.body.address)

        // } catch (err) {
        //     return res.status(400).send({ status: false, message: "no entry should not start with 0" })
        // }
        // if (Object.keys(myAddress).length != 2) return res.status(400).send({ status: false, message: "Shipping or billing address is missing" })
        // //******shipping validation**************//
        // const shipping = myAddress.shipping
        // // if (Object.keys(shipping).length != 3) return res.status(400).send({ status: false, message: "Some shipping details is missing" })
        // const { street, city, pincode } = shipping

        // if (!isValid(street)) return res.status(400).send({ status: false, message: "please enter shipping street details" });
        // if (!isValid(city)) return res.status(400).send({ status: false, message: "please enter shipping city" });
        // if (typeof (pincode) != "number") return res.status(400).send({ status: false, message: "pincode should be in number" });
        // if (!/^[1-9][0-9]{5}$/.test(pincode)) return res.status(400).send({ status: false, message: "please enter valid shippig pincode" })

        // //******billing validation**************//
        // const billing = myAddress.billing
        // // if (Object.keys(billing).length != 3) return res.status(400).send({ status: false, message: "Some billing details is missing" })
        // if (!isValid(billing.street)) return res.status(400).send({ status: false, message: "please enter billing street details" });
        // if (!isValid(billing.city)) return res.status(400).send({ status: false, message: "please enter billing city" });
        // if (typeof (billing.pincode) != "number") return res.status(400).send({ status: false, message: "please enter billing pincode" });
        // if (!/^[1-9][0-9]{5}$/.test(billing.pincode)) return res.status(400).send({ status: false, message: "please enter valid billing pincode" })

        // data.address = myAddress

        let user = await userModel.create(data)
        return res.status(201).send({ status: true, message: "New User Created", data: user })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

// const createUser = async function (req, res) {
//     try {
//         let data = JSON.parse(req.body.data)

//         const { fname, lname, email, phone, password } = data
//         if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, message: "please enter details" })

//         if (!isValid(fname)) return res.status(400).send({ status: false, message: "please enter fname" })
//         if (!/^[a-zA-Z ]{2,20}$/.test(fname)) return res.status(400).send({ status: false, message: "please enter fname" })

//         if (!isValid(lname)) return res.status(400).send({ status: false, message: "please enter lname" })
//         if (!/^[a-zA-Z ]{2,20}$/.test(lname)) return res.status(400).send({ status: false, message: "please enter fname" })

//         if (!isValid(email)) return res.status(400).send({ status: false, message: "please enter email" })
//         if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)) return res.status(400).send({ status: false, message: "please enter valid email" })
//         const usedEmail = await userModel.findOne({ email: email })
//         if (usedEmail) return res.status(409).send({ status: false, message: "emailId is already used" })

//         //===================================Imagefile validation==========================//
//         const files = req.files;
//         if (!files || !files.length > 0) return res.status(400).send({ status: false, message: "please enter profileImage" })
//         const myFile = files[0]
//         const fileType = myFile['mimetype'];
//         const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
//         if (!validImageTypes.includes(fileType)) return res.status(400).send({ status: false, message: "Please enter valid image file" })
//         //********uploading image to aws*******/
//         const uploadImage = await file.uploadFile(myFile)

//         data.profileImage = uploadImage;
//         if (!data.profileImage) return res.status(400).send({ status: false, message: "please add profile Image" })
//         //==================================phone validations============================//
//         if (!isValid(phone)) return res.status(400).send({ status: false, message: "please enter phone number" })
//         if (!/^([9876]{1})(\d{1})(\d{8})$/.test(phone)) return res.status(400).send({ status: false, message: "please enter valid phone number" })
//         const usedNumber = await userModel.findOne({ phone: phone })
//         if (usedNumber) return res.status(409).send({ status: false, message: " Phone number is already exist" })
//         //===========================password validation===================================//
//         // let password = req.body.password
//         if (!isValid(password)) return res.status(400).send({ status: false, message: "please enter password" })
//         if (!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/.test(password)) return res.status(400).send({ status: false, message: "Please enter strong password of atleast 8 character, It should contain atleast One Capital letter , one lower case letter and special character ," })
//         //******password hashing and salting **********/
 
        
//         const bcryptPassword = await bcrypt.hash(password, 10)
//         data.password = bcryptPassword
//         //    console.log(password)


//         //============================address validations================================//
//         try {
//             if (!req.body.address) return res.status(400).send({ status: false, message: "address should be present" })
//             var myAddress = JSON.parse(req.body.address)

//         } catch (err) {
//             return res.status(400).send({ status: false, message: "no entry should not start with 0" })
//         }
//         if (Object.keys(myAddress).length != 2) return res.status(400).send({ status: false, message: "Shipping or billing address is missing" })
//         //******shipping validation**************//
//         const shipping = myAddress.shipping
//         // if (Object.keys(shipping).length != 3) return res.status(400).send({ status: false, message: "Some shipping details is missing" })
//         const { street, city, pincode } = shipping

//         if (!isValid(street)) return res.status(400).send({ status: false, message: "please enter shipping street details" });
//         if (!isValid(city)) return res.status(400).send({ status: false, message: "please enter shipping city" });
//         if (typeof (pincode) != "number") return res.status(400).send({ status: false, message: "pincode should be in number" });
//         if (!/^[1-9][0-9]{5}$/.test(pincode)) return res.status(400).send({ status: false, message: "please enter valid shippig pincode" })

//         //******billing validation**************//
//         const billing = myAddress.billing
//         if (Object.keys(billing).length != 3) return res.status(400).send({ status: false, message: "Some billing details is missing" })
//         if (!isValid(billing.street)) return res.status(400).send({ status: false, message: "please enter billing street details" });
//         if (!isValid(billing.city)) return res.status(400).send({ status: false, message: "please enter billing city" });
//         if (typeof (billing.pincode) != "number") return res.status(400).send({ status: false, message: "please enter billing pincode" });
//         if (!/^[1-9][0-9]{5}$/.test(billing.pincode)) return res.status(400).send({ status: false, message: "please enter valid billing pincode" })

//         data.address = myAddress

//         let user = await userModel.create(data)
//         return res.status(201).send({ status: true, message: "User profile details", data: user })
//     } catch (err) {
//         return res.status(500).send({ status: false, message: err.message })
//     }
// }

const userLogin = async function (req, res) {
    res.setHeader("Access-Control-Allow-Origin",'*')
    try {
        let { email, password } = req.body;

        // if (!isValid(email) || !isValid(password))
        // return res.status(400).send({ status: false, msg: "Provide emailId and Password both" });
        if (!isValid(email)) return res.status(400).send({ status: false, message: "please enter email in string format" })
        if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)) return res.status(200).send({ status: false, message: "Please enter valid email" })

        if (!isValid(password)) return res.status(400).send({ status: false, message: "please enter password in string format" })
        if (!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/.test(password)) return res.status(400).send({ status: false, message: "invalid password" })


        let myUser = await userModel.findOne({ email: email });
        if (!myUser) return res.status(400).send({ status: false, message: "emailId is not present in db" });
        
        const refreshToken = await generateRefreshToken(myUser._id)
        
        const updateUser = await userModel.findByIdAndUpdate(myUser.id, { refreshToken : refreshToken},{new: true})
        // console.log(updateUser)
        res.cookie("refreshToken", refreshToken , {
            httpOnly : true,
            maxAge: 72 * 60 * 60 * 1000
        })

        bcrypt.compare(password, myUser.password, function (err, result) {
            if (result) {
                let token = jwt.sign({
                    userId: myUser._id.toString()
                }, "group09",
                    {
                        expiresIn: "10d"
                    });

                return res.status(200).send({message: "Login Succesfully", token ,fname:myUser.fname })
                // status: true, msg: "success", userId: myUser._id,
                //fname:myUser.fname, lname: myUser.lname , email: myUser.email
            }
            return res.status(400).send({ status: false, message: "wrong password" })

        });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const handleRefreshToken = async function(req,res){
    try{
       
        const cookie = req.cookies
        
        if(!cookie.refreshToken) return res.status(400).send({ msg: "No refresh token in cookies" }) 
        const refreshToken = cookie.refreshToken
        const user = await userModel.findOne({refreshToken})
       if(!user) return res.status(400).send({ msg: "No refresh token present in db" })
        jwt.verify(refreshToken, "group09" , (err, decoded)=>{
            
            if(err || user.id !== decoded.id){
                return res.status(400).send({ msg: "There is something wrong in refresh token" })
            }
            const accessToken = generateRefreshToken(user?._id)
            res.status(201).send({status: true , accessToken})
        })
    }catch(err){
        return res.status(500).send({ status: false, message: err.message })
    }
}

const logout = async function(req,res){
    try{
        const cookie = req.cookies
        if(!cookie.refreshToken) return res.status(400).send({ msg: "No refresh token in cookies" }) 
        const refreshToken = cookie.refreshToken
        const user = await userModel.findOne({refreshToken}) 
        if(!user){
            res.clearCookie("refreshToken",{
                httpOnly: true,
                secure: true
            })
            return res.sendStatus(204)
        }
        await userModel.findOneAndUpdate("refreshToken", {
            refreshToken : ""
        })
        res.clearCookie("refreshToken",{
            httpOnly: true,
            secure: true
        })
        return res.sendStatus(204)
    }catch(err){
        return res.status(500).send({ status: false, message: err.message });
    }

}

const forgetPasswordToken = async(req,res)=>{
    try{
        const {email} = req.body
        const user = await userModel.findOne({email})
        if(!user) return res.status(400).send({ status: false, msg: "emailId is not present in Database" });
        const token = await user.createPasswordResetToken()
        await user.save()
        const resetUrl = `Hi, Please follow this link to reset your password. This link is valid till 10 min from now. <a href="http://localhost:3000/reset-password/${token}"> Click Here </> `
        const data = {
            to: email,
            text : "hey user",
            subject: "Forget Password Link",
            html: resetUrl
        }
        sendEmail(data)
        res.send(token)
    }
    catch(err){
        return res.status(500).send({ status: false, message: err.message })
    }
}

const getUser = async function (req, res) {
    try {
         const userId = req.params.userId;
        if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ msg: "inavalid id format" })
        if (req.userId != userId) return res.status(403).send({ status: false, message: "you are not authorized" })

        const user = await userModel.findOne({ _id: userId }).populate("cart");

        return res.status(200).send({ status: true, message: "User profile details", data: user });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

const getAlluser = async function (req, res) {


    // check if any query param is present
    // if (Object.keys(req.query).length !== 0) {
    //     req.query.isDeleted = false
    //     let data = await bookModel.find(req.query)
    //     if (data.length != 0) return res.status(200).send({ status: true, data: data })

    //     return res.status(404).send({ status: false, msg: "No document found as per filter key" })
    // }

    //  return the data if isDeleted false  //  sort here we use to sort the title in alphabetically
    let data = await userModel.find()
    return res.send(data)

    // if (data.length != 0) return res.status(200).send({ status: true, data: data })
    // return res.status(404).send({ status: false, msg: " no document are found" })
}

// const updatedUser = async function (req, res) {
//     try {
//         let userId = req.params.userId
//         //check the userId is Valid or Not ?  
//         if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ msg: "inavalid id format" })
//         if (req.userId != userId) return res.status(403).send({ status: false, message: "you are not authorized" })

//         let data = req.body
//         let { fname, lname, email, phone, password, address } = data

//         //check if body is empty or not ?
//         if (Object.keys(data).length == 0) {
//             return res.status(400).send({ status: false, msg: "Please enter field to be Updated" });
//         }

//         //check if userid is present in Db or Not ? 
//         let user = await userModel.findById(userId)
//         if (!user) return res.status(404).send({ status: false, msg: "No user found" })

//         var regEx = /^[a-zA-Z ]{2,15}$/

//         if (fname != null) {
//             if (!regEx.test(fname)) return res.status(400).send({ status: false, msg: "fname text is invalid" });
//             user.fname = fname;
//         }

//         if (lname != null) {
//             if (!regEx.test(lname)) return res.status(400).send({ status: false, msg: "lname text is invalid" });
//             user.lname = lname
//         }
//         //check the email unique or not 
//         if (email != null) {
//             if (!isValid(email)) return res.status(400).send({ status: false, message: "please enter email" })
//             if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)) return res.status(400).send({ status: false, message: "please enter valid email" })
//             let findEmail = await userModel.findOne({ email: email })
//             if (findEmail) {
//                 return res.status(400).send({ status: false, msg: "This EmailId is already taken" })
//             }
//             user.email = email;
//         }

//         //check the phone unique or not 
//         if (phone != null) {
//             if (!isValid(phone)) return res.status(400).send({ status: false, message: "please enter phone number" })
//             if (!/^([9876]{1})(\d{1})(\d{8})$/.test(phone)) return res.status(400).send({ status: false, message: "please enter valid phone number" })
//             let findPhone = await userModel.findOne({ phone: phone })
//             if (findPhone) return res.status(400).send({ status: false, msg: "phone is Already Present in DB" })
//             user.phone = phone
//         }

//         //  adreess validation
//         // if (address != null) {
//         //     const myAddress = JSON.parse(address)

//         //     if (Object.keys(myAddress).length == 0) return res.status(400).send({ status: false, message: "Address cannot be empty" })
//         //     //******shipping validation**************//
//         //     if (myAddress.shipping != null) {
//         //         const shipping = myAddress.shipping
//         //         if (Object.keys(shipping).length == 0) return res.status(400).send({ status: false, message: "Shipping details cannot be empty" })


//         //         const { street, city, pincode } = shipping
//         //         if (street != null) {
//         //             if (!isValid(street)) return res.status(400).send({ status: false, message: "please enter shipping street details" });
//         //             user.address.shipping.street = street
//         //             console.log(street)
//         //         }
//         //         if (city != null) {
//         //             if (!isValid(city)) return res.status(400).send({ status: false, message: "please enter shipping city" });
//         //             if (!regEx.test(city)) return res.status(400).send({ status: false, msg: " shipping city is invalid" });
//         //             user.address.shipping.city = city
//         //         }
//         //         if (pincode != null) {
//         //             if (typeof (pincode) != "number") return res.status(400).send({ status: false, message: "please enter shipping pincode" });
//         //             if (!/^[1-9][0-9]{5}$/.test(pincode)) return res.status(400).send({ status: false, message: "please enter valid shippig pincode" });
//         //             user.address.shipping.pincode = pincode

//         //         }
//         //     }
//         //     //******billing validation**************//
//         //     if (myAddress.billing != null) {
//         //         const billing = myAddress.billing
//         //         const { street, city, pincode } = billing
//         //         // if (Object.keys(billing).length == 0) return res.status(400).send({ status: false, message: "Some billing details is missing" })
//         //         if (street != null) {
//         //             if (!isValid(street)) return res.status(400).send({ status: false, message: "please enter billing street details" });
//         //             user.address.billing.street = street

//         //         }
//         //         if (city != null) {
//         //             if (!isValid(city)) return res.status(400).send({ status: false, message: "please enter billing city" });
//         //             if (!regEx.test(city)) return res.status(400).send({ status: false, msg: "billing city is invalid" });
//         //             user.address.billing.city = city
//         //         }
//         //         if (pincode != null) {
//         //             if (typeof (pincode) != "number") return res.status(400).send({ status: false, message: "please enter billing pincode" });
//         //             if (!/^[1-9][0-9]{5}$/.test(pincode)) return res.status(400).send({ status: false, message: "please enter valid billing pincode" })
//         //             user.address.billing.pincode = pincode
//         //         }
//         //     }
//         // }


//         // image validation
//         if (req.files != null) {
//             if (req.files.length > 0) {
//                 const files = req.files;
//                 console.log(files)
//                 if (!files || !files.length > 0) return res.status(400).send({ status: false, message: "please enter profileImage" })
//                 const myFile = files[0]
//                 const fileType = myFile['mimetype'];
//                 const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
//                 if (!validImageTypes.includes(fileType)) return res.status(400).send({ status: false, message: "Please enter valid image file" })
//                 //********uploading image to aws*******/
//                 const uploadImage = await file.uploadFile(myFile)
//                 user.profileImage = uploadImage;
//             }
//         }
//         //check if password is valid or not ?
//         if (password != null) {
//             var passwordReg = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,15}$/;
//             if (!passwordReg.test(password)) return res.status(400).send({ status: false, msg: "pass is invalid(Minimum 8 and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character Ex. Abc@123,abC%98,@abD34,1999$Sour" })

//             const bcryptPassword = await bcrypt.hash(password, 10)
//             req.body.password = bcryptPassword

//         }

//         //if all condition are passed update data
//         const updatedUser = await user.save()
//         return res.status(200).send({ status: true, data: updatedUser });
//     }
//     catch (err) {
//         return res.status(500).send({ status: false, message: err.message })
//     }

// }

const updatedUser = async(req,res)=>{
    try{
        const id = req.userId
        const findUser = await userModel.findByIdAndUpdate(id,{
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            phone: req.body.phone
        },{
            new: true
        })
        return res.status(200).send(findUser)
    }
    catch(error){
        return res.status(500).send({ status: false, message: error.message })
    }
}

const updatedPassword = async(req,res)=>{
    try{
        const id = req.userId
        console.log(id)
        const {password} = req.body
        const user = await userModel.findById(id)
        if(!user) res.status(400).send({ msg: "Id dose not present in Database" })
        if(password){
            user.password = password
            const bcryptPassword = await bcrypt.hash(password, 10)
            user.password = bcryptPassword
            const updatedPassword = await user.save()
            return res.status(200).send(updatedPassword)
        }else{
            return res.status(200).send(user)
        }
    }
    catch(err){
        return res.status(500).send({ status: false, message: err.message })
    }
}

const resetPassword = async(req,res)=>{
    try{
        const { password} = req.body
        const {token} = req.params
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
        console.log(hashedToken)
        const user = await userModel.findOne({
            passwordResetToken: hashedToken
            
        })
        console.log(user)
        
        if(!user) return res.status(400).send({ message: "Token expired" })
        user.password = password
        user.passwordResetToken = undefined
        // user.passwordResetExpires = undefined
        await user.save()
        res.send(user)
    }
    catch(err){
        return res.status(500).send({ status: false, message: err.message })
    }
}





module.exports = { createUser, updatedUser, userLogin, getUser , getAlluser, handleRefreshToken , logout , updatedPassword , forgetPasswordToken , resetPassword }