const mongoose = require('mongoose')

const colorSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
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

module.exports = mongoose.model("Colors", colorSchema)