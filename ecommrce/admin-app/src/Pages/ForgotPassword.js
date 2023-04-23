import React from 'react';
import CustomInput from "../Components/CustomInput"

const ForgotPassword = () => {
    return (
        <div className='py-5 title' style={{ background: "#ffd333", minHeight: "100vh" }}>
            <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
                <h3 className='text-center'>Forgot Password</h3>
                <p className='text-center'>Please enter your register email</p>
                <form action=''>
                    <CustomInput type="text" label='Enter Email' id="email" />
                    
                    <button className='border-0 px-3 py-2 text-white fw-bold w-100' style={{ background: "#ffd333" }} type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword