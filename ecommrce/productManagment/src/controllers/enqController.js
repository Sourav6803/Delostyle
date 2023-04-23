const mongoose = require('mongoose');
const enqModel = require('../models/enqModel')

const createEnq = async(req,res)=>{
    const data = req.body
    let enq = await enqModel.create(data)
     return res.status(201).send(enq)
}

const getEnq = async(req,res)=>{
    const id = req.params.id
    
    // let findEnqId = await enqModel.findById(enqId)
    // if(!findEnqId) return res.status(400).send("Enq id not present in db")
    const geten = await enqModel.findById(id)
    
    
    return res.send(geten)  
}

const updateEnq = async(req,res)=>{
    let id = req.params.id
    
    let data = req.body
    const updatEnq = await enqModel.findByIdAndUpdate(id , data ,   {new: true})
    
     res.status(200).send(updatEnq) 
}

const getAllEnq = async(req,res)=>{

    const getAllEnq = await enqModel.find()
    return res.status(200).send(getAllEnq) 
}

const deleteEnq = async(req,res)=>{
    let id = req.params.id
     const delEnq = await enqModel.findByIdAndDelete(id,{new:true})
     res.send("deletd")
}

module.exports = {createEnq, getEnq , updateEnq, getAllEnq , deleteEnq}