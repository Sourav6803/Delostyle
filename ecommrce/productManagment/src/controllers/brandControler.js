const brandModel = require("../models/brandModel");
const mongoose = require('mongoose')

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    if (typeof value != "string") return false;
    return true;
};

const createBrand = async function (req, res) {
    res.setHeader("Access-Control-Allow-Origin",'*')
    try {
        let data = req.body
        const { title, description } = data

        const brand = await brandModel.create(data)
        return res.status(201).send( brand)
    }
    catch (error) {
        return res.status(500).send({ message: false, err: error.message })
    }
}

const getBrand = async function (req, res) {
    
    try {
        let data = await brandModel.find({isDeleted : false})
        return res.send(data)
    }
    catch(err) {
        return res.status(500).send({ message: false, err: err })
    }
}




const getBrandById = async function(req,res){
    res.setHeader("Access-Control-Allow-Origin",'*')
    try{
        let brandId = req.params.brandId;
        let brand = await brandModel.findById(brandId)
        if (!brand) return res.status(404).send({ status: false, msg: "The given brandId is not there in database" })
        if (brand.isDeleted == true) return res.status(400).send({ status: false, msg: "The brand is deleted" })
        return res.status(200).send(brand)
    }
    catch(err){
        return res.status(500).send({ message: false, err: err.message })
    }
}


const updateBrand = async function(req,res){
    res.setHeader("Access-Control-Allow-Origin",'*')
    try{
        let brandId = req.params.brandId;
        if (!isValid(brandId)) return res.status(400).send({ msg: "Please enter brandId" })
        if (!mongoose.isValidObjectId(brandId)) return res.status(400).send({ status: false, msg: "BrandId is not valid" });
        let data = req.body
        let {title , description} = data
        let brand = await brandModel.findById(brandId)
        if (!brand) return res.status(404).send({ status: false, msg: "brandId is not present in DB " })
        if (brand.isDeleted == true) return res.status(400).send({ status: false, msg: "Brand is Deleted" })
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Noting to Update in Request from Body" });
        }

        if (title != null) {
            // check it is valid title or not? (using regular expression)
            let findTitle = await brandModel.findOne({ title: title })
            if (findTitle) {
                return res.status(400).send({ status: false, msg: "title is Already Present in DB" })
            }
            brand.title = title
        }
        if (description != null) {
            if (!isValid(description)) return res.status(400).send({ status: false, msg: "description invalid " })
            brand.description = description
        }
        brand.save()
 
        return res.status(200).send( {brand: brand} );
    }
    catch(err){
        return res.status(500).send({ message: false, err: err.message })
    }
}

const deletedBrand = async function (req, res) {
    try {
        let brandId = req.params.brandId;

        if (!isValid(brandId)) return res.status(400).send({ msg: "Please enter brandId" })
        if (!mongoose.isValidObjectId(brandId)) return res.status(400).send({ status: false, msg: "brandId is Invalid" })

        let brand = await brandModel.findById(brandId)
        if (!brand) return res.status(404).send({ status: false, msg: "Brand is not present" })

        //check if isDeleated Status is True
        if (brand.isDeleted) {
            return res.status(404).send({ status: false, msg: "Brand is already Deleted" })
        }

        //update the status of isDeleted to TRUE
        await brandModel.findOneAndUpdate({ _id: brandId, isDeleted: false }, { isDeleted: true, deletedAt: new Date(), });

        return res.status(200).send( {message: "successfuly Deleted"} );
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}



module.exports.createBrand = createBrand;
module.exports.getBrand = getBrand;
module.exports.getBrandById = getBrandById;
module.exports.updateBrand = updateBrand;
module.exports.deletedBrand = deletedBrand;