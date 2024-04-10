import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import style from './Cart.module.css'
import { ThreeDots } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'


export default function Cart() {
    let {getCartItems , deleteCartItems , updateCartItems , clearCartItems , setTokenCartContext } = useContext(CartContext)
    const [cart, setCart] = useState(null)
    const [loading, setLoading] = useState(true)

    async function getItems(){
        let {data} = await getCartItems()
        setCart(data);
        setLoading(false);
    }

    async function deleteItems(id){
        setLoading(true);
        let {data} = await deleteCartItems(id)
        setCart(data);
        setLoading(false);
    }

    async function updateItems(id , count){
        setLoading(true);
        if(count < 1){
            let {data} = await deleteCartItems(id)
            setCart(data);
        }
        else{
            let {data} = await updateCartItems(id , count)
            setCart(data);
        }
        setLoading(false);
    }

    async function clearItems(){
        setLoading(true);
        let {data} = await clearCartItems()
        setCart(data);
        setLoading(false);
    }

    useEffect(() => {
        getItems()
        setTokenCartContext()
    } , [])

    return <> 
        <Helmet>
            <meta charSet="utf-8" />
            <title>Fresh Cart - Cart</title>
        </Helmet>
        <div className="bg-main-light p-2 mt-5">
            <h2>Cart:</h2>
            {loading? 
                <div className="row justify-content-center align-items-center vh-100">
                    <ThreeDots
                        visible={true}
                        height="100"
                        width="100"
                        color="#0aad0a"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass="d-flex justify-content-center align-items-center "
                    />
                </div>
            : cart? <>
                    {cart?.data?.totalCartPrice > 0? <><p className='text-main'>Total Cart Price: {cart.data.totalCartPrice} EGP</p></>
                        : <h2>Your Cart is Empty !!!!!!!</h2>}
                    {cart?.data?.products.map(product => 
                        <div key={product.product.id} className="row border-1 border-bottom p-4 m-0 align-items-center">
                            <div className="col-md-1">
                                <div className="img">
                                    <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="item">
                                    <h3 className='h5 fw-bold'>{product.product.title.split(' ').slice(0,4).join(' ')}</h3>
                                    <p className='text-main fw-bold'>Price: {product.price} EGP</p>
                                    <button onClick={()=> deleteItems(product.product.id)} className='btn'><i className='fas fa-trash-can text-danger'></i> Remove</button>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="countt">
                                    <button onClick={()=> updateItems(product.product.id , product.count +1)} className='btn brdr p-2'>+</button>
                                    <span className='mx-3'>{product.count}</span>
                                    <button onClick={()=> updateItems(product.product.id , product.count -1)} className='btn brdr p-2'>-</button>
                                </div>
                            </div>
                        </div>)
                    }
                    {cart.numOfCartItems > 0? <div className="clear d-flex justify-content-center align-items-center py-4">
                        <Link to={`/shippingaddress/${cart.data._id}`} className='btn btn-main text-light m-1'>Online Payment</Link>
                        <button onClick={clearItems} className='btn btn-danger m-1'>Clear Cart</button>
                    </div> : ''}
            
                </>
            : <h2>Your Cart is Empty !!!!!!!</h2>}
        </div>
    
    </>
}
