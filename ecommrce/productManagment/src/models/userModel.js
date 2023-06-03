const mongoose = require("mongoose");
const crypto = require("crypto");
const { stringify } = require("querystring");


const userSchema = new mongoose.Schema({
    
        fname: {
            type: String,
            required: true
        },
        lname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        
        mobile: {
            type: String,
            required: true,
            unique: true,
            index:true
        },

        password: {
            type: String,
            required: true
        },
        roles: {
            type: String,
            default: "user"
        },
        proffesion:{
            type: String,
        },

        isBlocked:{
            type:Boolean,
            default:false
        },
        refreshToken:{
            type: String
        },
        address: String,
        wishlist: [{type: mongoose.Schema.Types.ObjectId, ref : "product"}],
        cart : {
            type : Array,
            default: []
        },
        
    }, { timestamps: true })

    userSchema.methods.createPasswordResetToken = async ()=>{
        const resetToken = crypto.randomBytes(32).toString("hex")
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetExpires = Date.now() + 30*60*1000
        
        return (resetToken)
    }

module.exports = mongoose.model('User', userSchema)


