import { React, useEffect, useState } from 'react';
import { json, useNavigate } from "react-router-dom";
import CustomInput from "../Components/CustomInput";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { InboxOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from '../features/brand/brandSlice';
import { getCategories } from '../features/pcategory/pcategorySlice';
import { getColors } from '../features/color/colorSlice';
import { Select } from "antd";
import Dropzone from 'react-dropzone'
import { uploadImg, delImg } from '../features/upload/uploadSlice';
import { createProducts } from '../features/product/productSlice';
import { toast } from 'react-toastify';



let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("description is Required"),
  price: yup.number().required("Price required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tags is Required"),
  color: yup.array().min(1, "Peak atleast one color").required("Color is Required"),
  quantity: yup.number().required("Quantity required"),
})


const Addproduct = () => {
  const [color, setColor] = useState([]) 
  const navigate = useNavigate()

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
    formik.values.color = color
  }, [])
  // console.log(color)

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imageState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);

  const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success('Product Added Succesfully');
    } if (isError) {
      toast.error('Something Went Wrong');
    }
  }, [isSuccess, isError, isLoading])

  const coloropt = [];
  for(let i=0;i<colorState.length;i++){
    coloropt.push({
      id: colorState[i]._id,
      title: colorState[i].title
    })
  }
  // colorState.forEach((i) => {
  //   coloropt.push({
  //     id: i._id,
  //     title: i.title
  //   })
  // })
  console.log("coloropt",coloropt)

  const img = []
  // imageState.forEach((i) => {
  //   img.push({
  //     public_id: i.public_id,
  //     url: i.url
  //   })
  // })
  // console.log(img)
  for(let i=0;i<imageState.length;i++){
    img.push({
      url: imageState[i].url,
      public_id: imageState[i].public_id
    })
  }



  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [color, img]);



  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: " ",
      quantity: "",
      images: ""
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values))
      dispatch(createProducts(values));
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        navigate('/admin/product-list')
      }, 3000)
    },
  });
  

  const handleColors = (e) => {
    setColor(colorState(e))
    
  }

  return (
    <div>
      <h3 className='mb-4 title'>Add Product</h3>
      <div>
        <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title} />
          <div className='error'>
            {formik.touched.title && formik.errors.title}
          </div>
          <div >
            <ReactQuill
              theme="snow"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange("description")}
            />
          </div>
          <div className='error'>
            {formik.touched.description && formik.errors.description}
          </div>

          <select
            name='brand'
            value={formik.values.brand}
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            id='brand'
            className='form-control py-3 mb-3'
          >
            <option value=""> Select Band</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}> {i.title}</option>
              )
            })}
          </select>
          <div className='error'>
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            name='category'
            value={formik.values.category}
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            id=''
            className='form-control py-3 mb-3'>
            <option value=""> Select Category</option>
            {catState.map((i, j) => {
              return (
                <option key={j} value={i.title}> {i.title}</option>
              )
            })}
          </select>
          <div className='error'>
            {formik.touched.category && formik.errors.category}
          </div>

          <select
            name='tags'
            value={formik.values.tags}
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            id=''
            className='form-control py-3 mb-3'>
            <option value="disabled"> Select By Category</option>
            <option value="featured"> Featured</option>
            <option value="popular"> Popular</option>
            <option value="special"> Special</option>

          </select>
          <div className='error'>
            {formik.touched.tags && formik.errors.tags}
          </div>

          <Select
            mode='multiple'
            allowClear
            options={coloropt}
            className='w-100'
            placeholder="select color"
            // defaultValue={color}
            value= {formik.values.color}
            onChange={(e) =>
              handleColors(e)
            }
          >
          </Select>
          {/* <select 
            name='color'
            mode='multiple'
            
            value={formik.values.color}
            onChange={formik.handleChange("color")}
            onBlur={formik.handleBlur("color")}
            id=''
            className='form-control py-3 mb-3'
             >
            <option value=""> Select Color</option>
            {colorState.map((i,j)=>{
              return(
                <option key={j} value={i.title}>{i.title}</option>
              )
            })}
          </select> */}
          <div className='error'>
            {formik.touched.color && formik.errors.color}
          </div>

          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            val={formik.values.price}
            onCh={formik.handleChange("price")}
            onBl={formik.handleBlur("price")}
          />
          <div className='error'>
            {formik.touched.price && formik.errors.price}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            val={formik.values.quantity}
            onCh={formik.handleChange("quantity")}
            onBl={formik.handleBlur("quantity")}
          />
          <div className='error'>
            {formik.touched.quantity && formik.errors.quantity}
          </div>

          <div className='bg-white border-1 p-5 text-center'>
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
            {imageState.map((i, j) => {
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

          <button className='btn btn-success border-0 rounded-3' type='submit'>Add Product</button>
        </form>
      </div>
    </div>
  )
}

export default Addproduct