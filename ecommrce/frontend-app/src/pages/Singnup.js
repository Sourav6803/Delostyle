import React, { useEffect, useState } from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import Container from '../components/Container';
import Meta from '../components/Meta';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'

const signupSchema = yup.object().shape({
    firstName: yup.string().required("First Nmae is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().required("Email shouldbe valid").required("Email required"),
    mobile: yup.string().required("Mobile No is required"),
    password: yup.string().required("Password is required"),
    gender: yup.string().required("Gender is required"),
    DOB: yup.string().required("DOB is required"),
    address: yup.string().required("Address is required"),
});


const Singnup = () => {
    const [gender, setGender] = useState('')
    const [image, setImage] = useState()
    // console.log(gender)

    const authState = useSelector((state => state?.auth))

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            password: '',
            gender: '',
            address: '',
            profileImage: ''

        },
        validationSchema: signupSchema,
        onSubmit: values => {
            
            dispatch(registerUser(values))

        },
    });



    return (
        <>
            <Meta title={"Sing Up"} />
            <BreadCrumbs title='Singup' />
            <Container class1='login-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='auth-card' style={{ border: "1px solid grey" }}>
                            <h3 className='text-center mb-3'>Singup</h3>
                            <form action='' onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>

                                <CustomInput
                                    classname ="profileImage"
                                    type="file"
                                    name='profileImage'
                                    placeholder='Profile image'
                                    value={formik.values.profileImage}
                                    onChange={formik.handleChange("profileImage")}
                                    onBlur={formik.handleBlur("profileImage")}
                                />
                                <div className='error'>
                                    {formik.touched.profileImage && formik.errors.profileImage}
                                </div>

                                {/* <input 
                                    type='file'
                                    accept='/image/*'
                                    onChange={e=>{
                                         image = e.target.files[0]
                                        if(file && file.type.substring(0,5)==="iamge"){
                                            setImage(file)
                                        }else{
                                            setImage(null)
                                        }
                                    }}
                                /> */}


                                <CustomInput
                                    type="text"
                                    name='firstName'
                                    placeholder='First Name'
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange("firstName")}
                                    onBlur={formik.handleBlur("firstName")}
                                />
                                <div className='error'>
                                    {formik.touched.firstName && formik.errors.firstName}
                                </div>
                                <CustomInput
                                    type="text"
                                    name='lastName'
                                    placeholder='Last Name'
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange("lastName")}
                                    onBlur={formik.handleBlur("lastName")}
                                />
                                <div className='error'>
                                    {formik.touched.lastName && formik.errors.lastName}
                                </div>
                                <CustomInput
                                    type="email"
                                    name='email'
                                    placeholder='Email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                />
                                <div className='error'>
                                    {formik.touched.email && formik.errors.email}
                                </div>
                                <PhoneInput
                                    type="tel"
                                    name='mobile'
                                    country={'in'}
                                    placeholder='Mobile No'
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange("mobile")}
                                    onBlur={formik.handleBlur("mobile")}
                                />
                                <div className='error'>
                                    {formik.touched.mobile && formik.errors.mobile}
                                </div>

                                <CustomInput
                                    type="password"
                                    name='password'
                                    placeholder='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")}
                                />
                                <div className='error'>
                                    {formik.touched.password && formik.errors.password}
                                </div>
 
                                {/* <CustomInput
                                    type= "text"
                                    name='gender'
                                    placeholder='Male/Female/Other'
                                    value={formik.values.gender}
                                    onChange={formik.handleChange("gender")}
                                    onBlur={formik.handleBlur("gender")}
                                >
                                    
                                </CustomInput> */}



                                {/* <div>
                                    <label>
                                        <p>Select gender</p>
                                        <input type='radio' id='Male' name='gender' value="Male">
                                            <label htmlFor='Male' > Male</label>
                                        </input>
                                    </label>
                                </div>

                                <div className='error'>
                                    {formik.touched.gender && formik.errors.gender}
                                </div> */}

                                <div>
                                    <p>Select Gender:</p>
                                    <input className='m-2' type="radio" id='1' value="Male" name="gender" onChange={formik.handleChange("gender")} onBlur={formik.handleBlur("gender")}/>Male
                                    <input className='m-2' type="radio" id='2' value="Female" name="gender"  onChange={formik.handleChange("gender")} onBlur={formik.handleBlur("Female")}/> Female
                                    <input className='m-2' type="radio" id='3' value="Other" name="gender"  onChange={formik.handleChange("gender")} onBlur={formik.handleBlur("Other")} /> Other
                                </div>

                                <CustomInput
                                    type="Date"
                                    name='DOB'
                                    placeholder='DOB'
                                    value={formik.values.DOB}
                                    onChange={formik.handleChange("DOB")}
                                    onBlur={formik.handleBlur("DOB")}
                                />
                                <div className='error'>
                                    {formik.touched.DOB && formik.errors.DOB}
                                </div>

                                <CustomInput
                                    type="text"
                                    name='address'
                                    placeholder='address'
                                    value={formik.values.address}
                                    onChange={formik.handleChange("address")}
                                    onBlur={formik.handleBlur("address")}
                                />
                                <div className='error'>
                                    {formik.touched.address && formik.errors.address}
                                </div>


                                <div className='d-flex justify-content-center gap-15 align-item-center'>
                                    <button className='button border-0' type='submit'>Create Account</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Singnup