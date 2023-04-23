
import { React, useEffect } from 'react'
import CustomInput from '../Components/CustomInput';
import { useDispatch, useSelector } from "react-redux";
import {useLocation , useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createColor } from "../features/color/colorSlice"

let schema = yup.object().shape({
    title: yup.string().required("Color is Required"),
})

const Addcolor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newColor = useSelector((state) => state.color);
    const { isSuccesss, isError, isLoading, createdColor } = newColor;

    useEffect(() => {
        if (isSuccesss && createdColor) {
            toast.success('Color Added Succesfully');
        } if (isError) {
            toast.error('Something Went Wrong');
        }
    }, [isSuccesss, isError, isLoading])

    const formik = useFormik({
        initialValues: {
            title: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createColor(values));
            formik.resetForm();
            setTimeout(() => {
                navigate('/admin/color-list');
            }, 3000)
        },
    });

    return (
        <div>
            <h3 className='mb-4 title'>Add Color Category</h3>
            <div>
                <form action='' onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"

                        label="Add Color category"
                        onCh={formik.handleChange("title")}
                        onBl={formik.handleBlur("title")}
                        val={formik.values.title}
                        id="color"
                    />
                    <div className='error'>
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'> Add color Category</button>
                </form>
            </div>
        </div>
    )
}

export default Addcolor;