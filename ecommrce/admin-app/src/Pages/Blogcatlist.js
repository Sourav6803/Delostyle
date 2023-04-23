import React, { useEffect } from 'react'

import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import Link from 'antd/es/typography/Link';
import { getCategories } from '../features/pcategory/pcategorySlice';

const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];


const Blogcatlist = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories())
    }, [])
    const bCatState = useSelector((state) => state.pCategory.pCategories);

    const data1 = [];
    for (let i = 0; i < bCatState; i++) {
        data1.push({
            key: i+1,
            name: bCatState[i].name,
            action: (<>
                <Link to="/" className='fs-3 text-danger'> <BiEdit /></Link>
                <Link to="/" className='ms-3 fs-3 text-danger'> <AiFillDelete/></Link>
            </>)
        });
    }
    return (
        <div>
            <h3 className='mb-4 title'>Blogs Category Lists</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Blogcatlist