import React from 'react'
import style from './Login.module.css'
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';


export default function Login() {
    const [lodaing , setLoading] = useState(false);
    const [apiError , setApiError] = useState(null);
    let navigate = useNavigate();
    let {setUserToken} = useContext(UserContext)

    async function onSubmit(values){
        setLoading(true)
        let {data} =  await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , values)
        .catch((err) => {
            setApiError(err.response.data.message)
            setLoading(false)   
        })
        if (data.message == 'success') {
            setLoading(false)
            localStorage.setItem('userToken' , data.token)
            setUserToken(data.token)
            navigate('/')
        }
    }

    let validationSchema = yup.object({
        email : yup.string().required('Email is Required').email('Invalid Email'),
        password : yup.string().required('Password is Required').matches(/^[A-Z][\w @]{5,8}$/ , 'Invalid Password - Password should start with Uppercase Letters and atleast 6 characters ex:(Abog@m@l2000)'),
    })

    let formik = useFormik({
        initialValues : {
            email : "",
            password : ""
        },
        validationSchema,
        onSubmit
    })

    return <>

    <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart - Login</title>
    </Helmet>
    
    <div className="w-75 mx-auto py-5">
        <h2>Login Now</h2>
        <form onSubmit={formik.handleSubmit}>
            {apiError? <div className="alert alert-danger">{apiError}</div> : ''}

            <label htmlFor="email">Email:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name="email" id="email" className='form-control mb-3'/>
            {formik.errors.email && formik.touched.email? <div className="alert alert-danger py-1">{formik.errors.email}</div> : ''}

            <label htmlFor="password">Password:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="password" id="password" className='form-control mb-3'/>
            {formik.errors.password && formik.touched.password? <div className="alert alert-danger py-1">{formik.errors.password}</div> : ''}

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
            </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-main btn-main-light'>Login</button>}
            <span className='ps-3 '>do not have account?  <Link className='tm' to={'/register'}>Register Now</Link></span>
            
        </form>
    </div>
    
    </>
}
