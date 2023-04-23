import { React, useEffect, useState } from 'react';
import CustomInput from '../Components/CustomInput';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createCoupon, getACoupon , resetState, updateACupon } from '../features/coupon/couponSlice';


let schema = yup.object().shape({
    name: yup.string().required("Coupon Name is Required"),
    expiry: yup.date().required("Expiry date is Required"),
    discount: yup.number().required("Discount percentage is Required"),
})


const AddCoupon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getCouponId = location.pathname.split("/")[3];
    const newCoupon = useSelector((state) => state.coupon);
    const { isSuccess, isError, isLoading, createdCoupon , updatedCoupon , couponName, couponDiscount, couponExpiry} = newCoupon;
    const changeDateFormat = (date)=>{
        const newDate = new Date(date).toLocaleDateString();
        const [month, day, year] = newDate.split("/");
        return [year, month, day].join("-");
    }
 
    useEffect(()=>{
        if(getCouponId !== undefined){
            dispatch(getACoupon(getCouponId))
        }else{
            dispatch(resetState())
        }
    },[getCouponId])

    useEffect(() => {
        if (isSuccess && createdCoupon) {
            toast.success('Coupon Added Succesfully');
            dispatch(resetState())
        } 
        if(isSuccess  && updatedCoupon){
            toast.success('Coupon updated Succesfully');
            navigate("/admin/coupon-list")
        }
        if (isError) {
            toast.error('Something Went Wrong');
        }
    }, [isSuccess, isError, isLoading])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: couponName || "",
            expiry :  changeDateFormat(couponExpiry) || "",
            discount:  couponDiscount || ""
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if(getCouponId !== undefined){
                const data={id:getCouponId, couponData:values}
                dispatch(updateACupon(data))
                dispatch(resetState())
            }else{
                dispatch(createCoupon(values));
                formik.resetForm();
                setTimeout(() => {
                   dispatch(resetState())
                }, 300)
            }
        },
    });



    return (
        <div>
            <h3 className='mb-4 title'>{getCouponId !== undefined ? "Edit" : "Add"} Coupon</h3>
            <div>
                <form action='' onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"                       
                        name="name"
                        onCh={formik.handleChange("name")}
                        onBl={formik.handleBlur("name")}
                        val={formik.values.name}
                        label="Enter Coupon name"
                        id="coupon"
                    />
                    <div className='error'>
                        {formik.touched.name && formik.errors.name}
                    </div>

                    <CustomInput
                        type="date"                       
                        name="expiry"
                        onCh={formik.handleChange("expiry")}
                        onBl={formik.handleBlur("expiry")}
                        val={formik.values.expiry}
                        label="Enter expiry date"
                        id="expiry"
                    />
                    <div className='error'>
                        {formik.touched.expiry && formik.errors.expiry}
                    </div>

                    <CustomInput
                        type="number"                       
                        name="discount"
                        onCh={formik.handleChange("discount")}
                        onBl={formik.handleBlur("discount")}
                        val={formik.values.discount}
                        label="Enter discount percent"
                        id="discount"
                    />
                    <div className='error'>
                        {formik.touched.discount && formik.errors.discount}
                    </div>
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'> {getCouponId !== undefined ? "Edit" : "Add"} Coupon</button>
                </form>
            </div>
        </div>
    )
}

export default AddCoupon