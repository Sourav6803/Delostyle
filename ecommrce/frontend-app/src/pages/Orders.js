import React, { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container'
import BreadCrumbs from '../components/BreadCrumbs'
import { useDispatch, useSelector } from 'react-redux';
import {getOrders} from '../features/user/userSlice'

const Orders = () => {
    const dispatch = useDispatch()
    const orderState = useSelector(state=>state?.auth?.getOrderdProducts)
    console.log(orderState)
    useEffect(()=>{
        dispatch(getOrders())
    },[])
  return (
    // <>
    //     <BreadCrumbs title="My orders"/>
    //     <Container class1="cart-wrapper home-wrapper-2 py-5">
    //         <div className='row'>
    //             <div className='col-12'>
    //                 <div className='row'>
    //                     <div className='col-3'>
    //                         <h5>OrderId</h5>
    //                     </div>
    //                     <div className='col-3'>
    //                         <h5>Total Amount</h5>
    //                     </div>
    //                     <div className='col-3'>
    //                         <h5>Total Amount After Discount</h5>
    //                     </div>
    //                     <div className='col-3'>
    //                         <h5>status</h5>
    //                     </div>
    //                 </div>
    //             </div>

    //             <div className='col-12 mt-3'>
    //                {
    //                 orderState && orderState.map((item,index)=>{
    //                     return(
    //                         <div className='row my-3 ' key={index}>
    //                     <div className='col-3'>
    //                         <p>{item?._id}</p>
    //                     </div>
    //                     <div className='col-3'>
    //                         <p>{item?.totalPrice}</p>
    //                     </div>
    //                     <div className='col-3'>
    //                         <p>{item?.totalPriceAfterDiscount}</p>
    //                     </div>
    //                     <div className='col-3'>
    //                         <p>{item?.orderstatus}</p>
    //                     </div>
    //                     <div className='col-12'>
    //                         <div className='row bg-secondary p-3'>
    //                         <div className='col-3'>
    //                         <p>Product Name</p>
    //                     </div>
    //                     <div className='col-3'>
    //                         <p>quantity</p>
    //                     </div>
    //                     <div className='col-3'>
    //                         <p>price</p>
    //                     </div>
    //                     <div className='col-3'>
    //                         <p>Color</p>
    //                     </div>
    //                         </div>
    //                     </div>
    //                     <div className='col-12'>
    //                         <div className='row bg-secondary p-3'>
    //                         <div className='col-3'>
    //                         <p>Product Name</p>
    //                     </div>
    //                     <div className='col-3'>
    //                         <p>quantity</p>
    //                     </div>
    //                     <div className='col-3'>
    //                         <p>price</p>
    //                     </div>
    //                     <div className='col-3'>
    //                         <p>Color</p>
    //                     </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                     )
    //                 })
    //                }
    //             </div>
    //         </div>
    //     </Container>
    // </>

    <>
            
            <BreadCrumbs title='my orders' />
            <Container class1='cart-wrapper home-wrapper-2 py-5'>
                    <div className='row'>
                        <div className='col-12'>
                            {orderState && orderState.map((item,index)=>{                             
                                    return (
                                        
                                        <div key={index} className='cart-data d-flex mb-2 py-3 justify-content-between align-items-center'>
                                <div className='cart-col-1 d-flex gap-15 align-items-center'>
                                    <div className='w-25' style={{ border: " 1px solid grey" }}>
                                        <img src= { item.orderItems[0].product.productImage} className='img-fluid' alt='watch' />
                                    </div>
                                    <div className='w-75'>
                                        <p className='orderId'>orderId: {item._id}</p>
                                        <p className='price'>{item.orderItems[0].product.title}</p>
                                        <p>{item.orderItems[0].product.price}</p>
                                        <p>Size: </p>
                                        <p className='d-flex gap-3'>Color : {item.orderItems[0].color.title}</p>
                                        
                                    </div>
                                </div>
                                <div className='cart-col-2'>
                                    <h5 className='price'>Total: {item.totalPrice}</h5>
                                </div>
                                <div className='cart-col-3 d-flex align-items-center gap-15'>
                                    <div>
                                        <h5>Quantity: {item.orderItems[0].quantity}</h5>
                                    </div>
                                    
                                </div>
                                <div className='cart-col-4'>
                                    <h5 className='price'>status: {item.orderstatus}</h5>
                                </div>
                              </div>
                                    )
                            })}
                            
                        </div>





                        
                    </div>
            </Container>
        </>
  )
}

export default Orders