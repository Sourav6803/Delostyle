import React, { useEffect } from 'react'

import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom"
import { getOrders } from '../features/auth/authSlice';


const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'OrderID',
        dataIndex: 'orderID',
    },
    {
        title: 'OrderDate',
        dataIndex: 'orderDate',
    },
    {
        title: 'CustInfo',
        dataIndex: 'custInfo',
    },
    {
        title: 'TotalAmount',
        dataIndex: 'totalAmount',
    },
    {
        title: 'status',
        dataIndex: 'status',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    }
];


const Orders = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrders())
    }, [])
    const orderState = useSelector((state) => state.auth.orders);

    const data1 = [];
    for (let i = 3; i < orderState.length; i++) {
        data1.push({
            key: i+1,
            orderID: orderState[i]._id,
            custInfo:orderState[i].userId.fname ,
            orderDate :new Date(orderState[i].createdAt).toLocaleString(),
            // custInfo : orderState[i]._id.fname,
            totalAmount:orderState[i].totalPrice,
            status :orderState[i].status,
            action: (<>
                <Link to="/" className='fs-3 text-danger'> <BiEdit /></Link>
                <Link to="/" className='ms-3 fs-3 text-danger'> <AiFillDelete/></Link>
            </>)
        });
    }
    return (
        <div>
            <h3 className='mb-4 title'>Orders</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Orders;