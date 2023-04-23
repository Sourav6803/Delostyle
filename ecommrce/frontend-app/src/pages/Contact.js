import React from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import Meta from "../components/Meta";
import { AiOutlineHome } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlineInformationCircle } from "react-icons/hi";
import Container from "../components/Container";
import * as yup from "yup";
import { useFormik } from "formik";
import {useDispatch} from "react-redux"
import { createQuery } from "../features/contact/contactSlice";

let contactSchema = yup.object({
    name: yup.string().required("Name is Required"),
    email: yup.string().required("Email is Required"),
    mobile: yup.string().required("Mobile Required"),
    comment: yup.string().required("Comment Required"),
    
  });

const Contact = () => {
    const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: ""
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(createQuery({name:values.name, email: values.email , mobile:values.mobile , comment: values.comment}))
    },
  });
  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumbs title="Contact Us" />
      <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2215.6659885491777!2d87.96522213019703!3d23.002088653386977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f84263696971df%3A0x605606b58115f625!2sSONARGORIA%20VIVEKANANDA%20SHISHU%20VIDYAMANDIR!5e0!3m2!1sen!2sin!4v1673887157942!5m2!1sen!2sin"
            width="600"
            height="450"
            title="none"
            className="border-0 w-100"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="col-12 mt-5">
          <div className="contact-inner-wrapper d-flex justify-content-between">
            <div>
              <h3 className="contact-title mb-4">Contact</h3>
              <form action="" className="d-flex flex-column gap-10" onSubmit={formik.handleSubmit}>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    onChange={formik.handleChange("name")}
                    onBlur={formik.handleChange("name")}
                    value = {formik.values.name}
                  ></input>
                </div>
                <div className="errors">
                    {formik.touched.name && formik.errors.name}
                </div>


                <div>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleChange("email")}
                    value = {formik.values.email}
                  ></input>
                </div>

                <div className="errors">
                    {formik.touched.email && formik.errors.email}
                </div>
                <div>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Mobile number"
                    name="mobile"
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleChange("mobile")}
                    value = {formik.values.mobile}
                  ></input>
                </div>

                <div className="errors">
                    {formik.touched.mobile && formik.errors.mobile}
                </div>
                <div>
                  <textarea
                    id=""
                    cols="30"
                    className="w-100 form-control"
                    rows="3"
                    placeholder="Comment"
                    name="comment"
                    onChange={formik.handleChange("comment")}
                    onBlur={formik.handleChange("comment")}
                    value = {formik.values.comment}
                  ></textarea>
                </div>

                <div className="errors">
                    {formik.touched.comment && formik.errors.comment}
                </div>
                <div>
                  <button className="button border-0"> Submit</button>
                </div>
              </form>
            </div>
            <div>
              <h3 className="contact-title mb-4">Get touch with us</h3>
              <div>
                <ul className="ps-0">
                  <li className="mb-3 d-flex align-items-center gap-15">
                    {" "}
                    <AiOutlineHome className="fs-5" />
                    <address className="mb-0">
                      Hno-112 , Near Sonar goria high schhol, Jamalpur , Burdwan
                      , 713404
                    </address>
                  </li>
                  <li className="mb-3 d-flex align-items-center gap-15 ">
                    {" "}
                    <BiPhoneCall className="fs-5" />
                    <a href="tel:+91 7908104094">+91 7908104094</a>
                  </li>
                  <li className="mb-3 d-flex align-items-center gap-15">
                    {" "}
                    <AiOutlineMail className="fs-5" />
                    <a href="mailto:souravbhukta8@gmail.com">
                      souravbhukta8@gmail.com
                    </a>
                  </li>
                  <li className="mb-3 d-flex align-items-center gap-15">
                    {" "}
                    <HiOutlineInformationCircle className="fs-5" />
                    <p className="mb-0">Monday-Friday 10AM-8PM </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
