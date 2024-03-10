import axios from 'axios'
import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import style from './Categories.module.css'
import { Helmet } from 'react-helmet'


export default function Categories() {

    function getCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }

    let {data , isLoading} = useQuery('categories' , getCategories)



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
                <title>Fresh Cart - Categories</title>
            </Helmet>
            <div className="row gy-4 py-5">
                {data?.data.data.map(category => 
                    <div key={category._id} className='col-md-3'>
                        <div className="brand p-2">
                            <img src={category.image} height={400} className='w-100' alt={category.name} />
                            <h3 className='text-center text-main pt-3'>{category.name}</h3>
                        </div>
                    </div>)
                }
            </div>
            </>
            }
    
    </>
}
