import logo from './logo.svg';
import './App.css';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './Component/Layout/Layout';
import Categories from './Component/Categories/Categories';
import Register from './Component/Register/Register';
import Cart from './Component/Cart/Cart';
import Login from './Component/Login/Login';
import NotFound from './Component/Notfound/Notfound';
import Brands from './Component/Brands/Brands';
import Products from './Component/Products/Products';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import Home from './Component/Home/Home';
import { useContext, useEffect } from 'react';
import { UserContext } from './Context/UserContext';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import { Toaster } from 'react-hot-toast'
import ShippingAddress from './Component/ShippingAddress/ShippingAddress';
import AllOrders from './Component/AllOrders/AllOrders';
import Whishlist from './Component/Whishlist/Whishlist';
import CartContextProvider from './Context/CartContext';
import CartCounterProvider from './Context/CartCounterContext';

export default function App() {

  let routers = createHashRouter([
    {path: '' , element : <Layout/> , children : [
      {index : true , element : <ProtectedRoute><Home/></ProtectedRoute>},
      {path : 'cart' , element : <ProtectedRoute><Cart/></ProtectedRoute>},
      {path : 'products' , element : <ProtectedRoute><Products/></ProtectedRoute>},
      {path : 'productdetails/:id' , element : <ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path : 'brands' , element : <ProtectedRoute><Brands/></ProtectedRoute>},
      {path : 'whishlist' , element : <ProtectedRoute><Whishlist/></ProtectedRoute>},
      {path : 'allorders' , element : <ProtectedRoute><AllOrders/></ProtectedRoute>},
      {path : 'categories' , element : <ProtectedRoute><Categories/></ProtectedRoute>},
      {path : 'shippingaddress/:cartId' , element : <ProtectedRoute><ShippingAddress/></ProtectedRoute>},
      {path : 'register' , element : <Register/>},
      {path : 'login' , element : <Login/>},
      {path : '*' , element : <NotFound/>},
    ]}
  ])

  let {setUserToken} = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      setUserToken(localStorage.getItem('userToken'))
    }
  } , [])



  return <>
            <RouterProvider basename="/fresh-cart" router={routers}></RouterProvider>
            <Toaster/>
        </>
}


