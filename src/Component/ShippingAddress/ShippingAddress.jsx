import { useFormik } from 'formik';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import style from './ShippingAddress.module.css'
import { Helmet } from 'react-helmet'

export default function ShippingAddress() {

    let {cheackOutSession} = useContext(CartContext)
    let {cartId} = useParams();

    async function checkOut(values){
        let {data} = await cheackOutSession(cartId , values)
        if (data.status == 'success') {
            window.location.href = data.session.url
        }
    }
    
    let formik = useFormik({
        initialValues:{
            details: '',
            phone: '',
            city: ''
        }, onSubmit: checkOut
    })


    return <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Fresh Cart - Shipping Address</title>
        </Helmet>
        <div className="d-flex justify-content-center align-items-center my-5">
            <div className="w-75 ">
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="details">Details:</label>
                    <input onChange={formik.handleChange} type="text" name="details" id="details" className='form-control mb-3' />
                    <label htmlFor="phone">Phone:</label>
                    <input onChange={formik.handleChange} type="tel" name="phone" id="phone" className='form-control mb-3' />
                    <label htmlFor="city">City:</label>
                    <input onChange={formik.handleChange} type="text" name="city" id="city" className='form-control mb-3' />
                    <button className='btn btn-main text-light' type='submit'>Checkout</button>
                </form>
            </div>
        </div>
    
    </>
}
