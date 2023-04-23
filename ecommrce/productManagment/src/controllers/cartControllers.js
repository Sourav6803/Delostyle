const cartModel = require("../models/cartModel.js");
const userModel = require("../models/userModel.js");
const productModel = require("../models/productModel.js");
const mongoose = require("mongoose");
const couponModel = require("../models/couponModel.js");
const ObjectId = require("mongoose").Types.ObjectId;

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  if (typeof value != "string") return false;
  return true;
};

// const createCart = async function (req, res) {
//   try {
//     const userId = req.params.userId;
//     if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ msg: "inavalid id format" });

//     let user = await userModel.findById(userId);

//     if (!user) return res.status(404).send({ status: false, message: "No such user present" });

//     if (req.userId != userId) return res.status(403).send({ status: false, message: "Authorization failed" });

//     const { cartId, productId, quantity } = req.body;

//     if (cartId != null) {
//       if (!mongoose.isValidObjectId(cartId)) return res.status(400).send({ msg: "inavalid cartId" });
//       const presentCart = await cartModel.findById(cartId)
//       if (!presentCart) return res.status(404).send({ status: false, message: "cart not found" });
//     }

//     if (!isValid(productId)) return res.status(400).send({ msg: "please enter productId" })
//     if (!mongoose.isValidObjectId(productId)) return res.status(400).send({ msg: "inavalid productId" });

//     if (quantity != null) {
//       if (typeof quantity != "number") return res.status(400).send({ msg: "quantity should be a number" })
//       if (quantity < 1) return res.status(400).send({ msg: "quantity should be min 1" })
//     }
//     if (!quantity) {
//       req.body.quantity = 1
//     }
//     // if(!mongoose.isValidObjectId(items.productId)) return res.status(400).send({ msg: "inavalid id format" })
//     let product = await productModel.findOne({ _id: productId, isDeleted: false, });
//     if (!product) return res.status(404).send({ status: false, message: "No such product present" });

//     const existingCart = await cartModel.findOne({ userId: userId });

//     if (existingCart) {
//       if (!cartId) return res.status(400).send({ status: false, message: "The cart is already present please provide cartId", });
//       if (cartId != existingCart._id) return res.status(400).send({ status: false, message: "This cart do not belongs to this user", });
//       for (let i = 0; i < existingCart.items.length; i++) {
//         if (existingCart.items[i].productId == productId) {
//           existingCart.items[i].quantity += req.body.quantity;
//           existingCart.totalPrice += product.price * req.body.quantity;
//           existingCart.save();
//           return res.status(200).send({ status: true, message: existingCart });
//         }
//       }

//       // if new product push into cart we will increwmwnt price

//       let newProduct = { productId: productId, quantity: quantity };
//       existingCart.items.push(newProduct);
//       existingCart.totalPrice += product.price * req.body.quantity;
//       existingCart.totalItems++;
//       existingCart.save();
//       return res.status(200).send({ status: true, message: existingCart });
//     }

//     const data = {
//       userId: userId,
//       userName : userId.fname,
//       items: [{ productId: productId, quantity: req.body.quantity }],
//       totalPrice: product.price * req.body.quantity,
//       totalItems: 1,
//     };
//     const newCart = await cartModel.create(data);
//     return res.status(201).send({ status: true, data: newCart });
//   } catch (err) {
//     return res.status(500).send({ status: false, message: err.message });
//   }
// };


const createCart = async(req,res)=>{
  const  _id  = req.userId;
  const {productId , color , quantity , price } = req.body
  
   
    let newCart = await new cartModel({
      userId : _id,
      productId,
      color,
      price,
      quantity,
      
    }).save()
    res.send(newCart)
}

const addToCart = async(req,res)=>{
    let userId = req.userId
    const {productId , color , quantity , price , availableSizes} = req.body
    
    const user = await userModel.findById(userId)
    const alreadyAdded = user.wishlist.find((id)=>id.toString()===productId)
        let cart = await cartModel.findByIdAndUpdate(userId,{
            $push: {cart: productId}
        },{
            new: true,
        })
        res.send(cart)
}

const updatedCart = async function (req, res) {
  try {
    const userId = req.params.userId;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).send({ status: false, msg: "userId is Invalid" });
    }
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).send({ status: false, message: "user not exist in Database" });
    if (req.userId != userId) return res.status(403).send({ status: false, message: "Authorization failed" });
    let data = req.body;
    let { cartId, productId, removeProduct } = data;
    if (!ObjectId.isValid(cartId)) {
      return res.status(400).send({ status: false, msg: "cartId is Invalid" });
    }

    let cart = await cartModel.findById(cartId);
    if (!cart) return res.status(404).send({ status: false, msg: "cart is not present in DB " });
    if (userId != cart.userId) return res.status(400).send({ status: false, Message: "userId in params should be equal to userId of Cart ", });

    // if (cart.isDeleted == true) return res.status(400).send({ status: false, msg: "cart is Already Deleted" })

    if (!ObjectId.isValid(productId)) { return res.status(400).send({ status: false, msg: "productId is Invalid" }); }

    let product = await productModel.findById(productId);
    if (!product) return res.status(404).send({ status: false, msg: "product is not present in DB " });

    if (product.isDeleted == true) return res.status(400).send({ status: false, msg: "product is  Deleted" });

    if (!isValid(removeProduct))
      return res.status(400).send({ status: false, message: "please enter " });
    if (!/^[0|1]{1}$/.test(removeProduct))
      return res.status(400).send({ status: false, message: "remove product should be either 0 or 1", });

    if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, msg: "Noting to Update in Request from Body" }); }

    for (let i = 0; i < cart.items.length; i++) {
      if (cart.items[i].productId.toString() == product._id.toString()) {
        if (removeProduct == 1 && cart.items[i].quantity > 1) {
          cart.items[i].quantity = cart.items[i].quantity - 1;
          cart.save();
          const updatedCart = await cartModel.findOneAndUpdate({ _id: cartId },
            {
              $inc: { totalPrice: -product.price },
              totalItems: cart.items.length,
            }, { new: true });

          updatedCart.items = cart.items;

          return res.status(200).send({ status: true, message: "product added to cart", data: updatedCart, });
        } else {
          const updatedCart = await cartModel.findOneAndUpdate(
            { _id: cartId },
            {
              $pull: { items: { productId: productId } },
              $inc: {
                totalItems: -1,
                totalPrice: -(product.price * cart.items[i].quantity),
              },
            },
            { new: true }
          );
          return res.status(200).send({ status: true, message: "product  is removed", data: updatedCart, });
        }
      }
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const getCart = async function (req, res) {
  try {
    // const userId = req.params.userId;
    // if (!ObjectId.isValid(userId)) {
    //   return res.status(400).send({ status: false, msg: "userId is Invalid" });
    // }
    // const user = await userModel.findById(userId);
    // if (!user) return res.status(404).send({ status: false, message: "user not exist in Database" });

    // if (req.userId != userId) return res.status(403).send({ status: false, message: "Authorization failed" });


    // const getCartData = await cartModel.findOne({ userId: userId }).populate([{ path: "items.productId" }]);

    // if (!getCartData) return res.status(404).send({ status: false, message: "cart not found" });

    // return res.status(200).send({ status: true, message: "Cart Details", data: getCartData });


   const _id  = req.userId;
   const cart = await cartModel.find({userId: _id}).populate("color").populate("productId")
   return res.send(cart)
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};



const deleteCart = async function (req, res) {
  try {
    const _id = req.userId;
    const user = await userModel.findOne({_id})
    const cart = await cartModel.findOneAndUpdate({orderby: user._id}, {products: [],cartTotal: 0},{new:true})
    console.log(cart)
    res.status(200).send({message:"product removed", data: cart});
  } catch (error) {
    res.status(500).send({ status: false, Message: error.message  });
  }
};

const removeProductFromCart = async(req,res)=>{
  const _id  = req.userId;
  const {cartItemId}  = req.params
  const deleteProduct = await cartModel.deleteOne({userId:_id,_id:cartItemId})
  res.send(deleteProduct)
}

const updateQuantityFromCart = async(req,res)=>{
  const _id  = req.userId;
  const {cartItemId, newQuantity}  = req.params
  const cartItem = await cartModel.findOne({userId:_id,_id:cartItemId})
  cartItem.quantity = newQuantity
  cartItem.save()
  res.send(cartItem)
}

const applyCupon = async(req,res)=>{
  const _id = req.userId
  
  const { coupon } = req.body
  const validCoupon = await couponModel.findOne({name:coupon})
 
  if(validCoupon === null){
    return res.status(400).send({message: "Invalid Coupon"})
  }
  const user = await userModel.findOne({_id})
  let {products , cartTotal} = await cartModel.findOne({orderby: user._id}).populate("products.product")
  let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100 ).toFixed(2)
  await cartModel.findOneAndUpdate(
    {orderby: user._id},
    {totalAfterDiscount},
    {new: true}
  )
  res.send(totalAfterDiscount)
}

module.exports = { createCart, addToCart , updatedCart, getCart, deleteCart,removeProductFromCart, updateQuantityFromCart ,applyCupon }