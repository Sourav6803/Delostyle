import React, { useEffect, useState } from 'react'

import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom"
import { deleteACoupon, getAllCoupons } from "../features/coupon/couponSlice";
import CustomModal from '../Components/CustomModal';
import { resetState } from '../features/coupon/couponSlice';


const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'CouponName',
    dataIndex: 'cname',
  },
  {
    title: 'Doscount',
    dataIndex: 'discount',
  },
  {
    title: 'Expiary',
    dataIndex: 'expiry',
  },

  {
    title: 'Action',
    dataIndex: 'action',
  },
];


const CouponList = () => {

  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("")
  const showModal = (e) => {
    setOpen(true);
    setCouponId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(getAllCoupons())
  }, [])


  const couponState = useSelector((state) => state.coupon.coupons)
  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i + 1,
      cname: couponState[i].name,
      discount: couponState[i].discount,
      expiry: new Date(couponState[i].expiry).toLocaleString(),
      action: (<>
        <Link to={`/admin/coupon/${couponState[i]._id}`} className='fs-3 text-danger'> <BiEdit /></Link>
        <button onClick={()=>showModal(couponState[i]._id)} className='ms-3 fs-3 text-danger bg-transparent border-0'> <AiFillDelete /></button>
      </>)
    });

  }
  const deleteCoupon=(e)=>{
    dispatch(deleteACoupon(e))
      setOpen(false)
      navigate("/admin/coupon-list/")
      setTimeout(()=>{
          dispatch(getAllCoupons())
      },100)
  }
  return (
    <div>
      <h3 className='mb-4 title'>Coupons Lists</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => { deleteCoupon(couponId) }}
        title="Are you sure to delete this Coupon?"
      />
    </div>
  )
}

export default CouponList;