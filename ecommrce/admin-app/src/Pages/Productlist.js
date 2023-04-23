import React, { useEffect } from 'react';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai"
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/product/productSlice';
import Link from 'antd/es/typography/Link';

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
        title: 'Price',
        dataIndex: 'price',
    },
    {
        title: 'IsFreeShipping',
        dataIndex: 'isFreeShipping',
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
    },
    {
        title: 'Category',
        dataIndex: 'category',
    },
    {
        title: 'Color',
        dataIndex: 'color',
    },
    {
        title: 'AvailableSizes',
        dataIndex: 'availableSizes',
    },
    {
        title: 'Installments',
        dataIndex: 'installments',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];


const Productlist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts())
    }, [])

    const productState = useSelector((state) => state.product.products);
    const data1 = [];
    for (let i = 0; i < productState.length; i++) {
        data1.push({
            key: i+1,
            title: productState[i].title,
            price: productState[i].price,
            isFreeShipping: productState[i].isFreeShipping.toString(),
            brand: productState[i].brand,
            category: productState[i].category,
            color: productState[i].color,
            installments: productState[i].installments,
            availableSizes: productState[i].availableSizes,
            action: (<>
                <Link to="/" className='fs-3 text-danger'> <BiEdit /></Link>
                <Link to="/" className='ms-3 fs-3 text-danger'> <AiFillDelete/></Link>
            </>)
        });
    }

    return (
        <div>
            <h3 className='mb-4 title'>Product Lists</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Productlist;