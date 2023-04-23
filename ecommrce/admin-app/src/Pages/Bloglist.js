import React, { useEffect } from 'react'

import { Table } from 'antd';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux';
import Link from 'antd/es/typography/Link';
import { getBlog } from '../features/blog/blogSlice';


const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Title',
        dataIndex: 'title',
    },
    {
        title: 'Category',
        dataIndex: 'category',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
    
];


const Bloglist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBlog())
    }, [])
    const getBlogState = useSelector((state) => state.blog.blogs);
    const data1 = [];
    for (let i = 0; i < getBlogState.length; i++) {
        data1.push({
            key: i+1,
            title: getBlogState[i].title,
            category: getBlogState[i].category,
            action: (<>
                <Link to="/" className='fs-3 text-danger'> <BiEdit /></Link>
                <Link to="/" className='ms-3 fs-3 text-danger'> <AiFillDelete/></Link>
            </>)
        });
    }
    return (
        <div className=''>
            <h3 className='mb-4 title'>Blogs Lists</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Bloglist