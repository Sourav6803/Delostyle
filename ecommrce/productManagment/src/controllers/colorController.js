const colorModel = require("../models/colorModel");
const mongoose = require('mongoose')

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    if (typeof value != "string") return false;
    return true;
};

const createColor = async function (req, res) {
    try {
        let data = req.body
        const { title } = data

        const color = await colorModel.create(data)
        return res.status(201).send(color)
    }
    catch (error) {
        return res.status(500).send({ message: false, err: error.message })
    }
}

const getColor = async function (req, res) {
    try {
        let data = await colorModel.find({isDeleted:false})
        return res.send(data)
    }
    catch {
        return res.status(500).send({ message: false, err: error })
    }
}

const getColorId = async function(req,res){
    try{
        let colorId = req.params.colorId;
        let color = await colorModel.findById(colorId)
        if (!color) return res.status(404).send({ status: false, msg: "The given colorId is not there in database" })
        if (color.isDeleted == true) return res.status(400).send({ status: false, msg: "The color is deleted" })
        return res.status(200).send({data: color })
    }
    catch(err){
        return res.status(500).send({ message: false, err: err.message })
    }
}

const updateColor = async function(req,res){
    try{
        let colorId = req.params.colorId;
        if (!isValid(colorId)) return res.status(400).send({ msg: "Please enter ColorId" })
        if (!mongoose.isValidObjectId(colorId)) return res.status(400).send({ status: false, msg: "ColorId is not valid" });
        let data = req.body
        let {title } = data
        let color = await colorModel.findById(colorId)
        if (!color) return res.status(404).send({ status: false, msg: "Colorid is not present in DB " })
        if (color.isDeleted == true) return res.status(400).send({ status: false, msg: "Color is Deleted" })
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Noting to Update in Request from Body" });
        }
        if (title != null) {

            // check it is valid title or not? (using regular expression)
            let findTitle = await colorModel.findOne({ title: title })
            if (findTitle) {
                return res.status(400).send({ status: false, msg: "title is Already Present in DB" })
            }
            color.title = title
        }

        return res.status(200).send({ status: true, msg: "succesfully created", data: color });
    }
    catch(err){
        return res.status(500).send({ message: false, err: err.message })
    }
}

module.exports.createColor = createColor;
module.exports.getColor = getColor;
module.exports.getColorId = getColorId;
module.exports.updateColor = updateColor;