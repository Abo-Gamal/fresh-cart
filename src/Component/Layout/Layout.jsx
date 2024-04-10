import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import style from './Layout.module.css'
import { Offline } from "react-detect-offline";

export default function Layout() {
    return <>
    <Navbar/>
    <div className="container">
        <Offline>
            <div className="off">
                <h2 className='w-100'>Surprise!!!</h2>
                <h1 className='w-100'>This Site is Only Shown While Connecting to Internet.</h1>
            </div>
        </Offline>
        <Outlet></Outlet>
    </div>
    <Footer/>

    </>
}
