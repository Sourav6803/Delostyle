const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },

    deletedAt: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

module.exports = mongoose.model("brand", brandSchema)