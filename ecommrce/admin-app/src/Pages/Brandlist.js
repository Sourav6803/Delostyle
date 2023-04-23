import React, { useEffect, useState } from 'react'

import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteABrand, getBrands, resetState } from '../features/brand/brandSlice';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import CustomModal from '../Components/CustomModal';

const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'BrandName',
        dataIndex: 'bname',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];


const Brandlist = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [brandId, setbrandId] = useState("")
    const showModal = (e) => { 
        setOpen(true);
        setbrandId(e);
    };
    
    const hideModal = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetState())
        dispatch(getBrands())
    }, [])
    const brandState = useSelector((state) => state.brand.brands)

    const data1 = [];
    for (let i = 0; i < brandState.length; i++) {
        data1.push({
            key: i + 1,
            bname: brandState[i].title,
            action: (<>
                <Link to={`/admin/brand/${brandState[i]._id}`} className='fs-3 text-danger'> <BiEdit /></Link>
                <button onClick={()=>showModal(brandState[i]._id)} className='ms-3 fs-3 text-danger bg-transparent border-0'> <AiFillDelete /></button>
            </>)
        });
    }
    const deleteBrand = (e)=>{
        dispatch(deleteABrand(e))
        setOpen(false)
        navigate("/admin/brand-list/")
        setTimeout(()=>{
            dispatch(getBrands())
        },100)
    }
    return (
        <div>
            <h3 className='mb-4 title'>Brand Lists</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction = {()=>{deleteBrand(brandId)}}
                title="are you sure to delete this brand?"
            />
        </div>
    )
}

export default Brandlist;