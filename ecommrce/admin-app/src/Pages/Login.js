import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import CustomInput from "../Components/CustomInput";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux"
import { login } from "../features/auth/authSlice";


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let schema = Yup.object().shape({
        email: Yup.string().email("Email Shold Be Valid").required("Email is Required"),
        password: Yup.string().required("Password is Required")
    })
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ""
        },
        validationSchema: schema,
        onSubmit: values => {
            dispatch(login(values))
            alert(JSON.stringify(values, null, 2));
        },
    });
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!isLoading == false || isSuccess) {
            navigate("admin")
        }
        else {
            alert("not admin")
        }
    }, [user, isLoading, isError, isSuccess, message])
    return (
        <div className='py-5 title' style={{ background: "#ffd333", minHeight: "100vh" }}>
            <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
                <h3 className='text-center'>Login</h3>
                <p className='text-center'>Login to your account enter email</p>
                <div className="text center">
                    {message.message == "Rejected" ? "You are not Admin" : ""}
                </div>
                <form action='' onSubmit={formik.handleSubmit}>
                    <CustomInput type="text" name="email" label='Enter Email' id="email" val={formik.values.email} onCh={formik.handleChange("email")} />
                    <div className="error">
                        {formik.touched.email && formik.errors.email ? (<div>{formik.errors.email}</div>) : null}
                    </div>
                    <CustomInput type="password" name="password" label='Enter Password' id="pass" val={formik.values.password} onCh={formik.handleChange("password")} />
                    <div className="error">
                        {formik.touched.password && formik.errors.password ? (<div>{formik.errors.password}</div>) : null}
                    </div>
                    <div className="mb-3 text-end">
                        <Link to="/forgot-password;">Forgot Passowrd</Link>
                    </div>
                    <button className='border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5' style={{ background: "#ffd333" }} type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;