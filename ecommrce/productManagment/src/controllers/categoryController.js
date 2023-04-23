const categoryModel = require("../models/categoryModel");
const mongoose = require('mongoose')

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    if (typeof value != "string") return false;
    return true;
};


const createCategory = async function (req, res) {
    try {
        let data = req.body
        const { title } = data

        const category = await categoryModel.create(data)
        return res.status(201).send({status: true , msg:"success" , data: category})
    }
    catch (error) {
        return res.status(500).send({ message: false, err: error.message })
    }
}

const getCategory = async function (req, res) {
    try {
        let data = await categoryModel.find({isDeleted:false})
        return res.send(data)
    }
    catch {
        return res.status(500).send({ message: false, err: error })
    }
}


const getCategoryById = async function(req,res){
    res.setHeader("Access-Control-Allow-Origin",'*')
    try{
        let categoryId = req.params.categoryId;
        let category = await categoryModel.findById(categoryId)
        if (!category) return res.status(404).send({ status: false, msg: "The given categoryId is not there in database" })
        if (category.isDeleted == true) return res.status(400).send({ status: false, msg: "The category is deleted" })
        return res.status(200).send(category)
    }
    catch(err){
        return res.status(500).send({ message: false, err: err.message })
    }
}

const updateCategory = async function(req,res){
    // res.setHeader("Access-Control-Allow-Origin",'*')
    try{
        let categoryId = req.params.categoryId;
        if (!isValid(categoryId)) return res.status(400).send({ msg: "Please enter categoryId" })
        if (!mongoose.isValidObjectId(categoryId)) return res.status(400).send({ status: false, msg: "CategoryId is not valid" });
        let data = req.body
        let {title , description} = data
        let category = await categoryModel.findById(categoryId)
        if (!category) return res.status(404).send({ status: false, msg: "category is not present in DB " })
        if (category.isDeleted == true) return res.status(400).send({ status: false, msg: "Category is Deleted" })
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Noting to Update in Request from Body" });
        }

        if (title != null) {
            // check it is valid title or not? (using regular expression)
            let findTitle = await categoryModel.findOne({ title: title })
            if (findTitle) {
                return res.status(400).send({ status: false, msg: "title is Already Present in DB" })
            }
            category.title = title
        }
        if (description != null) {
            if (!isValid(description)) return res.status(400).send({ status: false, msg: "description invalid " })
            category.description = description
        }
        category.save()
 
        return res.status(200).send( {category: category} );
    }
    catch(err){
        return res.status(500).send({ message: false, err: err.message })
    }
}

const deletedCategory = async function (req, res) {
    try {
        let categoryId = req.params.categoryId;

        if (!isValid(categoryId)) return res.status(400).send({ msg: "Please enter categoryId" })
        if (!mongoose.isValidObjectId(categoryId)) return res.status(400).send({ status: false, msg: "categoryId is Invalid" })

        let category = await categoryModel.findById(categoryId)
        if (!category) return res.status(404).send({ status: false, msg: "Category is not present" })

        //check if isDeleated Status is True
        if (category.isDeleted) {
            return res.status(404).send({ status: false, msg: "Category is already Deleted" })
        }

        //update the status of isDeleted to TRUE
        await categoryModel.findOneAndUpdate({ _id: categoryId, isDeleted: false }, { isDeleted: true, deletedAt: new Date(), });

        return res.status(200).send( {message: "successfuly Deleted"} );
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}

module.exports.createCategory = createCategory;
module.exports.getCategory = getCategory;
module.exports.getCategoryById = getCategoryById;
module.exports.updateCategory = updateCategory;
module.exports.deletedCategory = deletedCategory;
