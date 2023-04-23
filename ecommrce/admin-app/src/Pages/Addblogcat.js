import { React, useEffect } from 'react';
import CustomInput from '../Components/CustomInput'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createBlogCategory } from '../features/bCategory/bcategorySlice';

let schema = yup.object().shape({
    title: yup.string().required("Blog category is Required"),
})


const Addblogcat = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newBlogCat = useSelector((state) => state.bCategory);
    const { isSuccess, isError, isLoading, createdBlogCategory } = newBlogCat;

    useEffect(() => {
        if (isSuccess && createdBlogCategory) {
            toast.success('Blog category Added Succesfully');
        } if (isError) {
            toast.error('Something Went Wrong');
        }
    }, [isSuccess, isError, isLoading])



    const formik = useFormik({
        initialValues: {
            title: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createBlogCategory(values));
            formik.resetForm();
            setTimeout(() => {
                navigate('/admin/blog-category-list');
            }, 3000)
        },
    });

    return (
        <div>
            <h3 className='mb-4 title'>Add blog Category</h3>
            <div>
                <form action='' onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        name="title"
                        onCh={formik.handleChange("title")}
                        onBl={formik.handleBlur("title")}
                        val={formik.values.title}
                        label="Enter bolg Category"
                        id="blogCat"
                    />
                    <div className='error'>
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'> Add Blog Category</button>
                </form>
            </div>
        </div>
    )
}

export default Addblogcat