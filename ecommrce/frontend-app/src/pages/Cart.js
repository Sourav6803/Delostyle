import React, { useEffect, useState } from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import Meta from '../components/Meta';
import { AiFillDelete } from "react-icons/ai"
import { Link } from 'react-router-dom';
// import { BiDice2 } from 'react-icons/bi';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartProduct, getUserCart, updateCartProduct } from '../features/user/userSlice';

const Cart = () => {
    const dispatch = useDispatch()
    const [productUpdateDetail, setProductUpdateDetail] = useState(null)
    const [totalAmount , setTotalaAmount] = useState(null)

    const userCartState = useSelector((state)=>state?.auth?.cartProducts)
    
    
    useEffect(()=>{
        dispatch(getUserCart())
    },[])
    

    useEffect(()=>{
        if(productUpdateDetail !== null){
            dispatch(updateCartProduct({cartItemId:productUpdateDetail?.cartItemId , quantity:productUpdateDetail?.quantity}))
            setTimeout(()=>{
               dispatch(getUserCart())
            },200)
        }
        
    },[productUpdateDetail])

    const deleteACartProduct = (cartItemId)=>{
        dispatch(deleteCartProduct(cartItemId))
        setTimeout(()=>{
            dispatch(getUserCart())
        },200)
    }

    useEffect(()=>{
        let sum = 0
        for(let i=0;i<userCartState?.length;i++){
            sum = sum + (Number(userCartState[i].quantity) * userCartState[i].price)
            setTotalaAmount(sum)
        }
    },[userCartState])
    
    
    return (
        <>
            <Meta title={"Cart"} />
            <BreadCrumbs title='Cart' />
            <Container class1='cart-wrapper home-wrapper-2 py-5'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='cart-header d-flex py-3 justify-content-between align-items-center'>
                                <h4 className='cart-col-1'>Product</h4>
                                <h4 className='cart-col-2'>Price</h4>
                                <h4 className='cart-col-3'>Quantity</h4>
                                <h4 className='cart-col-4'>total</h4>
                                
                            </div>
                            {userCartState && userCartState.map((item,index)=>{
                                    return (
                                        <div key={index} className='cart-data d-flex mb-2 py-3 justify-content-between align-items-center'>
                                <div className='cart-col-1 d-flex gap-15 align-items-center'>
                                    <div className='w-25' style={{ border: " 1px solid grey" }}>
                                        <img src= {item.productId.productImage ? item.productId.productImage : 'images/watch.jpg' } className='img-fluid' alt='watch' />
                                    </div>
                                    <div className='w-75'>
                                        <p>{item.productId.title}</p>
                                        <p>Size: </p>
                                        <p className='d-flex gap-3'>Color : <ul className='colors ps-0'>
                                            <li style={{backgroundColor:item.color.title}}></li>  
                                        </ul></p>
                                    </div>
                                </div>
                                <div className='cart-col-2'>
                                    <h5 className='price'>${item?.price}</h5>
                                </div>
                                <div className='cart-col-3 d-flex align-items-center gap-15'>
                                    <div>
                                        <input className='form-control' 
                                        min={1} 
                                        max={5} 
                                        defaultValue={1} 
                                        type="number" 
                                        name="" 
                                        id='' 
                                        value={productUpdateDetail?.quantity ? productUpdateDetail?.quantity : item?.quantity} 
                                        onChange={(e)=>{setProductUpdateDetail({cartItemId:item?._id , quantity:e.target.value})}}/>
                                    </div>
                                    <div>
                                        <AiFillDelete onClick={()=>{deleteACartProduct(item?._id)}} className='icon text-danger' />
                                    </div>
                                </div>
                                <div className='cart-col-4'>
                                    <h5 className='price'>${item?.price * item?.quantity}</h5>
                                </div>
                            </div>
                                    )
                                })}
                            
                        </div>
                        <div className='col-12 py-2 mt-4'>
                            <div className='d-flex justify-content-between'>
                                <Link to="/product" className='button'>Continue To Shopping</Link>
                            </div>
                            {
                                (totalAmount !== null || totalAmount !==0) &&
                                <div className='d-flex flex-column align-items-end '>
                                <h4>Subtotal : ${totalAmount}</h4>
                                <p>Taxes And Shipping calculated at checkout</p>
                                <Link to="/checkout" className='button'>Checkout</Link>
                            </div>
                            }
                        </div>
                    </div>
            </Container>
        </>
    )
}

export default Cart