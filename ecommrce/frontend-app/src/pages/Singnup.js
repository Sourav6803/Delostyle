import React from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import Container from '../components/Container';
import Meta from '../components/Meta';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/user/userSlice';

const signupSchema = yup.object().shape({
    fname: yup.string().required("First Nmae is required"),
    lname: yup.string().required("Last Name is required"),
    email: yup.string().required("Email shouldbe valid").required("Email required"),
    phone: yup.string().required("Mobile No is required"),
    password: yup.string().required("Password is required"),
});


const Singnup = () => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            fname: '',
            lname: '',
            email: '',
            phone: '',
            password: '',
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
                                    type="text"
                                    name='fname'
                                    placeholder='First Name'
                                    value={formik.values.fname}
                                    onChange={formik.handleChange("fname")}
                                    onBlur={formik.handleBlur("fname")}
                                />
                                <div className='error'>
                                    {formik.touched.fname && formik.errors.fname}
                                </div>
                                <CustomInput
                                    type="text"
                                    name='lname'
                                    placeholder='Last Name'
                                    value={formik.values.lname}
                                    onChange={formik.handleChange("lname")}
                                    onBlur={formik.handleBlur("lname")}
                                />
                                <div className='error'>
                                    {formik.touched.lastname && formik.errors.lname}
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
                                <CustomInput
                                    type="tel"
                                    name='phone'
                                    placeholder='Mobile No'
                                    value={formik.values.phone}
                                    onChange={formik.handleChange("phone")}
                                    onBlur={formik.handleBlur("phone")}
                                />
                                <div className='error'>
                                    {formik.touched.phone && formik.errors.phone}
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
                                <div className='d-flex justify-content-center gap-15 align-item-center'>
                                    <button className='button border-0'>Create Account</button>
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