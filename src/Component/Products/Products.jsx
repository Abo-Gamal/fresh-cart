import React from 'react'
import style from './Products.module.css'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import { Helmet } from 'react-helmet'

export default function Products() {
    return <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Fresh Cart - Products</title>
        </Helmet>

        <h2 className='pt-4 pb-2'>All Products</h2>
        <FeaturedProducts/>
    
    </>
}
