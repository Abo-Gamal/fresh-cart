import React from 'react'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import MainSlider from '../MainSlider/MainSlider'
import style from './Home.module.css'
import { Helmet } from 'react-helmet'

export default function Home() {
    return <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart - Home</title>
    </Helmet>
    <MainSlider/>
    <CategoriesSlider/>
    <FeaturedProducts/>
    </>
}
