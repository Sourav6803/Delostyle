const mongoose = require("mongoose");
const crypto = require("crypto")


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
        // profileImage: {
        //     type: Array,
        //     // required: true
        // }, // s3 link
        phone: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: "user"
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
        passwordChangedAt : Date,
        passwordResetToken : String,
        passwordResetExpires: Date
    }, { timestamps: true })

    userSchema.methods.createPasswordResetToken = async ()=>{
        const resetToken = crypto.randomBytes(32).toString("hex")
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetExpires = Date.now() + 30*60*1000
        
        return (resetToken)
    }

module.exports = mongoose.model('User', userSchema)


