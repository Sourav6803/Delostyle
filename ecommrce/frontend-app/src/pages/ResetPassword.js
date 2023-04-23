import React from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import Container from '../components/Container';
import Meta from '../components/Meta';
import CustomInput from '../components/CustomInput';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../features/user/userSlice';

const passwordSchema = yup.object().shape({
    password: yup.string().required("Password required"),
});


const ResetPassword = () => {
    const location = useLocation()
    const getToken = location.pathname.split("/")[2]

    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: passwordSchema,
        onSubmit: values => {
            dispatch(resetPassword({token:getToken , password:values?.password}))
            // navigate('/login')  
        },
    });

    return (
        <>
            <Meta title={"Reset Password"} />
            <BreadCrumbs title='Reset Password' />
            <Container class1='login-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='auth-card' style={{ border: "1px solid grey" }}>
                            <h3 className='text-center mb-3'>Reset Password</h3>
                            <form onSubmit={formik.handleSubmit} action='' className='d-flex flex-column gap-15'>
                                <CustomInput type="password" name='password' placeholder='Enter Password' onChange={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")}
                                    value={formik.values.password} />
                                    <div className='errors text-center'>
                                    {formik.touched.password && formik.errors.password}
                                </div>
                                
                                <div className='d-flex justify-content-center gap-15 align-item-center'>
                                    <button className='button border-0'>Password Chenged</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>   

        </>
    )
}

export default ResetPassword