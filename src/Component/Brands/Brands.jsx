import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import style from './Brands.module.css'
import { ThreeDots } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'



export default function Brands() {

    function getBrands() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    }

    let {data , isLoading} = useQuery('brands' , getBrands)

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
        :   
            <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Fresh Cart - Brands</title>
            </Helmet>
            <div className="row gy-4 py-5">
                {data?.data.data.map(brand => 
                <div key={brand._id} className='col-md-3'>
                    <div className="brand p-2">
                        <img src={brand.image} alt={brand.name} />
                        <h3 className='h5 text-center'>{brand.name}</h3>
                    </div>
                </div>)
            }
            </div>
            </>
        }
    </>
}
