import React, { useEffect, useState } from 'react'
import BreadCrumbs from '../components/BreadCrumbs';
import Container from '../components/Container';
import Meta from '../components/Meta';
import { useDispatch, useSelector } from "react-redux"
import { getUserProductWishlist } from '../features/user/userSlice';
import { addToWishlist } from '../features/product/productSlice'
import {MdRemoveShoppingCart} from "react-icons/md"

const Wishlist = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        getWishlistFromDb()
    },[])

    const getWishlistFromDb = ()=>{
        dispatch(getUserProductWishlist())
    }

    const wishlistState = useSelector(state=>state?.auth?.wishlist)
    console.log(wishlistState)

    const removeFromWishlist = (id)=>{
        dispatch(addToWishlist(id))
        setTimeout(()=>{
            dispatch(getUserProductWishlist())
        },300)
    }

    

    
    return (
        <div>
            <Meta title={"Wishlist"} />
            <BreadCrumbs title='Wishlist' />
            <Container class1='wishlist-wrapper home-wrapper-2 py-5'>
                    <div className='row'>
                    { wishlistState.length===0 && (
                            <div className='text-center fs-3'>No data </div>
                    )}
                    {
                        wishlistState && wishlistState?.map((item,index)=>{
                        console.log(wishlistState?.item)
                            return (                            
                        <div className='col-3' key={index}>
                            <div className='wishlist-card position-relative'>
                                <img 
                                    
                                    src='images/cross.svg'
                                    onClick={()=>{removeFromWishlist(item?._id)}}
                                    alt='cross'
                                    className='position-absolute cross img-fluid' >
                                </img>
                                <div className='wishlist-card-image bg-white'  >
                                    <img src={item?.productImage} alt="watch" className='img-fluid w-100 d-block mx-auto' width={160} />
                                </div>
                                <div className=' py-3 px-3'>
                                    <h5 className='title'>{item?.title}</h5>
                                    <p className="description">{item?.description}</p>
                                    <h6 className='price'>${item?.price}</h6>
                                </div>
                            </div>
                        </div>
                            )
                        })
                    }
                        
                        
                    </div>
            </Container>
        </div>
    )
}

export default Wishlist