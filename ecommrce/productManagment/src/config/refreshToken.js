const jwt = require("jsonwebtoken");

const generateRefreshToken = (id)=>{
    return jwt.sign({ id }, "group09", {expiresIn:"3d"})
}

module.exports = {generateRefreshToken};