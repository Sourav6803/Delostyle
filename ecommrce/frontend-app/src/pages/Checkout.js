import React, { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import BreadCrumbs from '../components/BreadCrumbs';
import Meta from '../components/Meta';
import { BiArrowBack } from "react-icons/bi"
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import {useFormik} from "formik";
import * as yup from "yup";
import axios from 'axios';
import { config } from '../utils/axiosConfig';
import { createAnOrder } from '../features/user/userSlice';



const shippingSchema = yup.object().shape({
    firstName: yup.string().required("First name required"),
    lastName: yup.string().required("Last name required"),
    address: yup.string().required("Address  required"),
    state: yup.string().required("State required"),
    city: yup.string().required("city required"),
    country: yup.string().required("country required"),
    pincode: yup.string().required("Pincode required"),
    
});

const Checkout = () => {
    const dispatch = useDispatch()
    const [totalAmount , setTotalaAmount] = useState(null)
    const [shippingInfo , setShippingInfo] = useState(null)
    const [paymentInfo , setPaymentInfo] = useState({razorpayPaymentId:"" ,razorpayOrderId: ""})
    const cartState = useSelector(state=>state.auth.cartProducts)
    const [cartProductState , setCartProductState] = useState([])
    
    
    useEffect(()=>{
        let sum = 0
        for(let i=0;i<cartState.length;i++){
            sum = sum + (Number(cartState[i].quantity) * cartState[i].price)
            setTotalaAmount(sum)
        }
    },[cartState])


    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            address: "",
            state: "",
            city: "",
            country: "",
            pincode: "",
            other : ""
        },
        validationSchema: shippingSchema,
        onSubmit: values => {
            // dispatch(loginUser(values))
            setShippingInfo(values)
            
            setTimeout(()=>{
                checkoutHandler()
            },300)
        },
    });

    const loadScript = (src)=>{
        return new Promise((resolve)=>{
            const script = document.createElement("script")
            script.src = src;
            script.onload = ()=>{
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    useEffect(()=>{
        let items=[]
        for(let i=0;i<cartState?.length;i++){
           items.push({product:cartState[i].productId._id,quantity: cartState[i].quantity, color:cartState[i].color._id,price: cartState[i].price})  
        }
        setCartProductState(items)
        
    },[])
    console.log(cartProductState)
    

    const checkoutHandler = async()=>{
        
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res) {
            alert("Razorpay SDK failed to load")
            return;
        }

        const result = await axios.post("http://localhost:5000/order/checkout",{amount:totalAmount + 5},config)
        console.log(result.data)
        if(!result.data){
            alert("something went wrong")
            return;
        }
        
        const {amount , id : order_id, currency} = result.data
        
        const options = {
            key: "rzp_test_MWGrsV7pLRV98m", // Enter the Key ID generated from the Dashboard
            amount: amount,
            currency: currency,
            name: "Sourav Corp.",
            description: "Test Transaction",
            // image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,                    
                };

                const result = await axios.post("http://localhost:5000/order/paymentVerification", data ,config);
                
                setPaymentInfo({
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id
                })

                dispatch(createAnOrder({totalPrice:totalAmount, totalPriceAfterDiscount:totalAmount,orderItems:cartProductState,paymentInfo, shippingInfo}))
            },

            prefill: {
                name: "Sourav ",
                email: "souravbhukta8@gmail.com",
                contact: "7908104094",
            },
            notes: {
                address: "Sourav corpate office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    
    return (
        <>
            <Meta title={"Checkout"} />
            <BreadCrumbs title='Checkut' />
            <Container class1='checkout-wrapper py-5 home-wrapper-2'>
                    <div className='row'>
                        <div className='col-7'>
                            <div className='checkout-left-data'>
                                <h3 className='website-name'>DevCorner</h3>
                                <nav style={{ "--bs-breadcrumb-divider": '>' }} aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link href="/cart" className='text-dark total-price'>Cart</Link></li>
                                        &nbsp; /
                                        <li className="breadcrumb-item active" aria-current="page">Information</li>
                                        &nbsp; /
                                        <li className="breadcrumb-item">Shipping</li>
                                        &nbsp; /
                                        <li className="breadcrumb-item active" aria-current="page">Payment</li>
                                    </ol>
                                </nav>
                                <h4 className='titlt total'>Contact Information</h4>
                                <p className='user-details'>Sourav Bhukta (souravbhukta8@gmial.com)</p>
                                <h4 className='mb-3'>Shipping Address</h4>
                                <form onSubmit={formik.handleSubmit} action=''  className='d-flex flex-wrap gap-15 justify-content-between'>
                                    <div className='w-100'>
                                        <select className='form-control form-select' 
                                            defaultValue={'DEFAULT'}
                                            name='country'  
                                            id=''
                                            onChange={formik.handleChange("country")}
                                            onBlur={formik.handleBlur("country")}
                                            value={formik.values.country}
                                            >
                                            <option value=""  disabled >Select Country</option>
                                            <option value="India" >India</option>
                                        </select>
                                        
                                        <div className='errors ms-2 my-1'>
                                            {formik.touched.country && formik.errors.country}
                                        </div>

                                    </div>
                                    <div className='flex-grow-1'>
                                        <input type="text" placeholder='First Name' className='form-control'
                                            name='firstName' 
                                            onChange={formik.handleChange("firstName")}
                                            onBlur={formik.handleBlur("firstName")}
                                            value={formik.values.firstName}
                                        />
                                    </div>
                                        <div className='errors ms-2 my-1'>
                                            {formik.touched.firstName && formik.errors.firstName}
                                        </div>
                                    <div className='flex-grow-1'>
                                        <input type="text" placeholder='Last Name' className='form-control'
                                            name='lastName' 
                                            onChange={formik.handleChange("lastName")}
                                            onBlur={formik.handleBlur("lastName")}
                                            value={formik.values.lastName}                                                
                                        />
                                    </div>
                                        <div className='errors ms-2 my-1'>
                                            {formik.touched.lastName && formik.errors.lastName}
                                        </div>
                                    <div className='w-100'>
                                        <input type="text" placeholder='Address' className='form-control' 
                                            name='address' 
                                            onChange={formik.handleChange("address")}
                                            onBlur={formik.handleBlur("address")}
                                            value={formik.values.address}
                                        />
                                        <div className='errors ms-2 my-1'>
                                            {formik.touched.address && formik.errors.address}
                                        </div>
                                    </div>
                                    <div className='w-100'>
                                        <input type="text" placeholder='Apartment, Society, Room No..etc' className='form-control'
                                            name='other' 
                                            onChange={formik.handleChange("other")}
                                            onBlur={formik.handleBlur("other")}
                                            value={formik.values.other}                                                
                                        />
                                    </div>
                                    <div className='flex-grow-1'>
                                        <input type="text" placeholder='City' className='form-control'
                                            name='city' 
                                            onChange={formik.handleChange("city")}
                                            onBlur={formik.handleBlur("city")}
                                            value={formik.values.city} 
                                        />
                                        <div className='errors ms-2 my-1'>
                                            {formik.touched.city && formik.errors.city}
                                        </div>
                                    </div>
                                    <div className='flex-grow-1'>
                                        <select  className='form-control form-select' id=''
                                            name='state' 
                                            onChange={formik.handleChange("state")}
                                            onBlur={formik.handleBlur("state")}
                                            value={formik.values.state}>
                                            <option value="" selected disabled >Select State</option>
                                            <option value="West Bengal">West Bengal</option>
                                        </select>
                                        <div className='errors ms-2 my-1'>
                                            {formik.touched.state && formik.errors.state}
                                        </div>
                                    </div>
                                    <div className='flex-grow-1'>
                                        <input type="text" placeholder='Zipcode' className='form-control'
                                            name='pincode' 
                                            onChange={formik.handleChange("pincode")}
                                            onBlur={formik.handleBlur("pincode")}
                                            value={formik.values.pincode} 
                                        />
                                        <div className='errors ms-2 my-1'>
                                            {formik.touched.pincode && formik.errors.pincode}
                                        </div>
                                    </div>
                                    <div className='w-100'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <Link to="/cart" className='text-dark'> <BiArrowBack className='me-2' />Return to Cart</Link>
                                            <Link to="/cart" className='button'>Continue to shipping</Link>
                                            <button className='button' type='submit'>Place Order</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className='col-5'>
                            <div className='border-bottom py-4'>
                            {
                                cartState && cartState?.map((item,index)=>{
                                    return (
                                        <div key={index} className='d-flex gap-10 mb-2 align-items-center'>
                                    <div className='w-75 d-flex gap-10'>
                                        <div className='w-25 position-relative'>
                                            <span style={{top:"-10px", right:"2px"}} className='badge bg-secondary text-white rounded-circle p-2 position-absolute'>{item.quantity}</span>
                                            <img src={item?.productId?.productImage} className='img-fluid' alt='watch' />
                                        </div>
                                        <div >
                                            <h5 className='total'>{item?.productId?.title}</h5>
                                            <p className='total-price'> {item?.color?.title}</p>
                                        </div>
                                    </div>
                                    <div className='flex-grow-1'>
                                        <h5 className='total'>${item?.price * item?.quantity}</h5>
                                    </div>
                                </div>
                                    )
                                })
                            }
                                
                            </div>
                            <div className='border-bottom py-4'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p className='total'>Subtotal</p>
                                    <p className='total-price'> ${totalAmount ? totalAmount : "0"}</p>
                                </div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p className='mb-0 total'>Shipping</p>
                                    <p className='mb-0 total-price'>$5</p>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between align-items-center border-bottom py-4'>
                                <h4 className='total '>Total</h4>
                                <h5 className='total-price'>${totalAmount ? totalAmount+5 : "0"}</h5>
                            </div>
                        </div>
                    </div>               
            </Container>
        </>
    )
}

export default Checkout