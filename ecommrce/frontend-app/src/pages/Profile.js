import React, { useState } from 'react'
import BreadCrumbs from '../components/BreadCrumbs'
import Container from '../components/Container'
import { useFormik} from "formik"
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile } from '../features/user/userSlice'
import {FiEdit} from "react-icons/fi"

const profileSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().required("Email shouldbe valid").required("Email erquired"),
    mobile: yup.number().required("Mobile is required"),
});

const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userState = useSelector(state=>state?.auth?.logedUser?.myUser)
    console.log(userState)
    const [edit , setEdit] = useState(true)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: userState?.firstName,
            lastName: userState?.lastName,
            email: userState?.email,
            mobile: userState?.mobile,
        },
        validationSchema: profileSchema,
        onSubmit: values => {  
            dispatch(updateProfile(values)) 
            setEdit(true) 
        },
    });
  return (
    <>
        <BreadCrumbs title='My profile'/>
        <Container class1="cart-wrapper home-wrapper-2 py-5">
            <div className='row'>
            <div className='col-12'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h3 className='my-3 '>Update Profile</h3>
                    <FiEdit className='fs-3' onClick={()=>setEdit(false)} />
                </div>
            </div>
                <div className='col-12'>
                <form onSubmit={formik.handleSubmit}> 
                  <div className="mb-3">
                      <label htmlFor="example1" className="form-label" >First Name</label>
                      <input 
                        type="text" 
                        name='firstname' 
                        className="form-control"
                        disabled={edit} 
                        id="example1" 
                        value={formik.values.firstName}
                        onChange={formik.handleChange("firstname")}
                        onBlur={formik.handleBlur("firstname")}
                      />
                      <div className='errors'>
                            {formik.touched.firstName && formik.errors.firstName}
                      </div>
                  </div>

                  <div className="mb-3">
                      <label htmlFor="example1" className="form-label">Last Name</label>
                      <input 
                        type="text" 
                        name='lastname' 
                        className="form-control"
                        disabled={edit} 
                        id="example1"
                        value={formik.values.lastName}
                        onChange={formik.handleChange("lastName")}
                        onBlur={formik.handleBlur("lastName")}
                     />
                     <div className='errors'>
                            {formik.touched.lastName && formik.errors.lastName}
                     </div>
                  </div>

                  <div className="mb-3">
                     <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                     <input 
                        type="email" 
                        name='email' 
                        className="form-control" 
                        disabled={edit} 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                     />
                     <div className='errors'>
                            {formik.touched.email && formik.errors.email}
                     </div>
                  </div>

                  <div className="mb-3">
                      <label htmlFor="example1" className="form-label">Mobile Number</label>
                      <input 
                        type="number" 
                        name='mobile' 
                        className="form-control"
                        disabled={edit}  
                        id="example1"
                        value={formik.values.mobile}
                        onChange={formik.handleChange("mobile")}
                        onBlur={formik.handleBlur("mobile")}
                      />
                      <div className='errors'>
                            {formik.touched.mobile && formik.errors.mobile}
                      </div>
                  </div>
                  
                  {
                    edit === false && <button type="submit" className="btn btn-primary">Save</button>
                  }
                </form>
                </div>
            </div>
        </Container>
    </>
  )
}

export default Profile