import React from 'react';
import style from './Register.module.css';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet';

export default function Register() {
    const [lodaing , setLoading] = useState(false);
    const [apiError , setApiError] = useState(null);
    let navigate = useNavigate();

    async function onSubmit(values){
        setLoading(true)
        let {data} =  await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values)
        .catch((err) => {
            setApiError(err.response.data.message)
            setLoading(false)   
        })
        if (data.message == 'success') {
            setLoading(false)
            navigate('/login')
        }
    }

    let validationSchema = yup.object({
        name : yup.string().required('Name is Required').min(3 , 'Min Length is 3').max(10 , 'Max Length is 10'),
        email : yup.string().required('Email is Required').email('Invalid Email'),
        password : yup.string().required('Password is Required').matches(/^[A-Z][\w @]{5,8}$/ , 'Invalid Password - Password should start with Uppercase Letters and atleast 6 characters ex:(Abog@m@l2000)'),
        rePassword : yup.string().required('Re-Password is Required').oneOf([yup.ref('password')] , 'Re-Password must be the same as Password'),
        phone : yup.string().required('Phone is Required').matches(/^01[0125][0-9]{8}$/ , 'The Phone must be Egyptain Number')
    })

    // function validate(values){
    //     let errors = {};
    //     if(!values.name){
    //         errors.name = 'Name is Required'
    //     }
    //     else if(values.name.length < 3){
    //         errors.name = 'min length is 3'
    //     }
    //     else if(values.name.length > 10){
    //         errors.name = 'max length is 10'
    //     }

    //     if(!values.password){
    //         errors.password = 'Password is Required'
    //     }
    //     else if(/^[A-Z][\w @]{5,8}$/.test(values.password)){
    //         errors.password = 'password should start with uppercase letters and atleast 6 characters ex:(Abog@m@l2000)'
    //     }

    //     return errors
    // }

    let formik = useFormik({
        initialValues : {
            name : "",
            email : "",
            password : "",
            rePassword : "",
            phone : ""
        },
        validationSchema,
        onSubmit
    })

    return <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart - Register</title>
    </Helmet>
    
    <div className="w-75 mx-auto py-5">
        <h2>Register Now</h2>
        <form onSubmit={formik.handleSubmit}>
            {apiError? <div className="alert alert-danger">{apiError}</div> : ''}

            <label htmlFor="name">Name:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="name" id="name" className='form-control mb-3'/>
            {formik.errors.name && formik.touched.name? <div className="alert alert-danger py-1">{formik.errors.name}</div> : ''}

            <label htmlFor="email">Email:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name="email" id="email" className='form-control mb-3'/>
            {formik.errors.email && formik.touched.email? <div className="alert alert-danger py-1">{formik.errors.email}</div> : ''}

            <label htmlFor="password">Password:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="password" id="password" className='form-control mb-3'/>
            {formik.errors.password && formik.touched.password? <div className="alert alert-danger py-1">{formik.errors.password}</div> : ''}
            
            <label htmlFor="rePassword">Re-Password:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="rePassword" id="rePassword" className='form-control mb-3'/>
            {formik.errors.rePassword && formik.touched.rePassword? <div className="alert alert-danger py-1">{formik.errors.rePassword}</div> : ''}

            <label htmlFor="phone">Phone:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" name="phone" id="phone" className='form-control mb-3'/>
            {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger py-1">{formik.errors.phone}</div> : ''}

            {lodaing? <button type='button' className='btn btn-main'>
            <ThreeDots
                visible={true}
                height="20"
                width="35"
                color="#fff"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
            </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-main btn-main-light'>Register</button>}
            <span className='ps-3 '>Already have account?  <Link className='tm' to={'/login'}>Login Now</Link></span>
            
        </form>
    </div>
    
    </>
}
