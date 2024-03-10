import axios from 'axios'
import React, { useContext , useState } from 'react'
import style from './FeaturedProducts.module.css'
import { ThreeDots } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WhishlistContext } from '../../Context/WhishlistContext'
import { useEffect } from 'react'

export default function FeaturedProducts() {

    function getProducts(){
        
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
    let {data , isLoading } = useQuery('featuredProducts' , getProducts);
    let {addToCart , setTokenCartContext} = useContext(CartContext)
    let {addToWhishlist , getWhishlistItems , deleteWhishlistItems , setWishToken} = useContext(WhishlistContext)

    
    async function postToCart(id){
        let {data} = await addToCart(id);
        if(data.status == 'success'){
            toast.success(data.message , {
                duration:2000
            })
        }
    }

    const [dataOfWishProducts, setDataOfWishProducts] = useState([])

    async function postToWhishlist(id){
        if(dataOfWishProducts?.includes(id)){
            let {data} = await deleteWhishlistItems(id);
            setDataOfWishProducts(data?.data);
            if(data.status == 'success'){
                toast.success(data.message , {
                    duration:2000
                })
            }
        }
        else{
            let {data} = await addToWhishlist(id);
            setDataOfWishProducts(data?.data);
            if(data?.status == 'success'){
                toast.success(data.message , {
                    duration:2000
                })
            }
        }
    }

    async function getWishlist(){
        let {data} = await getWhishlistItems();
        setDataOfWishProducts(data?.data.map((obj) => obj._id));
    }

    useEffect(()=> {
        setWishToken();
        getWishlist();
        setTokenCartContext();
    } , [])


    return <>

        {isLoading? 
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
        :   <div className="row gy-4 py-2">
                {data?.data.data.map(product => 
                    <div key={product.id} className="col-md-3">
                        <div className="product p-2">
                            <Link to={`/productdetails/${product.id}`}>
                                <img src={product.imageCover} className="w-100" alt={product.title} />
                                <span className='font-sm text-main ps-2'>{product.category.name}</span>
                                <h3 className='h5 ps-2'>{product.title.split(' ').splice(0,2).join(' ')}</h3>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className='font-sm ps-2'>{product.price} EGP</span>
                                    <span className='font-sm pe-2'>
                                        <i className='fas fa-star rating-color me-1'></i>
                                        {product.ratingsAverage}
                                    </span>
                                </div>
                            </Link>
                            <div className='text-center pt-2 pb-2'><i onClick={()=> postToWhishlist(product.id)} className={`fa-solid fa-heart fa-2xl cursor-pointer ${dataOfWishProducts && dataOfWishProducts?.includes(product.id)? "rd" : "" } `}></i></div>
                            <button onClick={() => postToCart(product.id)} className='btn bg-main text-main-light w-100 btn-sm mt-2'>Add To Cart</button>
                        </div>
                    </div>)}
            </div>
        }
    </>
}