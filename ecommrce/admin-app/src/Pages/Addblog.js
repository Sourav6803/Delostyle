import { React, useEffect, useState } from 'react';
import CustomInput from '../Components/CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone';
import { uploadImg, delImg } from '../features/upload/uploadSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { createBlog } from '../features/blog/blogSlice';
import { getCategories } from '../features/bCategory/bcategorySlice';


let schema = yup.object().shape({
    title: yup.string().required("Title is Required"),
    description: yup.string().required("description is Required"),
    category: yup.string().required("Category is Required"),

})


const Addblog = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [images, setImages] = useState([])

    useEffect(() => {
        dispatch(getCategories());
    }, [])

    const imageState = useSelector((state) => state.upload.images);
    const bCatState = useSelector((state) => state.bCategory.bCategories);
    const blogState = useSelector((state) => state.blogs);
    const { isSuccess, isError, isLoading, createdBlog } = blogState;

    useEffect(() => {
        if (isSuccess && createBlog) {
            toast.success('Blog Added Succesfully');
        } if (isError) {
            toast.error('Something Went Wrong');
        }
    }, [isSuccess, isError, isLoading])

    const img = []
    imageState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url
        })
    })


    useEffect(() => {
        formik.values.images = img;
    }, [img]);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            category: "",
            images: ""
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createBlog(values));
            formik.resetForm();

            setTimeout(() => {
                navigate('/admin/blog-list')
            }, 3000)
        },
    });


    return (
        <div>
            <h3 className='mb-4 title'>Add Blog</h3>

            <div className=''>
                <form action='' onSubmit={formik.handleSubmit}>

                    <div className='mt-4'>
                        <CustomInput
                            type="text"
                            label="Enter Product Title"
                            name="title"
                            onCh={formik.handleChange("title")}
                            onBl={formik.handleBlur("title")}
                            val={formik.values.title} />
                    </div>
                    <div className='error'>
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <select
                        name='category'
                        value={formik.values.category}
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        id=""
                        className='form-control py-3 '>

                        <option value=""> Select Blog Category</option>
                        {bCatState.map((i, j) => {
                            return (
                                <option key={j} value={i.bname}> {i.bname}</option>
                            )
                        })}
                    </select>
                    <div className='error'>
                        {formik.touched.category && formik.errors.category}
                    </div>
                    <ReactQuill
                        theme="snow"
                        name="description"
                        onChange={formik.handleChange("description")}
                        value={formik.values.description}
                        className="mt-3"
                    />
                    <div className='error'>
                        {formik.touched.description && formik.errors.description}
                    </div>
                    <div className='bg-white border-1 p-5 text-center mt-3'>
                        <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className='showImages d-flex flex-wrap gap-3'>
                        {imageState?.map((i, j) => {
                            return (
                                <div className='position-relative' key={j}>
                                    <button
                                        type="button"
                                        onClick={() => dispatch(delImg(i.public_id))}
                                        className='btn-close position-absolute'
                                        style={{ top: "10px", right: "10px" }}></button>
                                    <img src={i.url} alt="" width={200} height={200} />
                                </div>
                            )
                        })}
                    </div>
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'> Add Blog</button>
                </form>
            </div>
        </div>
    )
}

export default Addblog