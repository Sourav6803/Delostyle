import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BreadCrumbs from '../components/BreadCrumbs';
import Meta from '../components/Meta';
import {HiArrowLeft} from "react-icons/hi"
import Container from '../components/Container';
import { useDispatch, useSelector } from "react-redux"
import { getABlog } from '../features/blogs/blogSlice';


const SingleBlog = () => {
    const blogState = useSelector(state=>state?.blog?.singleBlog)
    
    const location = useLocation()
    const getBlogId = location.pathname.split('/')[2]
    

    const dispatch = useDispatch()

    useEffect(()=>{
        getBlog()
    },[])

    const getBlog = ()=>{
        dispatch(getABlog(getBlogId))
    }
    return (
        <>
            <Meta title={blogState?.title} />
            <BreadCrumbs title={blogState?.title} />
            <Container class1='blog-wrapper home-wrapper-2 py-5'>
                    <div className='row'>
                        <div className='col-9'>
                            <div className='single-blog-card'>
                            <Link to="/blogs" className='d-flex align-items-center gap-10'> <HiArrowLeft className='fs-3' />Go Back To Blogs</Link>
                                <h5 className='title'> {blogState?.title}</h5>
                                <img src={blogState?.images}  alt='blog1' className='img-fluid w-100 my-4' />
                                <p className='description'>{blogState?.description}</p>
                            </div>
                        </div>
                    </div>
            </Container>
        </>
    )
}

export default SingleBlog