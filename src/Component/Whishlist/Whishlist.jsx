import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
import { ThreeDots } from 'react-loader-spinner'
import { CartContext } from '../../Context/CartContext'
import { WhishlistContext } from '../../Context/WhishlistContext'
import style from './Whishlist.module.css'

export default function Whishlist() {

    let {getWhishlistItems , deleteWhishlistItems , setWishToken} = useContext(WhishlistContext)
    let {addToCart} = useContext(CartContext)
    const [whishlist, setWhishlist] = useState(null)
    const [loading, setLoading] = useState(true)

    async function getWhishlist(){
        setLoading(true);
        let {data} = await getWhishlistItems()
        setWhishlist(data);
        setLoading(false);
    }

    async function deleteWhishlist(id){
        setLoading(true);
        let {data} = await deleteWhishlistItems(id)
        setWhishlist(data);
        await getWhishlist()
        setLoading(false);
    }

    async function pushToCart(id){
        setLoading(true);
        let {data} = await addToCart(id);
        setLoading(false);
        if(data.status == 'success'){
            toast.success(data.message , {
                duration:2000
            })
        }
    }

    useEffect(() => {
        getWhishlist()
        setWhishlist()
        setWishToken()
    } , [])

    return <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Fresh Cart - Wishlist</title>
        </Helmet>
        <div className="bg-main-light p-2 mt-5">
            <h2>Wishlist:</h2>
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
            : whishlist? <>  {whishlist?.count > 0? <><p className='text-main'>Your Whishlist Items: {whishlist.count}</p></>
                    : <h2>Your Whishlist is Empty !!!!!!!</h2>}
                    {whishlist?.data?.map((data , index) => 
                        <div key={index} className="row border-1 border-bottom p-4 m-0 align-items-center">
                                <div className="col-md-1">
                                    <div className="img">
                                        <img src={data.imageCover} className='w-100' alt={data.title} />
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="item">
                                        <h3 className='h5 fw-bold'>{data?.title?.split(' ').slice(0,4).join(' ')}</h3>
                                        <p className='text-main fw-bold'>Price: {data.price} EGP</p>
                                        <button onClick={()=> deleteWhishlist(data._id)} className='btn'><i className='fas fa-trash-can text-danger'></i> Remove</button>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="add-cart">
                                        <button onClick={()=> pushToCart(data._id)} className='btn btn-main text-light'>Add to Cart</button>
                                    </div>
                                </div>
                        </div>)}
                </>
            : <h2>Your Whishlist is Empty !!!!!!!</h2>}
        </div>
    
    </>
}
