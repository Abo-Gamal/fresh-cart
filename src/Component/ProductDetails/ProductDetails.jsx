import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import style from './ProductDetails.module.css'
import { ThreeDots } from 'react-loader-spinner'
import { useState , useEffect } from 'react'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { Helmet } from 'react-helmet'


export default function ProductDetails() {
    var settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    let {addToCart} = useContext(CartContext)
    async function postToCart(id){
        let {data} = await addToCart(id);
        if(data.status == 'success'){
            toast.success(data.message , {
                duration:2000
            })
        }
    }

    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true);
    let {id} = useParams();

    async function getProductDetails(id) {
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        setDetails(data.data);
        setLoading(false);
    }    
    
    useEffect(() => {
        getProductDetails(id)
    } , [])

    return <>

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
        :   
            <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{details.title}</title>
            </Helmet>
            <div className="row align-items-center">
                <div className="col-md-4">
                <Slider className='pt-5' {...settings}>
                    {details.images.map(image => <img src={image} key={details.id} className='w-100' alt={details.title}/>)}
                </Slider>
                </div>
                <div className="col-md-8">
                    <div className="details">
                        <h3 className='h5'>{details.title}</h3>
                        <p className='py-3'>{details.description}</p>
                        <span className='font-sm text-main ps-2'>{details.category.name}</span>
                        <div className="d-flex py-3 justify-content-between align-items-center">
                            <span className='font-sm ps-2'>{details.price} EGP</span>
                            <span className='font-sm pe-2'>
                                <i className='fas fa-star rating-color me-1'></i>
                                {details.ratingsAverage}
                            </span>
                            </div>
                            <button onClick={() => postToCart(details.id)} className='btn bg-main text-main-light w-100 ii btn-sm mt-2'>Add To Cart</button>
                    </div>
                </div>
            </div>
            
            </>
        }
    
    </>
}
