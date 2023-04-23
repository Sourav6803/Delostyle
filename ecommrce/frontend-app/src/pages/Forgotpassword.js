import React from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import Meta from '../components/Meta';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordToken } from '../features/user/userSlice';

const emailSchema = yup.object().shape({
    email: yup.string().required("Email shouldbe valid").required("Email erquired"),
});

const Forgotpassword = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: emailSchema,
        onSubmit: values => {
            dispatch(forgotPasswordToken(values))
            // navigate('/')  
        },
    });
    return (
        <>
            <Meta title={"Forgot Password"} />
            <BreadCrumbs title='Forgot Password' />
            <Container class1='login-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='auth-card' style={{ border: "1px solid grey" }}>
                            <h3 className='text-center mb-3'>Reset Your Password</h3>
                            <h6 className='text-center mt-2 mb-3'>Enter your Register Email</h6>
                            <p className='text-center mt-2 mb-3'>We will send you a email to reset your password</p>
                            <form action='' onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                                <CustomInput type="email" name='email' placeholder='email' onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                    value={formik.values.email} 

                                />
                                <div className='errors text-center'>
                                    {formik.touched.email && formik.errors.email}
                                </div>
                                <div>                    
                                    <div className=' mt-3 d-flex justify-content-center flex-column gap-15 align-items-center '>
                                        <button className='button'>Submit</button>
                                        <Link to="/login" className='d-flex justify-content-center' >Cancel</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Forgotpassword